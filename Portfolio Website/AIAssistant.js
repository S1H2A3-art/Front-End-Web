
let AIAssistant = {
    webHookURL: "http://localhost:5678/webhook/a96db540-175e-473a-85a9-d3bac0b6fa8b",
    minimized: false,
    interval: 400,
    prefix: "",
    AIFaceModelDisplay: null,
    AIFaceModelImages: ["AIFaceModelImage(1).png", "AIFaceModelImage(2).png", "AIFaceModelImage(3).png", "AIFaceModelImage(4).png", "AIFaceModelImage(5).png", "AIFaceModelImage(6).png", "AIFaceModelImage(7).png", "AIFaceModelImage(8).png", "AIFaceModelImage(9).png", "AIFaceModelImage(10).png", "AIFaceModelImage(11).png", "AIFaceModelImage(12).png", "AIFaceModelImage(13).png", "AIFaceModelImage(14).png", "AIFaceModelImage(15).png", "AIFaceModelImage(16).png", "AIFaceModelImage(17).png", "AIFaceModelImage(18).png", "AIFaceModelImage(19).png", "AIFaceModelImage(20).png", "AIFaceModelImage(21).png", "AIFaceModelImage(22).png", "AIFaceModelImage(23).png", "AIFaceModelImage(24).png", "AIFaceModelImage(25).png", "AIFaceModelImage(26).png", "AIFaceModelImage(27).png", "AIFaceModelImage(28).png", "AIFaceModelImage(29).png", "AIFaceModelImage(30).png", "AIFaceModelImage(31).png", "AIFaceModelImage(32).png", "AIFaceModelImage(33).png", "AIFaceModelImage(34).png", "AIFaceModelImage(35).png", "AIFaceModelImage(36).png", "AIFaceModelImage(37).png", "AIFaceModelImage(38).png"],
    imageIntervalId: null,
    defaultMessage: "Hello! How can I assist you today?",
    recommendationMessages: [],
    recommendationMessagesIndex: 0,
    memorySessionId: null,
    pickRandomIndex() {
        if (this.AIFaceModelImages.length === 1) return 0;

        let randomIndex;
        randomIndex = Math.floor(Math.random() * this.AIFaceModelImages.length);

        return randomIndex;
    },

    startImageCycle() {
        if (this.imageIntervalId) clearInterval(this.imageIntervalId);
        this.imageIntervalId = setInterval(() => {
            const randomIndex = this.pickRandomIndex();
            const nextImage = this.AIFaceModelImages[randomIndex];
            this.AIFaceModelDisplay.src = this.prefix + nextImage;
        }, this.interval);
    },

    displayAIAssistant() {
        const AIAssistantDiv = document.createElement("div");
        AIAssistantDiv.id = "AIAssistantDiv";
        document.getElementsByTagName("body")[0].appendChild(AIAssistantDiv);
        // Create chat interface elements
        const AIContainer = document.createElement("div");
        AIContainer.id = "AIContainer";

        const AIContainerBody = document.createElement("div");
        AIContainerBody.id = "AIContainerBody";
        AIContainer.addEventListener("mouseenter", () => {
            interval = 50;

        });
        AIContainer.addEventListener("mouseleave", () => {
            interval = 400;

        });


        AIContainer.appendChild(AIContainerBody);

        const AIChatBox = document.createElement("div");
        AIChatBox.id = "AIChatBox";

        const welcomeMessage = document.createElement("div");
        welcomeMessage.className = "AIMessage";
        welcomeMessage.innerHTML = `<strong>AI:</strong> ${this.defaultMessage}`;
        AIChatBox.appendChild(welcomeMessage);

        AIContainerBody.appendChild(AIChatBox);

        const inputContainer = document.createElement("div");
        inputContainer.id = "aiInputContainer";
        AIContainerBody.appendChild(inputContainer);

        const inputBox = document.createElement("input");
        inputBox.type = "text";
        inputBox.id = "aiInputBox";
        inputBox.placeholder = "Type your message here...";

        const minimizeButton = document.createElement("button");
        minimizeButton.id = "minimizeButton";
        minimizeButton.innerText = ">";

        // Stop propagation so the container's click handler doesn't also run
        minimizeButton.onclick = (e) => { e.stopPropagation(); this.toggleMinimize(); };

        const sendButton = document.createElement("button");
        sendButton.id = "sendButton";
        sendButton.innerText = "send";


        sendButton.onclick = async () => {
            if (!inputBox.value) return;
            inputBox.disabled = true;
            const chatBox = document.getElementById("AIChatBox");
            const userMessage = document.createElement("div");
            userMessage.className = "userMessage";
            userMessage.innerHTML = `<strong>You:</strong> ${inputBox.value}`;
            chatBox.appendChild(userMessage);
            chatBox.scrollTop = chatBox.scrollHeight;

            // Send the message and handle different response types gracefully
            const response = await this.processMessage(inputBox.value);
            inputBox.value = "";
            inputBox.disabled = false;

            const aiMessage = document.createElement("div");
            aiMessage.className = "AIMessage";
            // label node (strong) + separate text node for incremental typing
            const label = document.createElement('strong');
            label.textContent = 'AI:';
            aiMessage.appendChild(label);
            const messageContent = document.createElement("pre");
            messageContent.className = "messageContent";
            messageContent.style.display = 'inline';
            messageContent.style.margin = '0';
            messageContent.style.whiteSpace = 'pre-wrap';
            aiMessage.appendChild(messageContent);

            const textNode = document.createTextNode(' ');
            messageContent.appendChild(textNode);
            // ensure wrapping behavior
            aiMessage.style.display = 'block';
            aiMessage.style.whiteSpace = 'normal';
            chatBox.appendChild(aiMessage);

            if (response) {
                // If response is a string, append to the text node char-by-char
                for (let i = 0; i < response.length; i++) {
                    textNode.data += response.charAt(i);
                    chatBox.scrollTop = chatBox.scrollHeight; // scroll to bottom as text is added
                    await new Promise(resolve => setTimeout(resolve, 20));
                }
            } else {
                // No response or non-JSON response could not be parsed
                textNode.data += 'No response from server.';
            }

            chatBox.scrollTop = chatBox.scrollHeight;
        }

        document.getElementById("AIAssistantDiv").appendChild(AIContainer);
        document.getElementById("AIContainerBody").appendChild(inputContainer);
        inputContainer.appendChild(inputBox);
        inputContainer.appendChild(sendButton);
        document.getElementById("AIContainer").appendChild(minimizeButton);

        if (window.location.pathname.endsWith("Explorer.html") || window.location.pathname.endsWith("Archive.html") || window.location.pathname.endsWith("About.html")) {
            this.prefix = "../../Assets/AIFaceModelImages/";
        } else if (window.location.pathname.endsWith("index.html")) {
            this.prefix = "../../../Assets/AIFaceModelImages/";
        }
        else {
            this.prefix = "Assets/AIFaceModelImages/";
        }
        this.AIFaceModelDisplay = document.createElement("img");
        this.AIFaceModelDisplay.id = "AIFaceModelDisplay";
        this.AIFaceModelDisplay.src = this.prefix + "AIFaceModelImage(1).png";
        document.getElementById("AIContainer").appendChild(this.AIFaceModelDisplay);

        // Circular title wrapper (SVG textPath) - shown only when minimized via CSS
        const aiTitleWrap = document.createElement("div");
        aiTitleWrap.id = "aiTitleWrap";
        aiTitleWrap.innerHTML = `
                    <svg viewBox="0 0 220 220" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <defs>
                            <!-- Path slightly larger than the visual circle so text sits outside -->
                            <path id="titleCircle" d="M110,10 a100,100 0 1,1 -0.01,0" />
                        </defs>
                        <g id="titleGroup">
                          <text font-size="12">
                            <textPath href="#titleCircle" startOffset="50%" text-anchor="middle" id="aiTitleText">
                                Click to Chat with AI Assistant • Click to Chat with AI Assistant •
                            </textPath>
                          </text>
                        </g>
                    </svg>
                `;
        AIContainer.appendChild(aiTitleWrap);

        const recommendationDiv = document.createElement("div");
        recommendationDiv.id = "recommendationContainer";
        document.getElementsByTagName("body")[0].appendChild(recommendationDiv);
    },

    async displayRecommendationMessage() {
        if (this.recommendationMessages.length === 0) return;
        const recommendationDiv = document.getElementById("recommendationContainer");
        const recommendationText = document.createElement("p");
        recommendationText.id = "recommendationText";
        recommendationDiv.innerHTML = "";
        recommendationDiv.appendChild(recommendationText);

        for (let i = 0; i < this.recommendationMessages[this.recommendationMessagesIndex].length; i++) {
            const char = this.recommendationMessages[this.recommendationMessagesIndex].charAt(i);
            recommendationText.innerHTML += char;
            await new Promise(resolve => setTimeout(resolve, 30));
        }

        this.recommendationMessagesIndex = (this.recommendationMessagesIndex + 1) % this.recommendationMessages.length;

    },

    toggleMinimize() {
        const AIContainer = document.getElementById("AIContainer");
        const minimizeButton = AIContainer ? AIContainer.querySelector("#minimizeButton") : null;
        const AIContainerBody = AIContainer ? AIContainer.querySelector("#AIContainerBody") : null;
        const AIFaceModelDisplay = AIContainer ? AIContainer.querySelector("#AIFaceModelDisplay") : null;
        const titleWrap = AIContainer ? AIContainer.querySelector("#aiTitleWrap") : null;
        const recommendationContainer = document.getElementById("recommendationContainer");
        if (!this.minimized && AIContainer) {
            AIContainer.classList.add("minimized");
            this.minimized = true;
            AIContainer.onclick = this.toggleMinimize.bind(this);
            minimizeButton.style.display = "none";
            AIContainerBody.style.display = "none";
            AIFaceModelDisplay.style.display = "block";
            if (recommendationContainer) recommendationContainer.style.display = "block";
            if (titleWrap) {
                const t = titleWrap.querySelector('#aiTitleText');
                if (t) t.textContent = 'Chat with AI Assistant • ';
                titleWrap.style.display = 'block';
            }
            AIContainer.addEventListener("mouseenter", () => {
                this.interval = 100;
                this.startImageCycle();
            });
            AIContainer.addEventListener("mouseleave", () => {
                this.interval = 1000;
                this.startImageCycle();
            });
        } else if (AIContainer) {
            AIContainer.classList.remove("minimized");
            this.minimized = false;
            AIContainer.onclick = null;
            minimizeButton.style.display = "inline-block";
            AIContainerBody.style.display = "flex";
            AIFaceModelDisplay.style.display = "none";
            if (titleWrap) titleWrap.style.display = 'none';
            if (recommendationContainer) recommendationContainer.style.display = "none";
        }
    },

    assistantStart() {
        this.memorySessionId = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        this.displayAIAssistant();

        if (window.location.pathname.endsWith("Explorer.html")) {
            this.recommendationMessages = [
                "Try searching for projects based on your favorite concepts!",
                "Explore different genres to find projects that interest you.",
                "Use the filters to narrow down your project search effectively."
            ];
        } else if (window.location.pathname.endsWith("Archive.html")) {
            this.recommendationMessages = [
                "Browse through the archive to discover past projects!",
                "Use the search bar to quickly find specific projects.",
                "Click on project titles to view detailed information."
            ];
        } else {
            this.recommendationMessages = [
                "Hello! I'm here to assist you with any questions about the website.",
                "Feel free to ask me about the projects featured on this site.",
                "I'm here to help you navigate and find information easily."
            ];
        }

        this.displayRecommendationMessage()
        this.toggleMinimize();
        this.startImageCycle();

        setInterval(() => {
            this.displayRecommendationMessage()
        }, 20000); // Change image every 10 seconds
    },

    assistantRecommendation() {

    },

    async processMessage(message) {

        try {
            let currentSelectedConcept = "not applicable";
            if (window.location.pathname.endsWith("Explorer.html")) {
                if (lockMode >= 0 && lockMode < concepts.length)
                    currentSelectedConcept = concepts[lockMode].name;
            }
            let currentProjectTitle = "not applicable";
            if (window.location.pathname.endsWith("index.html")) {
                const params = new URLSearchParams(window.location.search);
                const projectTitle = params.get("project");
                if (projectTitle) {
                    currentProjectTitle = projectTitle;
                }
            }

            const res = await fetch(this.webHookURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: message, currentPage: window.location.pathname, currentSelectedConcept: currentSelectedConcept, currentProjectTitle: currentProjectTitle, memorySessionId: this.memorySessionId, keepMemoryNumber: 5 })
            });
            console.log(message);

            // If response is an error status, try to read text and return it (or null)
            if (!res.ok) {
                let txt = null;
                try { txt = await res.text(); } catch (e) { /* ignore */ }
                console.error('Webhook returned status', res.status, txt);
                return txt || null;
            }

            // Check Content-Type header to decide how to parse
            const contentType = res.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                try {
                    const data = await res.json();
                    return data && data.output ? data.output : null;
                } catch (e) {
                    console.error('Failed to parse JSON response', e);
                    // fall through to try text
                }
            }

            // Fallback: try to read as plain text
            try {
                const text = await res.text();
                return text && text.length ? text : null;
            } catch (e) {
                console.error('Failed to read response text', e);
                return null;
            }

        } catch (err) {
            console.error(err);
            return null;
        }
    }
}

AIAssistant.assistantStart();

