import Card from "./card.js"
import NotFound from "./notFound.js"
import Appliance from "./appliance.js"
import Ingredient from "./ingredient.js"
import Ustensils from "./ustensils.js"

export default class Search{
    constructor () {
        this.search = document.querySelector('.search')
    }

    onSearch(recipes){
        const searchInput = document.querySelector('.search__input')
        const cards = document.querySelector('.cards')
        const notFoundWrapper = document.querySelector('.notFound')
        // a chaque pression sur clavier: 
        searchInput.addEventListener('keyup', (e) => {
           
            let inputValue = e.target.value
            // si longueur de mot saisi
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
                // si la liste est vide
                if(selectedList.length === 0){
                    const notFound = new NotFound()
                    notFound.render()
                    notFoundWrapper.classList.remove('hidden')
                }else{
                    // passer selectedlist à new Appliance() 
                    const appliance = new Appliance(selectedList)
                    // et afficher
                    appliance.render()
                    // pareil pour ingredient
                    const ingredient = new Ingredient(selectedList)
                    ingredient.render()
                    //et ustensils
                    const ustensil = new Ustensils(selectedList)
                    ustensil.render()

                    // supprimer la page not found
                    notFoundWrapper.classList.add('hidden')
                    
                    // donner chaque list de selectedList à newcard pour afficher dans cards
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
