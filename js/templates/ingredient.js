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
        
    }

    ingredientOnClick(){
        const ingredientTagClose = document.querySelector(".ingredientTag__close")
        ingredientTagClose.addEventListener('click', (e) => {
            if(ingredientTagClose.classList.contains('fa-chevron-up')){
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

        ingredientTagclose.classList.remove('fa-chevron-down')
        ingredientTagclose.classList.add('fa-chevron-up')
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

        ingredientTagclose.classList.add('fa-chevron-down')
        ingredientTagclose.classList.remove('fa-chevron-up')
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

    //parametre liste mise a jour
    listItems(){
        const tagItems = document.querySelector('.tag__items')
        // tab pour futur liste des currents tags
        let arrayTag = []
        // mettre dedans chaque texte de tagItems.childNodes
        Array.from(tagItems.childNodes).forEach(node => {
            arrayTag.push(node.innerText)
        })
        
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
                        
                        // si ingredientTab ne contient pas ingredient
                        if(!ingredientTab.includes(removeAccents(Object.values(recipe)[i][j].ingredient.toLowerCase()))){
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
       
        // if(arrayTag[0]){
        // ingredientTab.sort().forEach(ingredient => {
            
        //     listHTML += `
        //         <li class="ingredientTag__listItem col-4"> ${ingredient[0].toUpperCase() + ingredient.slice(1)} </li>  
        //     `;
        // })
        // }else{
        // ingredientTab.sort().forEach(ingredient => {
            
        //     listHTML += `
        //         <li class="ingredientTag__listItem col-4"> ${ingredient[0].toUpperCase() + ingredient.slice(1)} </li>  
        //     `;
        // })
        // }
    
        return listHTML;
    }

    searchIngredient(recipes){
        const ingredientTagInput = document.querySelector('.ingredientTag__input')
        const cards = document.querySelector('.cards')
        const notFoundWrapper = document.querySelector('.notFound')
        ingredientTagInput.addEventListener('keyup', (e) => {
            let inputValue = e.target.value
            let selectedList = []
            console.log('inputValue: ', inputValue.length)
            if(inputValue.length > 2){
                for(const recipe of recipes){   
                    if(recipe.ingredients){
                        const ingredientLength = recipe.ingredients.length
                        for(let i=0; i<ingredientLength; i++){
                            
                            if(removeAccents(recipe.ingredients[i].ingredient.toLowerCase().trim()).includes(removeAccents(inputValue.toLowerCase().trim())))
                            selectedList.push(recipe)
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

                if(filteredList.length === 0){
                    console.log('zero')
                    cards.innerHTML = ""
                    const notFound = new NotFound()
                    notFound.render()
                    notFoundWrapper.classList.remove('hidden')
                }else{
                    
                    // ici on instancie seulement appliance et unstensils
                    const appliance = new Appliance(filteredList)
                    appliance.render()
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

                const appliance = new Appliance(recipes)
                appliance.render()
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
        const ingredientTag = /*html*/ `
            <div class="ingredientTag__btn  bg-primary" > 
                <h2 class="ingredientTag__title text-center">Ingredients</h2>
                <input class="ingredientTag__input hidden" type="text" placeholder="rechercher un ingredient"> 
                <i class="fas fa-chevron-down ingredientTag__close"></i> 
            </div>
            <div class="ingredientTag__list hidden bg-primary p-3">        
                <ul class="ingredientTag__listItems row bg-primary">
                    ${this.listItems()}
                </ul> 
            </div> 
            `;

        this.ingredientWrapper.innerHTML = ingredientTag;
        this.searchIngredient(this.recipes);
        this.ingredientOnClick();
        this.listOnclick();
        return this.ingredientWrapper;
    }
}