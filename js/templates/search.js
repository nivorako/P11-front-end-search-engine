import Card from "./card.js"
import NotFound from "./notFound.js"

export default class Search{
    constructor () {
        this.search = document.querySelector('.search')
        //this.search = document.createElement('div')
    }

    onSearch(recipes){
        const searchInput = document.querySelector('.search__input')
        const cards = document.querySelector('.cards')
        const notFoundWrapper = document.querySelector('.notFound')
        searchInput.addEventListener('keyup', (e) => {
           
            let inputValue = e.target.value
            if(inputValue.length > 3){
                cards.innerHTML = ""
                let selectedList = []
                recipes.forEach(recipe => {
                    const length = Object.entries(recipe).length
                    // on remplit list
                    for(let i= 0; i< length; i++) {
                        if(Object.keys(recipe)[i] === "appliance"){
                            
                            if(Object.values(recipe)[i].toLowerCase().includes(inputValue.toLowerCase())){
                                selectedList.push(recipe)
                                
                            }
                        }
                        else if(Object.keys(recipe)[i] === "ustensils"){
                           
                            const ustensilsLength = recipe.ustensils.length
                            for(let j = 0; j < ustensilsLength; j++){
                                if(recipe.ustensils[j].toLowerCase().includes(inputValue.toLowerCase())){
                                    selectedList.push(recipe)
                                }
                            }
                            if(Object.values(recipe)[i].includes(inputValue)){
                                
                            }
                        }
                        else if(Object.keys(recipe)[i] === "ingredients"){
                            const ingedientsLength = recipe.ingredients.length
                            for(let k = 0; k < ingedientsLength; k++){
                                if(recipe.ingredients[k].ingredient.toLowerCase().includes(inputValue.toLowerCase()))
                                selectedList.push(recipe)
                            }
                        }
                    }
                })
                if(selectedList.length === 0){
                    const notFound = new NotFound()
                    notFound.render()
                    notFoundWrapper.classList.remove('hidden')
                }else{
                    selectedList.forEach(selected => {
                        const newCard = new Card(selected)
                        const newCardTemplate = newCard.render()
                        
                        cards.appendChild(newCardTemplate)
                    })
                }
               
            }
            if(inputValue.length === 3){
                notFoundWrapper.classList.add('hidden')
                recipes.forEach(recipe => {
                    const card = new Card(recipe)
                    const template = card.render()
                    
                    cards.appendChild(template)
                })
            }
        })
    }

    render(){
        const search = /*html*/`
            <input class="search__input" placeholder="rechercher une recette" type="text">
            <div class="search__btn">
                <i class="fa fa-search"></i>
            </div>
        `

        this.search.innerHTML = search;
        
        return this.search;
    }
}
