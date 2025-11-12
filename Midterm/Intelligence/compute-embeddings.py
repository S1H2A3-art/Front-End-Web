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