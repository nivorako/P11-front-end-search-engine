export default class Search{
    constructor () {
        this.search = document.querySelector('.search')
    }

    render(){
        const search = `
            <input class="search__input" placeholder="rechercher une recette" type="text">
            <div class="search__btn">
                <img src="./assets/images/search.svg" class="search__img"/>
            </div>
        `

        this.search.innerHTML = search;

        return this.search;
    }
}