# Embedding Example (Concept Graph)

This note shows how to convert the relatedness data produced by
`processProjectsInformation` into embeddings that power attention, layout, or
recommendations.

## 1. Quick intuition (toy 4-node matrix)

| Concept      | Audio | Visuals | Interaction | Narrative |
|--------------|:-----:|:-------:|:-----------:|:---------:|
| **Audio**        | 1.0 | 0.8 | 0.2 | 0.0 |
| **Visuals**      | 0.8 | 1.0 | 0.7 | 0.1 |
| **Interaction**  | 0.2 | 0.7 | 1.0 | 0.6 |
| **Narrative**    | 0.0 | 0.1 | 0.6 | 1.0 |

Factor this symmetric matrix (PCA/SVD). Even a tiny power-iteration script (no
external packages) can produce embeddings. Those vectors become your concept
representations.

## 2. Use **all** concepts from `projectInformation.json`

The same idea scales to the live dataset. The script below mirrors the logic in
`processProjectsInformation`: load every project, compute co-occurrences,
build the relatedness matrix, then run SVD. It now extracts **three** components
(X, Y, Z) instead of two.

```python
import json, math, itertools, pathlib
from collections import Counter, defaultdict

def mat_vec(mat, vec):
    return [sum(row[j] * vec[j] for j in range(len(vec))) for row in mat]

def normalize(vec):
    norm = math.sqrt(sum(v * v for v in vec)) or 1.0
    return [v / norm for v in vec], norm

def power_iteration(mat, iterations=80):
    b = [1.0] * len(mat)
    for _ in range(iterations):
        b = mat_vec(mat, b)
        b, _ = normalize(b)
    mv = mat_vec(mat, b)
    eigen = sum(b[i] * mv[i] for i in range(len(b)))
    return eigen, b

def deflate(mat, eigen, vec):
    n = len(mat)
    for i in range(n):
        for j in range(n):
            mat[i][j] -= eigen * vec[i] * vec[j]

projects = json.loads(pathlib.Path("Midterm/Projects/projectInformation.json").read_text())
concept_counts = Counter()
co = defaultdict(lambda: defaultdict(int))
for proj in projects:
    concepts = [c.strip() for c in proj.get("concepts", []) if c]
    for c in concepts:
        concept_counts[c] += 1
    for a, b in itertools.combinations(sorted(set(concepts)), 2):
        co[a][b] += 1
        co[b][a] += 1

concepts = sorted(concept_counts)
index = {c: i for i, c in enumerate(concepts)}
n = len(concepts)
M = [[0.0] * n for _ in range(n)]
for i, c in enumerate(concepts):
    for j, d in enumerate(concepts):
        if c == d:
            M[i][j] = concept_counts[c]
        else:
            M[i][j] = co[c][d]

components = min(3, n)
vals, vecs = [], []
M_copy = [row[:] for row in M]
for _ in range(components):
    val, vec = power_iteration(M_copy)
    vals.append(val)
    vecs.append(vec)
    deflate(M_copy, val, vec)

embeddings = {}
for i, concept in enumerate(concepts):
    embeddings[concept] = [vecs[d][i] * math.sqrt(vals[d]) for d in range(components)]

pathlib.Path("Midterm/Intelligence/embeddings.json").write_text(
    json.dumps(embeddings, indent=2)
)
```

Running the script writes `Midterm/Intelligence/embeddings.json` with vectors like:

```json
{
  "experimentation": [ 2.5119, -0.1602,  0.0481 ],
  "simulation":      [ 0.1162,  1.7244,  0.1837 ],
  "randomness":      [ 0.5133,  1.6790,  0.5535 ],
  "game":            [ 0.0000,  0.0000,  0.0000 ],
  "particles":       [ 1.7886, -0.0191,  0.0917 ],
  "distortion":      [ 1.7452, -0.3585, -0.0213 ],
  "...":             [ ...    ,  ...   ,  ...   ]
}
```

## 3. Wire the embeddings into the sketch

1. Load `Midterm/Intelligence/embeddings.json` alongside `projectInformation.json`.
2. Attach each vector to its concept object (`concept.embedding = [...]`).
3. Use cosine similarity or dot products to weight edges, highlight background
   nodes, fetch recommendations, or drive layout (X = Dim1, Y = Dim2, Z drives
   depth/size/color).

With three dimensions you can place nodes in 3D (p5.js WEBGL) or treat the third
axis as an extra signal for visual effects—all without shipping a huge ML model.
