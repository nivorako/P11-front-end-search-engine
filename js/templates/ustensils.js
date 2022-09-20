import Tag from "./tag.js";
export default class Ustensils {
    constructor(recipes){
        this.ustensilsWrapper = document.querySelector('.tag__ustensils')
        this.recipes = recipes
        console.log('recipes: ', this.recipes)
    }

    ustensilOnClick(){
        const ustensilTagclose = document.querySelector('.ustensilTag__close')
      
        
        ustensilTagclose.addEventListener('click', (e) => {
            if(ustensilTagclose.classList.contains('fa-chevron-down')){
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

        ustensilTagclose.classList.remove('fa-chevron-up')
        ustensilTagclose.classList.add('fa-chevron-down')
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

        ustensilTagclose.classList.add('fa-chevron-up')
        ustensilTagclose.classList.remove('fa-chevron-down')
    }

    listOnclick(){
        const tagItems = document.querySelector('.tag__items')
        const applianceTagListItems = document.querySelectorAll('.ustensilTag__listItem')
        applianceTagListItems.forEach(list => {    
            list.addEventListener('click', () => {
                
                const tag = new Tag(list.textContent)
                const tagTemplate = tag.render()
                tagItems.appendChild(tagTemplate)
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
            <h2 class="ustensilTag__title text-center">Ustensils</h2>
            <input class="ustensilTag__input hidden" type="text" placeholder="rechercher un ustensil"> 
            <i class="fas fa-chevron-up ustensilTag__close"></i> 
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