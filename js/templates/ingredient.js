import Tag from "./tag.js"
import Card from "./card.js"
import NotFound from "./notFound.js"
import Ustensils from "./ustensils.js"
import Appliance from "./appliance.js"

export default class Ingredient{
    constructor(recipes){
        this.ingredientWrapper = document.querySelector('.tag__ingredients')
        this.recipes = recipes
    }

    ingredientOnClick(){
        const ingredientTagClose = document.querySelector(".ingredientTag__close")
        ingredientTagClose.addEventListener('click', (e) => {
            if(ingredientTagClose.classList.contains('fa-chevron-down')){
                this.closeTag()
            }else{
                this.openTag()
            }
        })

        document.addEventListener('click', (e) => {
            if(!e.target.closest(".tag__ingredients")){
                this.closeTag()
            }
        })
    }

    openTag(){
        const ingredientTagTitle = document.querySelector('.ingredientTag__title')
        const ingredientTagInput = document.querySelector('.ingredientTag__input')
        const ingredientTagList = document.querySelector('.ingredientTag__list')
        const ingredientTagclose = document.querySelector('.ingredientTag__close')
        
        this.ingredientWrapper.classList.remove("col-2")
        this.ingredientWrapper.classList.add('col-6')

        ingredientTagTitle.classList.add('hidden')
        ingredientTagInput.classList.remove('hidden')
        ingredientTagList.classList.remove('hidden')  

        ingredientTagclose.classList.remove('fa-chevron-up')
        ingredientTagclose.classList.add('fa-chevron-down')
    }

    closeTag(){
        const ingredientTagTitle = document.querySelector('.ingredientTag__title')
        const ingredientTagInput = document.querySelector('.ingredientTag__input')
        const ingredientTagList = document.querySelector('.ingredientTag__list')
        const ingredientTagclose = document.querySelector('.ingredientTag__close')
        
        this.ingredientWrapper.classList.add("col-2")
        this.ingredientWrapper.classList.remove('col-6')

        ingredientTagTitle.classList.remove('hidden')
        ingredientTagInput.classList.add('hidden')
        ingredientTagList.classList.add('hidden')  

        ingredientTagclose.classList.add('fa-chevron-up')
        ingredientTagclose.classList.remove('fa-chevron-down')
    }

    listOnclick(){
        const cardWrapper = document.querySelector('.cards')
        const tagItems = document.querySelector('.tag__items')
        const ingredientTagListItems = document.querySelectorAll('.ingredientTag__listItem')
        // ensemble des listes dans ingredientTag
        ingredientTagListItems.forEach(ingredientTagList => {   
            
            //contenu texte de la liste
            const text = ingredientTagList.textContent
            ingredientTagList.addEventListener('click', () => {
                const selectedRecipe = []
                // instance de Tag()
                const tag = new Tag(text)
                // si tagItems.childElementCount < 3 ( au départ il est à 0 )
                const tagItemsLength = tagItems.childElementCount
                if(tagItemsLength < 3){
                    const tagTemplate = tag.render()
                    tagItems.appendChild(tagTemplate)
                    ingredientTagList.textContent = ""

                     // selectionner recipes selon text
                    this.recipes.forEach(recipe => {                      
                        if(recipe.appliance.toLowerCase() === text.toLowerCase().trim()){
                            selectedRecipe.push(recipe)
                        }  
                    })
                    // si selectedRecipe n'est pas vide
                    if(selectedRecipe.length > 0 ){
                        // affecter selectedRecipe à this.recipe
                        this.recipes = selectedRecipe
                        // instancier new Ingredient()
                        const appliance = new Appliance(selectedRecipe)
                        appliance.render()
                        // instancier 
                        const ustensil = new Ustensils(selectedRecipe)
                        ustensil.render()

                        // vider contenu cardWrapper
                        cardWrapper.innerHTML = ""
                        // afficher newCard selon selectedRecipe
                        this.recipes.forEach(recipe => {
                            let newCard = new Card(recipe)
                            let newCardTemplate = newCard.render()
                            cardWrapper.appendChild(newCardTemplate)
                        })
                    }else{
                        // vider contenu cardWrapper
                        cardWrapper.innerHTML = ""
                        const notFound = new NotFound()
                        cardWrapper.appendChild(notFound.render())
                   }
                }
            })
        })
        
    }
    //parametre liste mise a jour
    listItems(){
        let listHTML = ""
        let ingredientTab = []
        this.recipes.forEach(recipe => {
            const length = Object.entries(recipe).length
            for(let i= 0; i < length; i++){
                if((Object.keys(recipe)[i] === "ingredients") ){
                    const ingredientLength = Object.values(recipe)[i].length
                    for(let j = 0; j < ingredientLength; j++){
                        if(!ingredientTab.includes(Object.values(recipe)[i][j].ingredient)){
                            ingredientTab.push(Object.values(recipe)[i][j].ingredient)
                       
                            listHTML += `
                                    <li class="ingredientTag__listItem col-4"> ${Object.values(recipe)[i][j].ingredient} </li>
                            `;
                        }
                    }
                }
            }
        })
        return listHTML;
    }

    render(){
        const ingredientTag = /*html*/ `
            <div class="ingredientTag__btn  bg-primary" > 
                <h2 class="ingredientTag__title text-center">ingredients</h2>
                <input class="ingredientTag__input hidden" type="text" placeholder="rechercher un ingredient"> 
                <i class="fas fa-chevron-up ingredientTag__close"></i> 
            </div>
            <div class="ingredientTag__list hidden bg-primary p-3">        
                <ul class="ingredientTag__listItems row bg-primary">
                    ${this.listItems()}
                </ul> 
            </div> 
            `;

        this.ingredientWrapper.innerHTML = ingredientTag;
        this.ingredientOnClick();
        this.listOnclick();
        return this.ingredientWrapper;
    }
}