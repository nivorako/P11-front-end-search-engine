export default class Ingredient{
    constructor(){
        this.tagWrapper = document.querySelector('.tag__ingredients');
        
    }
    render(){
        const tag = `
            <div 
                class="tag__row row d-flex align-items-center dropdown-toggle"  
                data-bs-toggle="dropdown"
                type="button"
            >
                <h2 class="tag__title text-center col-9">ingrédients</h2>
                <input class="tag__input hidden bg-primary" type="text" placeholder="rechercher un ungrédient">
                <i class="fas fa-chevron-up col-3"></i>
            </div>
            <ul class="tag__dropdown-menu dropdown-menu">
            
            </ul>
        `;

        this.tagWrapper.innerHTML = tag;

        return this.tagWrapper;
    }
}