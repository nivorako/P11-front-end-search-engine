import Tag from "./tag.js";
import Card from "./card.js";

export default class Appliance{
    constructor(recipes){
        this.applianceWrapper = document.querySelector('.tag__appliance');
        this.recipes = recipes
    }

    applianceOnClick(){
        const applianceTagclose = document.querySelector('.applianceTag__close')
      
        
        applianceTagclose.addEventListener('click', (e) => {
            if(applianceTagclose.classList.contains('fa-chevron-down')){
                this.closeTag()
                console.log('close')
            }else{
                this.openTag()
               console.log('open')
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

        applianceTagclose.classList.remove('fa-chevron-up')
        applianceTagclose.classList.add('fa-chevron-down')
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

        applianceTagclose.classList.add('fa-chevron-up')
        applianceTagclose.classList.remove('fa-chevron-down')
    }

 
    listOnclick(){
        const cardWrapper = document.querySelector('.cards');
        const tagItems = document.querySelector('.tag__items')
        // ensemble des listes dans applianceTag
        const applianceTagListItems = document.querySelectorAll('.applianceTag__listItem')
        applianceTagListItems.forEach(list => { 
            const selectedList = []
            // contenu texte de la liste
            const text = list.textContent
            // sur chaque liste   
            list.addEventListener('click', () => { 
                
                // instance Tag()          
                const tag = new Tag(text)
                //tag.tagItemClose()   
                // si nbre d'instance            
                if(tag.instanceId < 4){
                    // appliquer render() à tag
                    tag.tagItemClose() 
                    const tagTemplate = tag.render()

                    // le placer dans tagItems
                    tagItems.appendChild(tagTemplate)
                    
                    // console.log('selectedList: ', selectedList)
                    const tagItem = document.querySelector('.tag__item')
                    const tagClose = document.querySelector('.tag__itemClose')
                    // à chaque clic, faire ceci :
                    // tagClose.addEventListener('click', () => {
                    //     console.log('tagItem:' , tagItem)
                    //     tagItem.style.display = "none"
                    //     console.log('none')
                    // })         
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
            <i class="fas fa-chevron-up applianceTag__close"></i> 
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


// this.recipes.forEach(recipe => {
                        
//     if(recipe.appliance.toLowerCase() === text.toLowerCase().trim()){
//         console.log('text: ', text.toLowerCase())
//         selectedList.push(recipe)
       
//     } 
//     // if(recipe.ingredients){
//     //     const ingredientLength = recipe.ingredients.length
//     //     for(let i=0; i<ingredientLength; i++){
            
//     //         if(recipe.ingredients[i].ingredient.toLowerCase().includes(list.textContent.toLowerCase())){
//     //             selectedList.push(recipe)
//     //         }
//     //     }
//     // }
//     // if(recipe.ustensils){
//     //     const ustensilLength = recipe.ustensils.length
//     //     for(let j=0; j<ustensilLength; j++){
//     //         if(recipe.ustensils[j].toLowerCase().includes(list.textContent.toLowerCase())){
//     //             selectedList.push(recipe)
//     //         }
//     //     }
//     // }
// list.textContent = ""
// // this.recipes.forEach(recipe => {
// //     const newCard = new Card(recipe)
// //     const template = newCard.render()
// //     cardWrapper.appendChild(template)
// // })