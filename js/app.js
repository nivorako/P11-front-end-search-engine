import Api from './api/api.js';
import Ingredient from './templates/ingredient.js';
import Ustensils from './templates/ustensils.js';
import Tools from './templates/tools.js';
import Search from './templates/search.js';
import Card from './templates/card.js';

class App {
    constructor() {
        this.wrapper = document.getElementById('main');
        this.cardWrapper = document.querySelector('.cards');
        this.recipesApi = new Api("./data/recipes.json");
    }

    async main() {

        const recipes = await this.recipesApi.get();
        console.log('RECIPES: ', recipes)
        const search = new Search();
        search.render();
        search.onSearch(recipes);

        const ingredient = new Ingredient();
        ingredient.render();

        const ustensil = new Ustensils();
        ustensil.render();

        const tool = new Tools();
        tool.render();

        recipes.forEach(recipe => {
            const card = new Card(recipe)
            const template = card.render()
            
            this.cardWrapper.appendChild(template)
        })


    }
}

const app = new App();
app.main();