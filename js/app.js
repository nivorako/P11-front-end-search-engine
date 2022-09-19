import Api from './api/api.js';
import Ingredient from './templates/ingredient.js';
import Ustensils from './templates/ustensils.js';
import Appliance from './templates/appliance.js';
import Search from './templates/search.js';
import Card from './templates/card.js';
import Tag from './templates/tag.js';

class App {
    constructor() {
        this.recipesApi = new Api("./data/recipes.json");

        this.wrapper = document.getElementById('main');
        this.cardWrapper = document.querySelector('.cards');
        //this.searchWrapper = document.querySelector('.search');
    }

    async main() {

        const recipes = await this.recipesApi.get();
        console.log('RECIPES: ', recipes);

        const search = new Search();
       // this.searchWrapper.appendChild(search.render());
        search.render()
        search.onSearch(recipes);

        const tag = new Tag();
        tag.render();

        const ingredient = new Ingredient(recipes);
        ingredient.render();

        const ustensil = new Ustensils(recipes);
        ustensil.render();

        const appliance = new Appliance(recipes);
        appliance.render();

        recipes.forEach(recipe => {
            const card = new Card(recipe)
            const template = card.render()
            
            this.cardWrapper.appendChild(template)
        })


    }
}

const app = new App();
app.main();