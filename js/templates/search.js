import Card from "./card.js"
import NotFound from "./notFound.js"
import Appliance from "./appliance.js"

export default class Search{
    constructor () {
        this.search = document.querySelector('.search')
    }

    onSearch(recipes){
        const searchInput = document.querySelector('.search__input')
        const cards = document.querySelector('.cards')
        const notFoundWrapper = document.querySelector('.notFound')
        searchInput.addEventListener('keyup', (e) => {
           
            let inputValue = e.target.value
            if(inputValue.length >= 3){
                cards.innerHTML = ""
                let selectedList = []
                recipes.forEach(recipe => {
                    if(recipe.appliance){
                        if(recipe.appliance.toLowerCase().includes(inputValue.toLowerCase()))
                        selectedList.push(recipe)
                    } 
                    if(recipe.ingredients){
                        const ingredientLength = recipe.ingredients.length
                        for(let i=0; i<ingredientLength; i++){
                            
                            if(recipe.ingredients[i].ingredient.toLowerCase().includes(inputValue.toLowerCase()))
                            selectedList.push(recipe)
                        }
                    }
                    if(recipe.ustensils){
                        const ustensilLength = recipe.ustensils.length
                        for(let j=0; j<ustensilLength; j++){
                            if(recipe.ustensils[j].toLowerCase().includes(inputValue.toLowerCase())){
                                console.log('ustensil: ', recipe.ustensils[j])
                            }
                        }
                    }
                    if(recipe.name){
                        if(recipe.name.toLowerCase().includes(inputValue.toLowerCase())){
                            selectedList.push(recipe)
                        }
                    }
                    if(recipe.description){
                        if(recipe.description.toLowerCase().includes(inputValue.toLowerCase())){
                            console.log('description: ', recipe.description)
                        }
                    }
                })
                console.log('selected: ', selectedList)
                
                if(selectedList.length === 0){
                    const notFound = new NotFound()
                    notFound.render()
                    notFoundWrapper.classList.remove('hidden')
                }else{
                    //passer selectedlist en paramettre a la methode list ultem class ingredient
                    const appliance = new Appliance(selectedList)
                    appliance.render()

                    selectedList.forEach(selected => {
                        const newCard = new Card(selected)
                        const newCardTemplate = newCard.render()
                        
                        cards.appendChild(newCardTemplate)
                    })
                }
               
            }
            else{
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
