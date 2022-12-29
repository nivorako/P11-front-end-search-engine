import { removeAccents } from "../utilities/removeAccent.js"
import Tag from "./tag.js"
import Appliance from "./appliance.js"
import Ingredient from "./ingredient.js"
import Ustensils from "./ustensils.js"
import Api from "../api/api.js"
import NotFound from "./notFound.js"
import Card from "./card.js"

export default class ApplianceListItem{
    constructor(recipes){
        this.wrapper = document.querySelector('.applianceTag__listItems')
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

    listItemAppliance(){
        const applianceTagInput = document.querySelector(".applianceTag__input")

        let listHTML = ""
        // tab pour futur texte de applianceTag__listItems 
        let applianceTab = []
        this.recipes.forEach(recipe => {
            const length = Object.entries(recipe).length
            for(let i= 0; i < length; i++){
                // si ( object.keys === appliance ) ET (pas de doublon)
                if((Object.keys(recipe)[i] === "appliance") && (!applianceTab.includes(Object.values(recipe)[i]))){
                    // si il n y a pas de tag
                    applianceTab.push(Object.values(recipe)[i])
                    listHTML += `
                        <li class="applianceTag__listItem col-4 applianceTag__listItem"> ${Object.values(recipe)[i]} </li>
                    `;
                }
            }
        })
        

        return listHTML;
    }

    async listOnclick(){
        const totalRecipes = await this.recipesApi.get();
        const cardWrapper = document.querySelector('.cards')
        const tagItems = document.querySelector('.tag__items')

        // ensemble des listes dans applianceTag
        const applianceTagListItems = document.querySelectorAll('.applianceTag__listItem')
        applianceTagListItems.forEach(applianceTagList => { 
            
            // contenu texte de la liste
            const text = applianceTagList.textContent
        
            // sur chaque liste   
            applianceTagList.addEventListener('click', () => { 
               
                const selectedRecipe = []
                // instance Tag()          
                const tag = new Tag(text)  
                // si tagItems.childElementCount < 3 ( au départ il est à 0 )
                // && (tagItems.childNodes.every(checkTagItemsValue))
               
                const tagItemsLength = tagItems.childElementCount
                // vérifie si la valeur choisie n'est pas déjà affiché
                const checkTagItemsValue = (node) => {  
                    
                    return removeAccents(node.textContent.toLowerCase().trim()) !== removeAccents(text.toLowerCase().trim())
                }
                // vérifie si la valeur choisie n'est pas déjà affiché
                if(Array.from(tagItems.childNodes).every(checkTagItemsValue)){
                     // appliquer render() à tag
                    const tagTemplate = tag.render()
                    // le placer dans tagItems
                    tagItems.appendChild(tagTemplate)
                    // vider le contenu texte de la liste
                    applianceTagList.innerHTML = ""
                    // selectionner recipes selon text
                    
                    this.recipes.forEach(recipe => {                      
                        if(removeAccents(recipe.appliance.toLowerCase()) === removeAccents(text.toLowerCase().trim())){
                            selectedRecipe.push(recipe)
                        }  
                    })
                    
                    // si selectedRecipe n'est pas vide
                    if(selectedRecipe.length > 0){
                        // affecter selectedRecipe à this.recipe
                        // this.recipes = selectedRecipe
                        // instancier new Ingredient()
                        const ingredient = new Ingredient(selectedRecipe)
                        ingredient.render()
                        // instancier 
                        const ustensil = new Ustensils(selectedRecipe)
                        ustensil.render()

                        const appliance = new Appliance(selectedRecipe)
                        appliance.render()
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
                    tagItem.classList.add('bg-success')

                    // // Gestion tag close : 
                    //récupérer tagClose actuel
                    const tagClose = document.querySelector(`.tag__itemClose${tag.instanceId}`)
                    // à chaque clic, faire ceci :
                    tagClose.addEventListener('click', () => {
                        // supprimer le tag
                        tagItem.remove()
                        // remettre le texte dans la liste
                        applianceTagList.innerHTML = tagItem.textContent

                        // // renouveler list dans card                   
                        // récupérer le reste de node.textContent et refaire la liste à partir de 
                        // console.log('length: ', tagItems.childNodes.length)
                        if(tagItems.childNodes.length == 0){
                            cardWrapper.innerHTML = ""
                           
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
                        }else{
                            let selectedRecipes = []
                            const successRecipes = []
                            const primaryRecipes = []
                            const dangerRecipes = []
                            const arrayFromSelectedRecipes = []
                            
                            tagItems.childNodes.forEach(node => {                             
                                if(node.classList.contains('bg-success')){
                                    totalRecipes.forEach(recipe => {
                                        //if(removeAccents(recipe.appliance.toLowerCase().trim()) === removeAccents(node.textContent.toLowerCase().trim())){
                                        if(removeAccents(recipe.appliance.toLowerCase()).trim().includes(removeAccents(node.textContent.toLowerCase().trim()))){
                                            successRecipes.push(recipe)
                                        }
                                    })
                                    // si (  ) on ajoute le tableau dans un tableau arrayFromSelectedRecipes
                                    if(successRecipes.length>0) arrayFromSelectedRecipes.push(successRecipes)
                                }
                                if(node.classList.contains('bg-primary')){
                                    totalRecipes.forEach(recipe => {   
                                        recipe.ingredients.forEach(ingredient => {
                                            
                                            if(removeAccents(ingredient.ingredient.toLowerCase().trim()).includes(removeAccents(node.textContent.toLowerCase().trim()))){    
                                                primaryRecipes.push(recipe)
                                            }
                                        })                    
                                    })
                                     // si (  ) on ajoute le tableau dans un tableau arrayFromSelectedRecipes
                                    if(primaryRecipes.length>0) arrayFromSelectedRecipes.push(primaryRecipes)
                                }
                                if(node.classList.contains('bg-danger')){
                                    totalRecipes.forEach(recipe => {
                                        
                                        recipe.ustensils.forEach(elt => {
                                            if(removeAccents(elt.toLowerCase().trim()).includes(removeAccents(node.textContent.toLowerCase().trim()))){
                                                dangerRecipes.push(recipe)
                                            }
                                        })
                                    })
                                }
                                 // si (  ) on ajoute le tableau dans un tableau arrayFromSelectedRecipes
                                 if(dangerRecipes.length>0) arrayFromSelectedRecipes.push(dangerRecipes)
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
        const list = this.listItemAppliance()
        this.wrapper.innerHTML = list
        this.listOnclick()
    }
}