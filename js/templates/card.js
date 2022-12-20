export default class Card{
    constructor(recipe){
        this.card = document.createElement('article')
        this.recipe = recipe
    }

    cardList(ingredients){
        let cardListHTML = ""
        ingredients.forEach(elt => {
            cardListHTML += `
            <li class="card__listItem">
                <span class="card__ingredient"> ${elt.ingredient} </span>
                ${elt.quantity ? elt.quantity.toString().trim() : ""} ${
                    elt.unit ? elt.unit.toLowerCase().trim() : ""
                  }
            </li>
        `
        return cardListHTML
        })
        
        return cardListHTML
    }

    render(){
        const card = /*html */`
            
                <div class="card__thumb"></div>
                <div class="card__body p-3">
                    <div class="card__head">
                        <h2 class="card__title">${this.recipe.name} </h2>
                        <div class="card__timer">
                            <i class="card__timeWatch far fa-clock"></i>
                            <span class="card__minutes">${this.recipe.time} minutes</span>
                        </div>
                    </div>
                    <div class="card__content">
                        <div class="card__list">
                            <ul class="card__listItems">
                               ${this.cardList(this.recipe.ingredients)}
                            </ul>
                        </div>
                        <div class="card__receips">${this.recipe.description} </div>
                    </div>
                </div>
           
        `;
        this.card.innerHTML = card
        
        return this.card
    }
}