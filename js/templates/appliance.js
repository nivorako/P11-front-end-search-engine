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

    selectRecipe(array){
        let foundRecipes = []
        if(array.length === 3){
            const tab = array[0].filter(elt => array[1].indexOf(elt) !== -1)
            foundRecipes = array[2].filter(elt => tab.indexOf(elt) !== -1)
            
        }else if(array.length === 2){
            foundRecipes = array[0].filter(elt => array[1].indexOf(elt) !== -1)
        }else{
            foundRecipes = array[0]
        }
         
        return foundRecipes
    }

    listItems(){
        const tagItems = document.querySelector('.tag__items')
        // tab pour futur liste des currents tags
        let arrayTag = []
        // mettre dedans chaque texte de tagItems.childNodes
        Array.from(tagItems.childNodes).forEach(node => {
            arrayTag.push(node.innerText)
        })

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

    searchAppliance(recipes){
        const applianceTagInput = document.querySelector('.applianceTag__input')
        const cards = document.querySelector('.cards')
        const notFoundWrapper = document.querySelector('.notFound')
        applianceTagInput.addEventListener('keyup', (e) => {
            let inputValue = e.target.value
            let selectedList = []
            console.log('inputValue length: ', inputValue.length)
            if(inputValue.length > 2){
                for(const recipe of recipes){   
                    if(recipe.appliance){
                        if(removeAccents(recipe.appliance.toLowerCase()).trim().includes(removeAccents(inputValue.toLowerCase().trim())))
                        selectedList.push(recipe)
                    } 
                }

                 // éviter doublons dans selectedList
                 const filteredList  = []
                 selectedList.forEach(list => {
                     if(!filteredList.includes(list)){
                         filteredList.push(list)
                     }
                 })

                 if(filteredList.length === 0){
                    console.log('zero')
                    cards.innerHTML = ""
                    const notFound = new NotFound()
                    notFound.render()
                    notFoundWrapper.classList.remove('hidden')
                }else{

                    // ici on instancie seulement ingredient et unstensils
                    const ingredient = new Ingredient(filteredList)
                    ingredient.render()
                    const ustensil = new Ustensils(filteredList)
                    ustensil.render()    
                    // supprimer la page not found
                    notFoundWrapper.classList.add('hidden')
                    cards.innerHTML = ""
                    // donner chaque list de selectedList à newcard pour afficher dans cards
                    filteredList.forEach(selected => {
                        const newCard = new Card(selected)
                        const newCardTemplate = newCard.render()
                        cards.appendChild(newCardTemplate)
                    })
                }
            }else{
                notFoundWrapper.classList.add('hidden')
                cards.innerHTML = ""

                const ingredient = new Ingredient(recipes)
                ingredient.render()
                const ustensil = new Ustensils(recipes)
                ustensil.render() 
                recipes.forEach(recipe => { 
                    const card = new Card(recipe)
                    const template = card.render()
                    
                    cards.appendChild(template)
                })
            }
        })
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
        this. searchAppliance(this.recipes)
        this.listOnclick();
        this.applianceOnClick();
        return this.applianceWrapper;
    }
}
