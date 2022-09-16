

export default class Appliance{
    constructor(recipes){
        this.toolsWrapper = document.querySelector('.tag__appliance');
        this.recipes = recipes
    }

    applianceOnClick(){
            
        this.toolsWrapper.addEventListener('click', () => {
            if(this.toolsWrapper.classList.contains('col-2')){
                this.toolsWrapper.classList.remove("col-2")
                this.toolsWrapper.classList.add('col-6')
            }else if(this.toolsWrapper.classList.contains('col-6')){
                this.toolsWrapper.classList.remove("col-6")
                this.toolsWrapper.classList.add('col-2')
            }
            
            const tagList = document.querySelector(".tag__list")
            const tagBtn = document.querySelector(".tag__btn")
            tagList.classList.toggle("hidden")
            tagBtn.classList.toggle("hidden")
            
        })
    }

    listOnclick(){
        const tagListItems = document.querySelectorAll('.tag__listItem') 
        tagListItems.forEach(list => {
           list.addEventListener('click', () => {
                console.log('nom appareil: ', list.textContent)
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
                        <li class="tag__listItem"> ${Object.values(recipe)[i]} </li>
                   `;
                }
            }
        })
        return listHTML;
    }

    render(){
        const tool = `
            <div class="tag__btn  bg-success" > 
                <h2 class="tag__title text-center">appliance</h2>
                <i class="fas fa-chevron-up "></i>   
            </div>
            <div class="tag__list hidden bg-success">
                <div class="tag__listHead d-flex justify-content-between p-3">
                    <input class="tag__input" type="text" placeholder="rechercher un appareil">
                    <i class="fas fa-chevron-down "></i> 
                </div>
                <ul class="tag__listItems  bg-success">
                        ${this.listItems()}        
                </ul> 
           </div> 
            
        `;

        this.toolsWrapper.innerHTML = tool;
        this.listOnclick();
        this.applianceOnClick();
        return this.toolsWrapper;
    }
}
