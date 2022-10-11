import Tag from "./tag.js";
import Card from "./card.js";
import Ingredient from "./ingredient.js";
import Appliance from "./appliance.js";
import NotFound from "./notFound.js";
import Api from "../api/api.js";
import { removeAccents } from "../utilities/removeAccent.js";

export default class Ustensils {
    constructor(recipes){
        this.ustensilsWrapper = document.querySelector('.tag__ustensils')
        this.recipes = recipes
        this.recipesApi = new Api("./data/recipes.json");
    }

    ustensilOnClick(){
        const ustensilTagclose = document.querySelector('.ustensilTag__close')
      
        
        ustensilTagclose.addEventListener('click', (e) => {
            if(ustensilTagclose.classList.contains('fa-chevron-up')){
                this.closeTag()
            }else{
                this.openTag()
            }
        })

        document.addEventListener('click', (e) => {
            if(!e.target.closest(".tag__ustensils")){
                this.closeTag()
            }
        })
    }

    openTag(){
        const ustensilTagTitle = document.querySelector('.ustensilTag__title')
        const ustensilTagInput = document.querySelector('.ustensilTag__input')
        const ustensilTagList = document.querySelector('.ustensilTag__list')
        const ustensilTagclose = document.querySelector('.ustensilTag__close')
        
        this.ustensilsWrapper.classList.remove("col-2")
        this.ustensilsWrapper.classList.add('col-6')

        ustensilTagTitle.classList.add('hidden')
        ustensilTagInput.classList.remove('hidden')
        ustensilTagList.classList.remove('hidden')  

        ustensilTagclose.classList.remove('fa-chevron-down')
        ustensilTagclose.classList.add('fa-chevron-up')
    }

    closeTag(){
        const ustensilTagTitle = document.querySelector('.ustensilTag__title')
        const ustensilTagInput = document.querySelector('.ustensilTag__input')
        const ustensilTagList = document.querySelector('.ustensilTag__list')
        const ustensilTagclose = document.querySelector('.ustensilTag__close')
        
        this.ustensilsWrapper.classList.add("col-2")
        this.ustensilsWrapper.classList.remove('col-6')

        ustensilTagTitle.classList.remove('hidden')
        ustensilTagInput.classList.add('hidden')
        ustensilTagList.classList.add('hidden')  

        ustensilTagclose.classList.add('fa-chevron-down')
        ustensilTagclose.classList.remove('fa-chevron-up')
    }

