import Tag from "./tag.js"

export default class Ingredient{
    constructor(recipes){
        this.ingredientWrapper = document.querySelector('.tag__ingredients')
        this.recipes = recipes
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

    listOnclick(){
        const tagItems = document.querySelector('.tag__items')
        const applianceTagListItems = document.querySelectorAll('.ingredientTag__listItem')
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
        let ingredientTab = []
        this.recipes.forEach(recipe => {
            const length = Object.entries(recipe).length
            for(let i= 0; i < length; i++){
                if((Object.keys(recipe)[i] === "ingredients") ){
                    const ingredientLength = Object.values(recipe)[i].length
                    for(let j = 0; j < ingredientLength; j++){
                        if(!ingredientTab.includes(Object.values(recipe)[i][j].ingredient)){
                            ingredientTab.push(Object.values(recipe)[i][j].ingredient)
                       
                            listHTML += `
                                    <li class="ingredientTag__listItem col-4"> ${Object.values(recipe)[i][j].ingredient} </li>
                            `;
                        }
                    }
                }
            }
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