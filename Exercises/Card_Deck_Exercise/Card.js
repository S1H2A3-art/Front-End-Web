
let cardNumber = ["A",2,3,4,5,6,7,8,9,0,"J","Q","K"];
let cardSuit = ["♠","♥","♣","♦"];

class CardDiv extends HTMLElement{
    constructor(rank, suit){
        super();
        this.classList.add("card-div");

        this.rank = cardNumber[rank - 1];

        this.suitSymbol = cardSuit[suit];

        this.innerHTML = `${this.suitSymbol}${this.rank}`;

        this.onclick = () => this.flip();
        
    }

    flip(){
       this.classList.toggle("flipped");  
    }

    hide(){
        this.classList.add("flipped");
    }

    show(){
        this.classList.remove("flipped");
    }

}

customElements.define("card-div",CardDiv);