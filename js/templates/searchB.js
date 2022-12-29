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
            //pour js bench.me  donner valeur en dur a input value
            //let inputValue = e.target.value
            const inputValue = e.target.value            
            // si longueur de mot saisi
            if(inputValue.length >= 3){
                // à commenter por js B
                cards.innerHTML = ""

                const length = recipes.length

                for (let i=0 ; i<length; i++){
                    for(const [key, value ] of Object.entries(recipes[i])){
                        // if(`${key}` === "appliance" && removeAccents(`${value}`.toLowerCase().trim()) ===  removeAccents(inputValue.toLowerCase().trim())){
                        //     selectedList.push(recipes[i])
                        // }

                        // if(`${key}` === "ustensils" && removeAccents(`${value}`.toLowerCase().trim()).includes(removeAccents(inputValue.toLowerCase().trim()))){
                        //     selectedList.push(recipes[i])
                        // }

                        if(`${key}` === "name" && removeAccents(`${value}`.toLowerCase().trim()).includes(removeAccents(inputValue.toLowerCase().trim()))){
                            selectedList.push(recipes[i])
                        }
                        if(`${key}` === "ingredients"){
                            for(const elt of recipes[i].ingredients)
                            if(removeAccents(elt.ingredient.toLowerCase().trim()).includes(removeAccents(inputValue.toLowerCase().trim()))){
                                selectedList.push(recipes[i])
                            }
                        }
                        if(`${key}` === "description" && removeAccents(`${value}`.toLowerCase().trim()).includes(removeAccents(inputValue.toLowerCase().trim()))){
                            selectedList.push(recipes[i])
                        }
                    }
                }

                // éviter doublons dans selectedList
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
                        // à commenter pour jsB
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
