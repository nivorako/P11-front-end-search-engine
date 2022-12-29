import { removeAccents } from "../utilities/removeAccent.js"
import Tag from "./tag.js"
import Appliance from "./appliance.js"
import Ingredient from "./ingredient.js"
import Ustensils from "./ustensils.js"
import Api from "../api/api.js"
import NotFound from "./notFound.js"
import Card from "./card.js"

export default class ListItems{
    constructor(recipes){
        this.wrapper = document.querySelector('.ingredientTag__listItems')
        this.recipes = recipes
        this.recipesApi = new Api("./data/recipes.json");
    }
    
    listItemIngredient(){
        const ingredientTagInput = document.querySelector('.ingredientTag__input')
        let listHTML = ""
        let ingredientTab = []
        this.recipes.forEach(recipe => {
            // pour chaque recipe
            const length = Object.entries(recipe).length
            for(let i= 0; i < length; i++){
                // si Object.keys(recipe)[i] est ingredients
                if((Object.keys(recipe)[i] === "ingredients") ){
                    // pour chaque ingredient
                    const ingredientLength = Object.values(recipe)[i].length
                    for(let j = 0; j < ingredientLength; j++){
                        
                        // si ingredientTab ne contient pas ingredient ET ingredient include inputValue
                        if(
                            (!ingredientTab.includes(removeAccents(Object.values(recipe)[i][j].ingredient.toLowerCase())))
                             && (removeAccents(Object.values(recipe)[i][j].ingredient.toLowerCase()).includes(removeAccents(ingredientTagInput.value)))
                        ){
                            ingredientTab.push(removeAccents(Object.values(recipe)[i][j].ingredient.toLowerCase()))
                        }
                    }
                }
            }
        })
    
        ingredientTab.sort().forEach(ingredient => {
               
            listHTML += `
                <li class="ingredientTag__listItem col-4"> ${ingredient[0].toUpperCase() + ingredient.slice(1)} </li>  
            `;
        })
        return listHTML
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
                
                const selectedRecipe = []
                // instance de Tag()
                const tag = new Tag(text)
                // si tagItems.childElementCount < 3 ( au départ il est à 0 )
                const tagItemsLength = tagItems.childElementCount
                // vérifie si la valeur choisie n'est pas déjà affiché
                const checkTagItemsValue = (node) => {  
                    
                    return removeAccents(node.textContent.toLowerCase()).trim() !== removeAccents(text.toLowerCase().trim())
                }
                // vérifie que la valeur choisie n'est pas déjà affichée
                if(Array.from(tagItems.childNodes).every(checkTagItemsValue)){
                    
                    // alors :
                    const tagTemplate = tag.render()
                    // insérer tagTemplate dans tagItems
                    tagItems.appendChild(tagTemplate)
                    // vider le contenu text de ingredientTagList
                    ingredientTagList.innerHTML = ""
                    
                     // selectionner recipes selon text
                    this.recipes.forEach(recipe => {   
                        recipe.ingredients.forEach(ingredient => {
                            if(removeAccents(ingredient.ingredient.toLowerCase().trim()).includes(removeAccents(text.toLowerCase().trim())))
                            selectedRecipe.push(recipe)
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
                        selectedRecipe.forEach(recipe => {
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
                            let selectedRecipes = []
                            const successRecipes = []
                            const primaryRecipes = []
                            const dangerRecipes = []
                            const arrayFromSelectedRecipes = []

                            tagItems.childNodes.forEach(node => {
                                // traiter selon ingredient
                                if(node.classList.contains('bg-success')){
                                    totalRecipes.forEach(recipe => {

                                        // if(removeAccents(recipe.appliance.toLowerCase().trim()) === removeAccents(node.textContent.toLowerCase().trim())){
                                        if(removeAccents(recipe.appliance.toLowerCase().trim()).includes(removeAccents(node.textContent.toLowerCase().trim()))){
                                            //selectedRecipes.push(recipe)
                                            successRecipes.push(recipe)
                                        }
                                    })
                                    // si (  ) on ajoute le tableau dans un tableau arrayFromSelectedRecipes
                                    if(successRecipes.length>0) arrayFromSelectedRecipes.push(successRecipes)
                                } 
                               
                                if(node.classList.contains('bg-danger')){
                                    totalRecipes.forEach(recipe => {
                                        
                                        recipe.ustensils.forEach(elt => {
                                            if(removeAccents(elt.toLowerCase().trim()).includes(removeAccents(node.textContent.toLowerCase().trim()))){
                                                //selectedRecipes.push(recipe)
                                                dangerRecipes.push(recipe) 
                                            }
                                        })
                                    })
                                    // si (  ) on ajoute le tableau dans un tableau arrayFromSelectedRecipes
                                    if(dangerRecipes.length>0) arrayFromSelectedRecipes.push(dangerRecipes)
                                }

                                if(node.classList.contains('bg-primary')){
                                    totalRecipes.forEach(recipe => {   
                                        recipe.ingredients.forEach(ingredient => {
                                            if(removeAccents(ingredient.ingredient.toLowerCase().trim()).includes(removeAccents(node.textContent.toLowerCase().trim()))){
                                                //selectedRecipes.push(recipe)
                                                primaryRecipes.push(recipe)
                                            }
                                        })                    
                                    })
                                    // si (  ) on ajoute le tableau dans un tableau arrayFromSelectedRecipes
                                    if(primaryRecipes.length>0) arrayFromSelectedRecipes.push(primaryRecipes)
                                }
                            })

                            selectedRecipes = this.selectRecipe(arrayFromSelectedRecipes)
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
   
    render(){
       const list = this.listItemIngredient()
       this.wrapper.innerHTML = list
       this.listOnclick()
    }
}