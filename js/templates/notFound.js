export default class NotFound{
    constructor(){
        this.card = document.querySelector('.notFound')
    }

    render(){
        const notFound = /*html */ `
        
            <h1 class="notFound__title">Aucune recette ne correspond à votre recherche</h1>
       
        `;

        this.card.innerHTML = notFound
        return this.card
    }
}