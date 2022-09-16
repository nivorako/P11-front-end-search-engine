export default class Ingredient{
    constructor(){
        this.ingredientWrapper = document.querySelector('.tag__ingredients');
        
    }

    ingredientOnClick(){
        const ingredientTagList = document.querySelector(".ingredientTag__list")
        const ingredientTagBtn = document.querySelector(".ingredientTag__btn")

        this.ingredientWrapper.addEventListener('click', () => {
            if(this.ingredientWrapper.classList.contains('col-2')){
                this.ingredientWrapper.classList.remove("col-2")
                this.ingredientWrapper.classList.add('col-6')
            }else if(this.ingredientWrapper.classList.contains('col-6')){
                this.ingredientWrapper.classList.remove("col-6")
                this.ingredientWrapper.classList.add('col-2')
            }
                     
            ingredientTagList.classList.toggle("hidden")
            ingredientTagBtn.classList.toggle("hidden")
            
        })
    }
    render(){
        const ingredientTag = /*html*/ `
            <div class="ingredientTag__btn  bg-primary" > 
                <h2 class="ingredientTag__title text-center">Ingredients</h2>
                <i class="fas fa-chevron-up "></i>   
            </div>
            <div class="ingredientTag__list hidden bg-primary">
                <div class="ingredientTag__listHead d-flex justify-content-between p-3">
                    <input class="ingredientTag__input" type="text" placeholder="rechercher un ingredient">
                    <i class="fas fa-chevron-down ingredientTag__close"></i> 
                </div>
                <ul class="ingredientTag__listItems  bg-success">
                            
                </ul> 
            </div> 
        `;

        this.ingredientWrapper.innerHTML = ingredientTag;
        this.ingredientOnClick();
        return this.ingredientWrapper;
    }
}