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
                
                 if((tagItemsLength < 3) && Array.from(tagItems.childNodes).every(checkTagItemsValue)){
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
                            const selectedRecipes = []
                            // créer trois tab
                           
                            tagItems.childNodes.forEach(node => {
                                // traiter selon ingredient
                                
                                if(node.classList.contains('bg-success')){
                                    totalRecipes.forEach(recipe => {
                                        // if(removeAccents(recipe.appliance.toLowerCase().trim()) === removeAccents(node.textContent.toLowerCase().trim())){
                                        if(removeAccents(recipe.appliance.toLowerCase().trim()).includes(removeAccents(node.textContent.toLowerCase().trim()))){
                                            selectedRecipes.push(recipe)
                                        }
                                    })
                                } 
                                if(node.classList.contains('bg-primary')){
                                    totalRecipes.forEach(recipe => {   
                                        recipe.ingredients.forEach(ingredient => {
                                            if(removeAccents(ingredient.ingredient.toLowerCase().trim()).includes(removeAccents(node.textContent.toLowerCase().trim()))){
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

                                // utiliser find
                                //const found = array1.find(element => element.includes(array2));
                                //const found2 = 
                            })
                            console.log('selectedRecipes après close: ', selectedRecipes)
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
                            listHTML += `
                                    <li class="ustensilTag__listItem col-4"> ${Object.values(recipe)[i][j]} </li>
                            `;
                        }
                    }
                }
            }
        })
        
        return listHTML;
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
        this.ustensilOnClick();
        this.listOnclick();
        return this.ustensilsWrapper;
    }
}