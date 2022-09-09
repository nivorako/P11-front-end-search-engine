export default class Search{
    constructor () {
        this.search = document.querySelector('.search')
    }

    render(){
        const search = `
            <input class="search__input" placeholder="rechercher une recette" type="text">
            <div class="search__btn">
                <i class="fa fa-search"></i>
            </div>
        `

        this.search.innerHTML = search;

        return this.search;
    }
}

// <img src="./assets/images/search.svg" class="search__img"/>