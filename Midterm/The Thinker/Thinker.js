
/* ============================================================
   THINKER ENGINE
   ============================================================ */

let Thinker = {

    /* ===========
       INTERNAL STATE
       (Controlled by JavaScript, NOT the LLM)
       =========== */

    pressureLevel: 0.0,          // value 0.0 — 1.0, represents instability
    pressureRange: "(0.0-0.3)",
    memoryPhase: "clear",        // "clear" or "lost"
    memorySummary: "",           // 1 poetic sentence (emptied on reset)
    userImpression: "",          // 1 poetic sentence impression of the user

    /* ===========
       LAST OUTPUT FROM LLM
       =========== */

    json: null,                  // raw JSON returned by the LLM

    speech: "",                  // text the Thinker speaks
    action: "idle",              // body motion keyword
    expression: "neutral",       // facial micro-expression keyword
    emotion: "neutral",
    imagePrompt: "",             // SDXL Lightning prompt assembled from fields

    /* ===========
       OUTPUT FROM ACT()
       (Used by your rendering + audio layers)
       =========== */
    referenceImage: null,
    images: [],                  // generated image set
    audioURL: null,              // ElevenLabs audio output

    /* ===========
       CONSTANTS
       (Tuning parameters for state transitions)
       =========== */

    RESET_COOLDOWN: 0.0,        // pressure level after reset
    THINKER_IDENTITY: null,

    /* ===========
       CORE ENGINE FUNCTIONS
       =========== */

    async think(userMessage) {
        // → Build the full prompt using current state and core identity prompt
        const prompt = this.buildLLMPrompt({ userMessage: userMessage });
        // → Send prompt to LLM
        // → Parse the returned JSON
        // → Extract: speech, action, expression, emotion, imagePrompt
        // → Store JSON to this.json
        const response = await this.generateLLMThought(prompt);
        //console.log(response);
        this.json = response;
        // → Call update() to apply state changes
        this.update();
    },

    update() {

        if (this.json) {
            //update based on LLM output
            this.speech = this.json.speech;
            this.emotion = this.json.emotion;
            this.expression = this.json.expression;
            this.action = this.json.action;
            this.pressureLevel += this.json.pressure_adjustment;
            if (this.pressureLevel < 0) {
                this.pressureLevel = 0;
            }
            this.memorySummary = this.memory_update;
            this.userImpression = this.user_impression_update;
            // → If pressureLevel >= RESET_THRESHOLD:
            //      call reset() to wipe memory and switch to "lost" phase
            if (this.pressureLevel >= this.RESET_THRESHOLD) {
                this.reset();
            }

            // → If memoryPhase was "lost" and user just messaged:
            //      switch memoryPhase back to "clear" (memorySummary stays empty)
            if (this.memoryPhase === "lost") {
                this.memoryPhase = "clear";
            }
            this.pressureRange =
                this.pressureLevel < 0.3 ? "(0.0-0.3)" :
                    this.pressureLevel < 0.6 ? "(0.3-0.6)" :
                        this.pressureLevel < 0.8 ? "(0.6-0.8)" :
                            "(0.8-1.0)";
            // → Update memorySummary using json.memory_update
            this.memorySummary = this.json.memory_update;
            // → Update userImpression using json.user_impression_update
            this.userImpression = this.json.user_impression_update;
            this.act();
        }
    },

    reset() {
        // → Set memoryPhase to "lost"
        this.memoryPhase = "lost";
        // → Clear memorySummary
        this.memorySummary = "";
        // → Clear userImpression
        this.userImpression = "";
        // → Reduce pressureLevel to RESET_COOLDOWN
        this.pressureLevel = this.RESET_COOLDOWN;
    },

    async act() {
        const imagePrompt = this.buildImagePrompt();
        // → Use imagePrompt to request images from SDXL Lightning


        if (imagePrompt) {
            await this.generateImages({ prompt: imagePrompt, imageSize: "square", steps: 2, imageNumbers: 5 });
        }

        // let htmlCode = "";
        // for(let image of this.images){
        //     htmlCode += `<img src="${image.url}" width="20%">`
        // }
        // document.getElementById("outputField").innerHTML = htmlCode;
        document.getElementById("textField").innerHTML = `<p>${this.speech}</p>`;
        // → Use speech to request audio from ElevenLabs
        // → Store the resulting images + audioURL
    },

    /* ===========
       SECONDARY ENGINE FUNCTIONS
       =========== */

    buildLLMPrompt({ userMessage }) {
        let prompt = "";

        // 1. Core identity blocks
        prompt += [
            this.THINKER_IDENTITY.identityEssence,
            this.THINKER_IDENTITY.constraints,
            this.THINKER_IDENTITY.thinkingStyle,
            this.THINKER_IDENTITY.behavioralRules,
            
        ].join("\n") + "\n";
        if(this.pressureLevel >= 0.3){
            prompt += this.THINKER_IDENTITY.pressureRules + "\n";
        }
        const range = this.pressureRange;
        
        // Action
        prompt += "Choose one from the following instruction for action:";
        prompt += this.THINKER_IDENTITY["actions" + range] + "\n";

        // Expression
        prompt += "Choose one from the following instruction for expression:";
        prompt += this.THINKER_IDENTITY["expressions" + range] + "\n";

        // Emotion
        prompt += "Choose one from the following instruction for emotion:";
        prompt += this.THINKER_IDENTITY["emotion" + range] + "\n";

        // 2. Inject state
        prompt += `Current pressure_level: ${this.pressureLevel}. Shift your speech according to the pressure rules.\n`;
        prompt += `Current memory_phase: ${this.memoryPhase}\n`;
        prompt += `Current memory_summary: "${this.memorySummary}"\n`;
        prompt += `Current user_impression: "${this.userImpression}"\n`;

        // 3. User message
        prompt += `User message: "${userMessage}"\n`;

        // 4. Required JSON output schema
        prompt += `Output ONLY the following JSON object in one line, with no text before or after it:\n`;
        prompt += `${this.THINKER_IDENTITY.outputSchema}\n`;

        //console.log(prompt);
        return prompt;
    },

    async generateLLMThought(prompt) {
        try {
            const res = await fetch("http://localhost:5678/webhook/8d84f4fe-79a7-4111-ac80-d482ca33bee8", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: prompt })
            });

            const data = await res.json();

            return JSON.parse(data["0"].output);

        } catch (err) {
            console.error(err);
            return null;
        }
    },

    buildImagePrompt() {
        const range = this.pressureRange;
        // Appearance
        let imagePrompt = this.THINKER_IDENTITY["appearance" + range];

        // Camera
        imagePrompt += `The Camera angle is set to: `;
        imagePrompt += this.THINKER_IDENTITY["camera" + range];

        // Core motion + emotion
        imagePrompt += `The figure is shown performing: ${this.action}.`;
        imagePrompt += `The facial expression is: ${this.expression}.`;
        imagePrompt += `The emotion is: ${this.emotion}.`;
        imagePrompt += `The background should be pure white.`;
        return imagePrompt;
    },

    async generateImages({ prompt, imageSize, steps, imageNumbers }) {
        console.log(prompt);
        const baseSeed = 50000;
        const seed = baseSeed + Math.floor(Math.random() * 3);

        const res = await fetch("http://localhost:5678/webhook/ad0e4ce7-a0d2-4bdb-a41a-576c20adc793", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data:
                {
                    "prompt": prompt,
                    "strength": map(this.pressureLevel,0,1,0.3,0.8),
                    "image_size": imageSize,
                    "num_inference_steps": steps,
                    "num_images": imageNumbers,
                    "seed": seed 
                }
            })
        });

        const data = await res.json();
        
        this.images[0] = (loadImage(data["0"].image.url));
        this.images[1] = (loadImage(data["1"].image.url));
        this.images[2] = (loadImage(data["2"].image.url));
        // this.images[3]=( loadImage(data["3"].image.url));
        // this.images[4]=( loadImage(data["4"].image.url));

        //console.log(this.images);

    },


    async generateSpeech() {

    }


};