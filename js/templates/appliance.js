import Tag from "./tag.js";

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
        const applianceTagListItems = document.querySelectorAll('.applianceTag__listItem')
        applianceTagListItems.forEach(list => {    
            list.addEventListener('click', () => {
                
                const tag = new Tag(list.textContent)
                tag.render()
               
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
