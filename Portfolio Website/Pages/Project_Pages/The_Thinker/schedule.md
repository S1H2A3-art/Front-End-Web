# ⭐ MASTER TASK LIST FOR THE THINKER PROJECT (3-WEEK PLAN)

---

# 🟥 PHASE 1 — AI BRAIN (LLM + JSON OUTPUT)

## 1. Character Identity
- [ ] Write Thinker’s “core identity” text (short version)  
- [ ] Write Thinker’s emotional rules  
- [ ] Write Thinker’s existential confinement rules  
- [ ] Write Thinker’s speech style rules  
- [ ] Define instability system (0.0–1.0)  

## 2. JSON Schema
- [ ] Finalize JSON output format (speech, emotion, expression, action, camera, image_prompt, viseme_style)  
- [ ] Create test prompts to ensure JSON reliability  

## 3. Thinker Core File
- [ ] Build structured text file of Thinker’s behaviors  
- [ ] Split into identity, emotion, existential rules, instability rules  

## 4. Core Selector Logic
- [ ] Build n8n Function node to select relevant core blocks  
- [ ] Logic: choose blocks by mood/insanity/trapped-awareness  
- [ ] Test prompt assembly with sample inputs  

---

# 🟧 PHASE 2 — MINI RAG SYSTEM (PHILOSOPHY)

## 5. Build RAG Knowledge Base
- [ ] Choose ~50 philosophical fragments  
- [ ] Include: Hegel, Nietzsche, Kierkegaard, Schopenhauer  
- [ ] Add your own commentary  
- [ ] Build JSON dataset  

## 6. Build Vector Store in n8n
- [ ] “Set” node containing database  
- [ ] “Split into Items” node  
- [ ] OpenAI Embeddings node  
- [ ] Vector Store Insert node  
- [ ] Verify vector DB saved  

## 7. Runtime RAG Retrieval Workflow
- [ ] Build retrieval query builder  
- [ ] Embed query  
- [ ] Vector search  
- [ ] Summarize retrieved fragments  
- [ ] Inject insights into Thinker prompt  

---

# 🟨 PHASE 3 — LLM → FRONTEND LOOP

## 8. n8n Main Workflow
- [ ] Webhook Trigger node  
- [ ] Fetch Thinker state (n8n data store)  
- [ ] Run RAG retrieval  
- [ ] Assemble final LLM prompt  
- [ ] LLM Node returns JSON output  
- [ ] Parse + update Thinker state  
- [ ] Return JSON response to webpage  

## 9. Frontend Setup
- [ ] Basic HTML/CSS chat UI  
- [ ] JS fetch → send user input to webhook  
- [ ] Display Thinker’s speech  
- [ ] Add “thinking…” loading state  

---

# 🟩 PHASE 4 — VISUAL PIPELINE (IMAGES, PIXELS, SEGMENTATION)

## 10. Image Generation Pipeline
- [ ] Connect SDXL Lightning / FAL  
- [ ] Send LLM image_prompt to API  
- [ ] Generate 5-frame batches  
- [ ] Cache frames  

## 11. ml5.js Segmentation
- [ ] Load ml5 body segmentation  
- [ ] Remove background from generated images  
- [ ] Output transparent PNG  

## 12. p5.js Canvas Rendering
- [ ] Draw segmented image to canvas  
- [ ] Add pixelation filter  
- [ ] Add 3 core poses (tilt, lean, look left/right)  
- [ ] Adjust color/brightness based on emotion  

---

# 🟦 PHASE 5 — AUDIO PIPELINE

## 13. ElevenLabs Integration
- [ ] Send “speech” → ElevenLabs API  
- [ ] Retrieve audio URL  
- [ ] Play audio in browser  

## 14. Speech Sync
- [ ] Display captions while audio plays  
- [ ] Delay image transitions until audio starts  

---

# 🟪 PHASE 6 — INSANITY & PAGE DECAY

## 15. Insanity System
- [ ] Define triggers that increase insanity  
- [ ] Define conditions that reduce insanity  
- [ ] Clamp insanity between 0–1  
- [ ] Save insanity in Thinker state  

## 16. Webpage Disintegration (Basic)
- [ ] Add CSS blur based on insanity  
- [ ] Add text jitter  
- [ ] Add canvas border flicker  
- [ ] Add background desaturation  

## 17. Visual Instability Effects
- [ ] Subtle pixel bloom at high insanity  
- [ ] Occasional 1px canvas jitter  
- [ ] Soft shadow flicker  

---

# 🟫 PHASE 7 — SYNCHRONIZATION & POLISH

## 18. Timing Refinement
- [ ] Ensure smooth sync between LLM response, audio, and images  
- [ ] Add response queueing  
- [ ] Smooth pose transitions  

## 19. UX Polish
- [ ] Styled chat interface  
- [ ] Animated Thinker messages  
- [ ] Visual loading indicators  
- [ ] “Thinking…” micro animation  
- [ ] Fade transitions for new frames  

## 20. Stability & Safety
- [ ] Test high-insanity behaviors  
- [ ] Test rapid user messages  
- [ ] Test long conversations  
- [ ] Ensure webpage never fully breaks  

---

# 🟦 PHASE 8 — FINAL DELIVERY

## 21. Presentation Layer
- [ ] Intro text  
- [ ] Instructions for users  
- [ ] Credits section  
- [ ] Optional: settings panel  

## 22. Final Testing
- [ ] Full conversation test  
- [ ] Browser compatibility test  
- [ ] API keys secured  
- [ ] Animation performance tuned  

## 23. Project Write-Up
- [ ] Document system architecture  
- [ ] Explain artistic goals  
- [ ] Summarize methodology  
- [ ] Include diagrams/screenshots  

---
