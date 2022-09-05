export default class Tools{
    constructor(){
        this.toolsWrapper = document.querySelector('.tag__tools');
    }

    render(){
        const tool = `
            <div 
                class="tag__row row d-flex align-items-center dropdown-toggle"
                data-bs-toggle="dropdown"
                type="button"
            >
                <h2 class="tag__title text-center col-9">appareil</h2>
                <input class="tag__input hidden bg-primary" type="text" placeholder="rechercher un appareil">
                <i class="fas fa-chevron-up col-3"></i>
            </div>
            <ul class="tag__dropdown-menu dropdown-menu">
                
            </ul> 
        `;

        this.toolsWrapper.innerHTML = tool;

        return this.toolsWrapper;
    }
}