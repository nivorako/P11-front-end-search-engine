export default class Ustensils {
    constructor(){
        this.ustensilsWrapper = document.querySelector('.tag__ustensils');
    }

    render(){
        const ustensil = /*html*/ `
            <div 
                class="tag__row row d-flex align-items-center dropdown-toggle"
                data-bs-toggle="dropdown"
                type="button"
            >
                <h2 class="tag__title text-center col-9">ustensils</h2>
                <input class="tag__input hidden bg-primary" type="text" placeholder="rechercher un ustensil">
                <i class="fas fa-chevron-up col-3"></i>
            </div>
            <ul class="tag__dropdown-menu dropdown-menu">
                
            </ul> 
        `

        this.ustensilsWrapper.innerHTML = ustensil;

        return this.ustensilsWrapper;
    }
}