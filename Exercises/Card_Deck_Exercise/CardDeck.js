
class CardDeck{
    constructor(){
        this.deckOfCards = [];
        this.cardInHand = [];
        this.flipNumber = 0;
        for(let i = 1; i < CardDiv.cardNumber.length+1; i++){
            for(let j = 0; j < CardDiv.cardSuit.length; j++){
                let newCard = new CardDiv(i,j);
                document.getElementById("deckContainer").append(newCard);
                this.deckOfCards.push(newCard);
            }
        }
    }
    hideAll(){
        for(let card of this.deckOfCards){
            card.hide();
        }
        for(let card of this.cardInHand){
            card.hide();
        }
    }
    flipAll(){
        this.flipNumber = 0;
        this.flipNext();
    }
    shuffle(){
        let newDeck = [];
        while(this.deckOfCards.length + this.cardInHand.length > 0){
            let randCard = parseInt((this.deckOfCards.length + this.cardInHand.length)* Math.random());
            if(randCard < this.deckOfCards.length){
                newDeck.push(this.deckOfCards[randCard]);
                this.deckOfCards.splice(randCard,1);
            }else{
                newDeck.push(this.cardInHand[randCard - this.deckOfCards.length]);
                this.cardInHand.splice(randCard - this.deckOfCards.length,1);
            }   
        }
        this.deckOfCards = newDeck;
        for(let card of this.deckOfCards){
             document.getElementById("deckContainer").append(card);
        }
    }
    flipNext(){
        if(this.flipNumber >= this.deckOfCards.length){
            return;
            
        }else{
            setTimeout(() => this.flipNext(), 100);
            this.deckOfCards[this.flipNumber].flip();
            this.flipNumber += 1;
        }
    }
    
}

function draw(deck){
    if(deck.deckOfCards.length > 0){
    let randCardIndex = parseInt(deck.deckOfCards.length * Math.random());
    deck.cardInHand.push(deck.deckOfCards[randCardIndex]);
    document.getElementById("handContainer").append(deck.deckOfCards[randCardIndex]);
    deck.deckOfCards.splice(randCardIndex,1);
    }

}

document.getElementById("draw-button").onclick = () => draw(cd1);
document.getElementById("hide-button").onclick = () => cd1.hideAll();
document.getElementById("flip-button").onclick = () => cd1.flipAll();
document.getElementById("shuffle-button").onclick = () => cd1.shuffle();