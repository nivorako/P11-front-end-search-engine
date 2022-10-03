import Card from "./card.js"
import NotFound from "./notFound.js"
import Appliance from "./appliance.js"
import Ingredient from "./ingredient.js"
import Ustensils from "./ustensils.js"
import { removeAccents } from "../utilities/removeAccent.js"

export default class Search{
    constructor () {
        this.search = document.querySelector('.search')
    }

    onSearch(recipes){
        const searchInput = document.querySelector('.search__input')
        const cards = document.querySelector('.cards')
        const notFoundWrapper = document.querySelector('.notFound')
        const tagItems = document.querySelector('.tag__items')
        // a chaque pression sur clavier: 
        searchInput.addEventListener('keyup', (e) => {
            // vider les tag
            while(tagItems.firstChild){
                tagItems.removeChild(tagItems.firstChild)
            }
            let selectedList = []
            let inputValue = e.target.value
            // si longueur de mot saisi
            if(inputValue.length >= 3){
                cards.innerHTML = ""
                
                recipes.forEach(recipe => {
                    if(recipe.appliance){
                        if(removeAccents(recipe.appliance.toLowerCase()).trim().includes(removeAccents(inputValue.toLowerCase().trim())))
                        selectedList.push(recipe)
                    } 
                    if(recipe.ingredients){
                        const ingredientLength = recipe.ingredients.length
                        for(let i=0; i<ingredientLength; i++){
                            
                            if(removeAccents(recipe.ingredients[i].ingredient.toLowerCase().trim()).includes(removeAccents(inputValue.toLowerCase().trim())))
                            selectedList.push(recipe)
                        }
                    }
                    if(recipe.ustensils){
                        const ustensilLength = recipe.ustensils.length
                        for(let j=0; j<ustensilLength; j++){
                            if(removeAccents(recipe.ustensils[j].toLowerCase().trim()).includes(removeAccents(inputValue.toLowerCase().trim()))){
                                selectedList.push(recipe)
                            }
                        }
                    }
                    if(recipe.name){
                        if(removeAccents(recipe.name.toLowerCase().trim()).includes(removeAccents(inputValue.toLowerCase().trim()))){
                            selectedList.push(recipe)
                        }
                    }
                    if(recipe.description){
                        if(removeAccents(recipe.description.toLowerCase().trim()).includes(removeAccents(inputValue.toLowerCase().trim()))){
                            //console.log('description: ', recipe.description)
                            selectedList.push(recipe)
                        }
                    }
                    
                })
                const filteredList  = []
                const selectedListLength = selectedList.length
                selectedList.forEach(list => {
                    if(!filteredList.includes(list)){
                        filteredList.push(list)
                    }
                })
                // si la liste est vide
                if(filteredList.length === 0){
                    const notFound = new NotFound()
                    notFound.render()
                    notFoundWrapper.classList.remove('hidden')
                }else{
                    // passer selectedlist à new Appliance() 
                    const appliance = new Appliance(filteredList)
                    // et afficher
                    appliance.render()
                    // pareil pour ingredient
                    const ingredient = new Ingredient(filteredList)
                    ingredient.render()
                    //et ustensils
                    const ustensil = new Ustensils(filteredList)
                    ustensil.render()

                    // supprimer la page not found
                    notFoundWrapper.classList.add('hidden')

                    // donner chaque list de selectedList à newcard pour afficher dans cards
                    filteredList.forEach(selected => {
                        const newCard = new Card(selected)
                        const newCardTemplate = newCard.render()
                        cards.appendChild(newCardTemplate)
                    })
                }
               
            }
            else{
                notFoundWrapper.classList.add('hidden')
                cards.innerHTML = ""
                const newAppliance = new Appliance(recipes)
                newAppliance.render()
                const newIngredient = new Ingredient(recipes)
                newIngredient.render()
                const newUstensil = new Ustensils(recipes)
                newUstensil.render()
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
