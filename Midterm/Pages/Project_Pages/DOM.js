class ControlInstruction extends HTMLElement{
    constructor(){
        super();
        this.classList.add("controlInstruction");
        this.instructions = this.getAttribute("instructions").split(",");
        for(let i = 0; i < this.instructions.length; i++){
            this.instructions[i] = this.instructions[i].split(":");
        }
        this.innerHTML = `
            <h3>CONTROLS</h3> 
            <div id = instructions>
            </div>
        `;

        for(let instruction of this.instructions){
            const span = document.createElement("span");
             span.innerHTML = `
             <p style = "display:inline; font-weight:500">
                ${instruction[0]}: 
            </p>
            <p style = "display:inline; color:#666666; ">
                &ensp;${instruction[1]}
                &emsp;&emsp;
            </p>
             `
            
            this.querySelector("#instructions").appendChild(span);
        }

        
    }
}

customElements.define("control-instruction",ControlInstruction);

class CustomSpacing extends HTMLElement{
    constructor(){
        super();
        this.classList.add("customSpacing");
        this.innerHTML = `placeholder`;
        this.style.height = this.getAttribute("size");
    }
}

customElements.define("custom-spacing", CustomSpacing);

class CustomSeperator extends HTMLElement{
    constructor(){
        super();
        this.classList.add("customSeperator");
        this.innerHTML = `placeholder`;
    }
}

customElements.define("custom-seperator", CustomSeperator);

class CustomParagraph extends HTMLElement{
     constructor(){
        super();
        this.classList.add("customParagraph");
        this.insertAdjacentHTML('afterbegin', '<br>&emsp;&emsp;&emsp;');
    }
}

customElements.define("custom-paragraph", CustomParagraph);

class CustomExcerpt extends HTMLElement{
     constructor(){
        super();
        this.classList.add("customExcerpt");
        this.insertAdjacentHTML('afterbegin', '<br>');
        this.insertAdjacentHTML('afterend', '<br>');
    }
}

customElements.define("custom-excerpt", CustomExcerpt);

class CustomCitationList extends HTMLElement{
     constructor(){
        super();
        this.classList.add("customCitationList");
    }
}

customElements.define("custom-citation-list", CustomCitationList);

class CustomCitation extends HTMLElement{
     constructor(){
        super();
        this.classList.add("customCitation");
        this.insertAdjacentHTML('afterbegin', '<br><br>');
    }
}

customElements.define("custom-citation", CustomCitation);