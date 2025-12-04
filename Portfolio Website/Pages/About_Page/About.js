const descriptionElements = document.getElementsByClassName("rightTextAndImageElement");

const descriptionButton = document.createElement("button");
descriptionButton.id = "descriptionButton";
descriptionButton.innerText = "Generate artist statement";
const artistDescriptionContainer = document.getElementsByClassName("rightTextAndImageElement")[0]
descriptionButton.onclick = () => {
    descriptionButton.disabled = true;
    descriptionButton.innerText = "Generating artist statement...";
    generateDescription("Infer and compose an artist statement for designer Shawn Qiu based on the holistic skills and themes expressed across his portfolio website from a third person perspective. Do not focus on particular projects or individual concepts—capture the overall creative identity instead. Respond with a single brief paragraph and include no extra commentary or formatting.", artistDescriptionContainer);
}

artistDescriptionContainer.appendChild(descriptionButton);

const skillsDescriptionContainer = document.getElementById("skillsDescriptionContainer");
const skillsDescriptionButton = document.createElement("button");
skillsDescriptionButton.id = "skillsDescriptionButton";
skillsDescriptionButton.innerText = "Generate live skills summary of Shawn Qiu";
skillsDescriptionButton.onclick = () => {
    skillsDescriptionButton.disabled = true;
    skillsDescriptionButton.innerText = "Generating skills summary...";
    generateDescription("provide a detailed summary of the technical and artistic skills possessed by the designer Shawn Qiu based on his portfolio website, highlighting key areas of expertise.", skillsDescriptionContainer);
}

skillsDescriptionContainer.appendChild(skillsDescriptionButton);

const interestedConceptsContainer = document.getElementById("interestedConceptsContainer");
const interestedConceptsButton = document.createElement("button");
interestedConceptsButton.id = "interestedConceptsButton";
interestedConceptsButton.innerText = "Generate a list of notions Shawn Qiu is interested in";
interestedConceptsButton.onclick = () => {
    interestedConceptsButton.disabled = true;
    interestedConceptsButton.innerText = "Generating notions...";
    generateDescription("only list 5 essential concepts that the designer Shawn Qiu used in his projects in based on his portfolio website. Provide the concepts in a bullet point format and a one sentence explanation for each. Do not include any additional information beyond the list. Seperated each concept with a newline and space in between.", interestedConceptsContainer);
}

interestedConceptsContainer.appendChild(interestedConceptsButton);

const featuredProjectsContainer = document.getElementById("featuredProjectsContainer");
const featuredProjectsButton = document.createElement("button");
featuredProjectsButton.id = "featuredProjectsButton";
featuredProjectsButton.innerText = "Generate a list of featured projects";
featuredProjectsButton.onclick = () => {
    featuredProjectsButton.disabled = true;
    featuredProjectsButton.innerText = "Generating featured projects...";
    generateDescription("list these 3 featured projects created by the designer Shawn Qiu based on his portfolio website: Zero Gravity Theatre: The Brothers Karamazov, The Guidebook for the Conscious Book, Shhhh!!!, and Water... .Provide a brief description of each project and its significance.", featuredProjectsContainer);
}

featuredProjectsContainer.appendChild(featuredProjectsButton);
async function askAIAssistant(message) {
    try {
        const res = await fetch(AIAssistant.webHookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: message, currentPage: window.location.pathname, currentSelectedConcept: "not applicable", currentProjectTitle: "not applicable", memorySessionId: 0, keepMemoryNumber: 0 })
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

async function generateDescription(message, containerElement) {
    const response = await askAIAssistant(message);
    if (!response) {
        console.error('No response from AI Assistant');
        return;
    }

    console.log('AI Assistant response:', response);
    const descriptionTextBody = document.createElement("pre");
    descriptionTextBody.id = "descriptionTextBody";
    containerElement.innerHTML = "";
    containerElement.appendChild(descriptionTextBody);
    for (let i = 0; i < response.length; i++) {
        descriptionTextBody.innerHTML += response.charAt(i);
        await new Promise(resolve => setTimeout(resolve, 20));
        descriptionTextBody.scrollTop = descriptionTextBody.scrollHeight;
    }
}

let mouseHover = false;
let thinkerActive = false;
const thinkerImage = document.getElementsByClassName("leftTextAndImageElement")[0];
const body = document.getElementsByTagName("body")[0];
let thinkerCanvas = null;
function getThinkerCanvas() {
    if (!thinkerCanvas) {
        thinkerCanvas = document.getElementById("thinkerCanvas");
    }
    return thinkerCanvas;
}
body.style.opacity = 1;
    
let fadeTimer;

thinkerImage.addEventListener("mouseover", () => {
  mouseHover = true;

  setTimeout(() => {
    observer.observe(body, { attributes: true, attributeFilter: ['style'] });
    startFade(-0.01); 
  }, 20000);

//startFade(-0.01); 
 
 
});

thinkerImage.addEventListener("mouseout", () => {
    observer.disconnect();
    mouseHover = false;

    if(!thinkerActive)
    startFade(0.01);
});

const observer = new MutationObserver(() => {
  const op = parseFloat(getComputedStyle(body).opacity);
  if(op === 0){
    thinkerActive = true;
    body.style.transition = "opacity 10s ease";
    document.getElementById("mainDisplay").style.display = "none";
    document.getElementById("menuBar").style.display = "none";
    document.getElementsByClassName("menuButton")[0].style.display = "none";
    getThinkerCanvas().style.opacity = 1;
    getThinkerCanvas().style.display = "block";
    body.style.opacity = 1;
  }
});


function startFade(step) {
  clearInterval(fadeTimer);
  
    fadeTimer = setInterval(() => {
        const current = parseFloat(body.style.opacity) || 1;
        const next = Math.max(0, Math.min(1, current + step));
        body.style.opacity = next;
        if ((step < 0 && next <= 0) || (step > 0 && next >= 1) || (step < 0 && !mouseHover)) {
        clearInterval(fadeTimer);
        }
    }, 50);

}
