import Api from "../api/api.js"
import Tag from "./tag.js"
import Card from "./card.js"
import NotFound from "./notFound.js"
import Ustensils from "./ustensils.js"
import Appliance from "./appliance.js"
import { removeAccents } from "../utilities/removeAccent.js"

export default class Ingredient{
    constructor(recipes){
        this.ingredientWrapper = document.querySelector('.tag__ingredients')
        this.recipesApi = new Api("./data/recipes.json");
        this.recipes = recipes
        console.log('this.recipes dans ingredient: ', this.recipes)
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

    async listOnclick(){
        const totalRecipes = await this.recipesApi.get();
        const cardWrapper = document.querySelector('.cards')
        const tagItems = document.querySelector('.tag__items')
        const ingredientTagListItems = document.querySelectorAll('.ingredientTag__listItem')
        // ensemble des listes dans ingredientTag
        ingredientTagListItems.forEach(ingredientTagList => {   
        
            //contenu texte de la liste
            const text = ingredientTagList.textContent
            ingredientTagList.addEventListener('click', () => {
                console.log('text: ', text)
                const selectedRecipe = []
                // instance de Tag()
                const tag = new Tag(text)
                // si tagItems.childElementCount < 3 ( au départ il est à 0 )
                const tagItemsLength = tagItems.childElementCount
                // vérifie si la valeur choisie n'est pas déjà affiché
                const checkTagItemsValue = (node) => {  
                    
                    return node.textContent.toLowerCase().trim() !== text.toLowerCase().trim()
                }
                // vérifie que tag items ne dépasse pas 3 elts ET la valeur choisie n'est pas déjà affichée
                if((tagItemsLength < 3) && Array.from(tagItems.childNodes).every(checkTagItemsValue)){
                    
                    // alors :
                    const tagTemplate = tag.render()
                    // insérer tagTemplate dans tagItems
                    tagItems.appendChild(tagTemplate)
                    // vider le contenu text de ingredientTagList
                    // console.log('ingredientTagList.textContent: ', ingredientTagList.textContent)
                    ingredientTagList.innerHTML = ""
                    
                     // selectionner recipes selon text
                    // console.log('this.recipes à l origine: ', this.recipes)
                    this.recipes.forEach(recipe => {   
                        recipe.ingredients.forEach(ingredient => {
                            if(removeAccents(ingredient.ingredient.toLowerCase().trim()) === removeAccents(text.toLowerCase().trim())){
                                selectedRecipe.push(recipe)
                            }
                        })                    
                    })
                    // si selectedRecipe n'est pas vide
                    if(selectedRecipe.length > 0 ){
                        // affecter selectedRecipe à this.recipe
                        this.recipes = selectedRecipe
                        // instancier new Appliance()
                        const appliance = new Appliance(selectedRecipe)
                        appliance.render()
                        // instancier 
                        const ustensil = new Ustensils(selectedRecipe)
                        ustensil.render()
                        // new Ingerdient()
                        const ingredient = new Ingredient(selectedRecipe)
                        ingredient.render()
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
                    // récupérer le tagItem actuel
                    const tagItem = document.querySelector(`.tag__item${tag.instanceId}`)
                    // ajouter couleur à tagItem
                    tagItem.classList.add('bg-primary')

                    // // Gestion tag close : 
                    //récupérer tagClose actuel
                    const tagClose = document.querySelector(`.tag__itemClose${tag.instanceId}`)
                    // à chaque clic, faire ceci :
                    tagClose.addEventListener('click', () => {
                        // supprimer le tag
                        tagItem.remove()
                        // remettre le texte dans la liste
                        ingredientTagList.innerHTML = tagItem.textContent

                        // // renouveler list dans card                   
                        // récupérer le reste de tag.textContent et refaire la liste à partir de 
                        // si il ne reste que un seul enfant de tagItems
                        if(tagItems.childNodes.length == 0){
                            cardWrapper.innerHTML = ""
                            // console.log('recipe de secours: ', totalRecipes)
                            totalRecipes.forEach(recipe => {
                                let newCard = new Card(recipe)
                                let newCardTemplate = newCard.render()
                                cardWrapper.appendChild(newCardTemplate)
                                })
                            // mettre à jour liste tag
                            const appliance = new Appliance(totalRecipes)
                            appliance.render()
                             // instancier new Ingredient()
                            const ingredient = new Ingredient(totalRecipes)
                            ingredient.render()
                            // instancier 
                            const ustensil = new Ustensils(totalRecipes)
                            ustensil.render()
                        // sinon
                        }else{
                            
                            // sur chaque tag
                            //if(tagItems.childnodes.classList.contains(bg-primary)){selectionner this.recipesApi selon bg-primary}
                            // sinon .... 
                            const selectedRecipes = []
                            console.log('selectedRecipe dans close debut: ', selectedRecipes)
                            console.log('tagItems.childNodes: ', tagItems.childNodes)
                            tagItems.childNodes.forEach(node => {
                                // traiter selon ingredient
                                console.log('yess-primary')
                                console.log('texte node: ', node.textContent)
                                totalRecipes.forEach(recipe => {   
                                    recipe.ingredients.forEach(ingredient => {
                                        if(removeAccents(ingredient.ingredient.toLowerCase().trim()) === removeAccents(node.textContent.toLowerCase().trim())){
                                            selectedRecipes.push(recipe)
                                        }
                                    })                    
                                })
                                console.log('selected dans primary: ', selectedRecipes)
                            })
                           
                            // mettre à jour liste tag
                            const appliance = new Appliance(selectedRecipes)
                            // console.log('ici j instancie new Appliance dans tagclose si tagItems.childNodes.length > 0')
                            appliance.render()
                            // instancier new Ingredient()
                            const ingredient = new Ingredient(selectedRecipes)
                            ingredient.render()
                            // instancier 
                            const ustensil = new Ustensils(selectedRecipes)
                            ustensil.render()
                            // console.log('selectedRecipe après! ', selectedRecipe)
                            cardWrapper.innerHTML = ""
                            selectedRecipes.forEach(recipe => {
                                let newCard = new Card(recipe)
                                let newCardTemplate = newCard.render()
                                cardWrapper.appendChild(newCardTemplate)
                                })
                        }
                    })         
                }
            })
        })
        
    }
    //parametre liste mise a jour
    listItems(){
        let ingredCount = 0
        let select = 0
        let listHTML = ""
        let ingredientTab = []

        this.recipes.forEach(recipe => {
            // pour chaque recipe
            const length = Object.entries(recipe).length
            for(let i= 0; i < length; i++){
                // si Object.keys(recipe)[i] est ingredients
                if((Object.keys(recipe)[i] === "ingredients") ){
                    //console.log('Object.values(recipe)[i]: ', Object.values(recipe)[i])
                    // pour chaque ingredient
                    const ingredientLength = Object.values(recipe)[i].length
                    for(let j = 0; j < ingredientLength; j++){
                        ingredCount++
                        // si ingredientTab ne contient pas ingredient
                        if(!ingredientTab.includes(removeAccents(Object.values(recipe)[i][j].ingredient.toLowerCase()))){
                            select++
                            ingredientTab.push(removeAccents(Object.values(recipe)[i][j].ingredient.toLowerCase()))
                        }
                    }
                }
            }
        })
        
        ingredientTab.sort().forEach(ingredient => {
            listHTML += `
                <li class="ingredientTag__listItem col-4"> ${ingredient} </li>  
            `;
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