import Card from "./card.js"

export default class Search{
    constructor () {
        this.search = document.querySelector('.search')
    }

    onSearch(recipes){
        const searchInput = document.querySelector('.search__input')
        const cards = document.querySelector('.cards')
        searchInput.addEventListener('keyup', (e) => {
            let inputValue = e.target.value
            if(inputValue.length >= 4){
                cards.innerHTML = ""
                let list = []
                recipes.forEach(recipe => {
                   
                })

            }
            if(inputValue.length < 4){
                recipes.forEach(recipe => {
                    const card = new Card(recipe)
                    const template = card.render()
                    
                    cards.appendChild(template)
                })
            }
        })
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
