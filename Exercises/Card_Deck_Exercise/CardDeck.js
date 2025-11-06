
class CardDeck{
    constructor(){
        this.deckOfCards = [];
        this.cardInHand = [];
        for(let i = 1; i < cardNumber.length+1; i++){
            for(let j = 0; j < cardSuit.length; j++){
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