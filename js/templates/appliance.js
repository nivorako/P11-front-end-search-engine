import Tag from "./tag.js";
import Card from "./card.js";
import Ingredient from "./ingredient.js";
import Ustensils from "./ustensils.js";
import NotFound from "./notFound.js";
import Api from "../api/api.js";
import { removeAccents } from "../utilities/removeAccent.js";


export default class Appliance{
    constructor(recipes){
        this.applianceWrapper = document.querySelector('.tag__appliance');
        this.recipesApi = new Api("./data/recipes.json");
        this.recipes = recipes
        this.recipeDeSecours = recipes
        //console.log('this.recipe dans appliance: ', this.recipes)
    }

    applianceOnClick(){
        const applianceTagclose = document.querySelector('.applianceTag__close')
      
        
        applianceTagclose.addEventListener('click', (e) => {
            if(applianceTagclose.classList.contains('fa-chevron-up')){
                this.closeTag()
            }else{
                this.openTag()
            }
        })

        document.addEventListener('click', (e) => {
            if(!e.target.closest(".tag__appliance")){
                this.closeTag()
            }
        })
    }

    openTag(){
        const applianceTagTitle = document.querySelector('.applianceTag__title')
        const applianceTagInput = document.querySelector('.applianceTag__input')
        const applianceTagList = document.querySelector('.applianceTag__list')
        const applianceTagclose = document.querySelector('.applianceTag__close')
        
        this.applianceWrapper.classList.remove("col-2")
        this.applianceWrapper.classList.add('col-6')

        applianceTagTitle.classList.add('hidden')
        applianceTagInput.classList.remove('hidden')
        applianceTagList.classList.remove('hidden')  

        applianceTagclose.classList.remove('fa-chevron-down')
        applianceTagclose.classList.add('fa-chevron-up')
    }

    closeTag(){
        const applianceTagTitle = document.querySelector('.applianceTag__title')
        const applianceTagInput = document.querySelector('.applianceTag__input')
        const applianceTagList = document.querySelector('.applianceTag__list')
        const applianceTagclose = document.querySelector('.applianceTag__close')
        
        this.applianceWrapper.classList.add("col-2")
        this.applianceWrapper.classList.remove('col-6')

        applianceTagTitle.classList.remove('hidden')
        applianceTagInput.classList.add('hidden')
        applianceTagList.classList.add('hidden')  

        applianceTagclose.classList.add('fa-chevron-down')
        applianceTagclose.classList.remove('fa-chevron-up')
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
                // vérifie si les elts tag ne dépasse pas le nbre 3 ET la valeur choisie n'est pas déjà affiché
                if((tagItemsLength < 3) && Array.from(tagItems.childNodes).every(checkTagItemsValue)){
                     // appliquer render() à tag
                    const tagTemplate = tag.render()
                    // le placer dans tagItems
                    tagItems.appendChild(tagTemplate)
                    // vider le contenu texte de la liste
                    applianceTagList.innerHTML = ""
                    console.log('this.recipes entrée appliance: ', this.recipes)
                    // selectionner recipes selon text
                    this.recipes.forEach(recipe => {                      
                        if(removeAccents(recipe.appliance.toLowerCase()) === removeAccents(text.toLowerCase().trim())){
                            selectedRecipe.push(recipe)
                        }  
                    })
                    console.log('this.recipes dans appliance après comparaison avec text: ', selectedRecipe)
                    // si selectedRecipe n'est pas vide
                    if(selectedRecipe.length > 0){
                        // affecter selectedRecipe à this.recipe
                        this.recipes = selectedRecipe
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
                        // récupérer le reste de tag.textContent et refaire la liste à partir de 
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
                            // gérer selectedRecipes après close:
                            console.log('selectedRecipe avant! ', selectedRecipe)
                            // nouveau tableau electedRecipes vide
                            const selectedRecipes = []
                            tagItems.childNodes.forEach(node => {                               
                                if(node.classList.contains('bg-success')){
                                    totalRecipes.forEach(recipe => {
                                        if(removeAccents(recipe.appliance.toLowerCase().trim()) === removeAccents(node.textContent.toLowerCase().trim())){
                                            selectedRecipes.push(recipe)
                                        }
                                    })
                                }
                                if(node.classList.contains('bg-primary')){
                                    totalRecipes.forEach(recipe => {   
                                        recipe.ingredients.forEach(ingredient => {
                                            if(removeAccents(ingredient.ingredient.toLowerCase().trim()) === removeAccents(node.textContent.toLowerCase().trim())){
                                                selectedRecipes.push(recipe)
                                            }
                                        })                    
                                    })
                                }
                                if(node.classList.contains('bg-danger')){
                                    totalRecipes.forEach(recipe => {
                                        
                                        recipe.ustensils.forEach(elt => {
                                            if(removeAccents(elt.toLowerCase().trim()).includes(removeAccents(node.textContent.toLowerCase().trim()))){
                                                selectedRecipes.push(recipe)
                                            }
                                        })
                                    })
                                }
                            })
                            console.log('selectedRecipes après close ', selectedRecipes)
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

    listItems(){
        let listHTML = ""
        let applianceTab = []
        this.recipes.forEach(recipe => {
            const length = Object.entries(recipe).length
            for(let i= 0; i < length; i++){
                if((Object.keys(recipe)[i] === "appliance") && (!applianceTab.includes(Object.values(recipe)[i]))){
                   applianceTab.push(Object.values(recipe)[i])
                   listHTML += `
                        <li class="applianceTag__listItem col-4"> ${Object.values(recipe)[i]} </li>
                   `;
                }
            }
        })
        return listHTML;
    }

    render(){
        const tool = /*html */ `
        <div class="applianceTag__btn  bg-success" > 
            <h2 class="applianceTag__title text-center">Appareil</h2>
            <input class="applianceTag__input hidden" type="text" placeholder="rechercher un appareil"> 
            <i class="fas fa-chevron-down applianceTag__close"></i> 
        </div>
        <div class="applianceTag__list hidden bg-success p-3">        
            <ul class="applianceTag__listItems row bg-success p-">
                    ${this.listItems()}
            </ul> 
        </div> 
            
        `;

        this.applianceWrapper.innerHTML = tool;
        this.listOnclick();
        this.applianceOnClick();
        return this.applianceWrapper;
    }
}