    async listOnclick(){
        const totalRecipes = await this.recipesApi.get();
        const cardWrapper = document.querySelector('.cards')
        const tagItems = document.querySelector('.tag__items')
        // selectionne les listes dans ustensilTag__listItem
        const ustensilTagListItems = document.querySelectorAll('.ustensilTag__listItem')
        ustensilTagListItems.forEach(ustensilTagList => {  
            const text = ustensilTagList.textContent 
            // a chaque clic sur une liste:  
            ustensilTagList.addEventListener('click', () => {
                const selectedRecipe = []
                // donner le textContent à new Tag() 
                const tag = new Tag(text)
                // si instance new Tag() < 3 
                // si tagItems.childElementCount < 3 ( au départ il est à 0 )
                const tagItemsLength = tagItems.childElementCount
                // vérifie si la valeur choisie n'est pas déjà affiché
                const checkTagItemsValue = (node) => {  
                    
                    return removeAccents(node.textContent.toLowerCase().trim()) !== removeAccents(text.toLowerCase().trim())
                }
                
                 if(Array.from(tagItems.childNodes).every(checkTagItemsValue)){
                    const tagTemplate = tag.render()
                    // et insérer chaque tagTemplate dans tagItems
                    tagItems.appendChild(tagTemplate)
                    // supprimer le content de la liste dans ustensilTag__listItem
                    ustensilTagList.textContent = ""

                    // selectionner recipes selon text
                    this.recipes.forEach(recipe => {
                        recipe.ustensils.forEach(ustensil => {
                            if(removeAccents(ustensil.toLowerCase().trim()).includes(removeAccents(text.toLowerCase().trim()))){
                                selectedRecipe.push(recipe)
                            }
                        })                       
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
                    tagItem.classList.add('bg-danger')

                    // // Gestion tag close : 
                    //récupérer tagClose actuel
                    const tagClose = document.querySelector(`.tag__itemClose${tag.instanceId}`)
                    // à chaque clic, faire ceci :
                    tagClose.addEventListener('click', () => {
                        // supprimer le tag
                        tagItem.remove()
                        // remettre le texte dans la liste
                        ustensilTagList.innerHTML = tagItem.textContent
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
                                    // si (  ) on ajoute le tableau dans un tableau arrayFromSelectedRecipes
                                    if(dangerRecipes.length>0) arrayFromSelectedRecipes.push(dangerRecipes)
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
        let listHTML = ""
        let ustensilTab = []
        this.recipes.forEach(recipe => {
            const length = Object.entries(recipe).length
            for(let i= 0; i < length; i++){
                if((Object.keys(recipe)[i] === "ustensils") ){
                    const ustensLength = Object.values(recipe)[i].length
                    for(let j = 0; j < ustensLength; j++){
                        if(!ustensilTab.includes(Object.values(recipe)[i][j])){
                            ustensilTab.push(Object.values(recipe)[i][j])
                           
                        }
                    }
                }
            }
        })

        ustensilTab.sort().forEach(ustensil =>{
            
            listHTML += `
            <li class="ustensilTag__listItem col-4"> ${ustensil[0].toUpperCase() + ustensil.slice(1)} </li>
        `;
        })

        return listHTML;
    }

    searchUstensil(recipes){
        const ustensilTagInput = document.querySelector('.ustensilTag__input')
        const cards = document.querySelector('.cards')
        const notFoundWrapper = document.querySelector('.notFound')
        ustensilTagInput.addEventListener('keyup', (e) => {
            let inputValue = e.target.value
            let selectedList = []
            console.log('inputValue: ', inputValue.length)
            if(inputValue.length > 2){
                for(const recipe of recipes){   
                    if(recipe.ustensils){
                        const ustensilLength = recipe.ustensils.length
                        for(let j=0; j<ustensilLength; j++){
                            if(removeAccents(recipe.ustensils[j].toLowerCase().trim()).includes(removeAccents(inputValue.toLowerCase().trim()))){
                                selectedList.push(recipe)
                            }
                        }
                    } 
                }

                // éviter doublons dans selectedList
                const filteredList  = []
                selectedList.forEach(list => {
                    if(!filteredList.includes(list)){
                        filteredList.push(list)
                    }
                })
                console.log('filtered: ', filteredList)
                if(filteredList.length === 0){
                    console.log('zero')
                    cards.innerHTML = ""
                    const notFound = new NotFound()
                    notFound.render()
                    notFoundWrapper.classList.remove('hidden')
                }else{
                    console.log('pas zero')
                    // ici on instancie seulement appliance et unstensils
                    const appliance = new Appliance(filteredList)
                    appliance.render()
                    const ingredient = new Ingredient(filteredList)
                    ingredient.render()
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

                const appliance = new Appliance(recipes)
                appliance.render()
                const ingredient = new Ingredient(recipes)
                    ingredient.render()
                recipes.forEach(recipe => { 
                    const card = new Card(recipe)
                    const template = card.render()
                    
                    cards.appendChild(template)
                })
            }
        })
    }

    render(){
        const ustensil = /*html*/ `
        <div class="ustensilTag__btn  bg-danger" > 
            <h2 class="ustensilTag__title text-center">Ustensiles</h2>
            <input class="ustensilTag__input hidden" type="text" placeholder="rechercher un ustensil"> 
            <i class="fas fa-chevron-down ustensilTag__close"></i> 
        </div>
        <div class="ustensilTag__list hidden bg-danger p-3">            
            <ul class="ustensilTag__listItems row bg-danger">
                       ${this.listItems()}
            </ul> 
        </div> 
        `;

        this.ustensilsWrapper.innerHTML = ustensil;
        this.searchUstensil(this.recipes)
        this.ustensilOnClick();
        this.listOnclick();
        return this.ustensilsWrapper;
    }
}