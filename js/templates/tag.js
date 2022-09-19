export default class Tag{
    constructor(){
        this.tagWrapper = document.querySelector('.tag__items')
    }

    render(){
        const tag =/*html */ `
        <div class="tag__item col-2 text-center bg-primary">
            <p>pruneaux</p> 
        </div>
        `;

        this.tagWrapper.innerHTML = tag

        return this.tagWrapper
    }
}