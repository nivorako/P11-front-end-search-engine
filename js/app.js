import Api from './api/api.js';
import SelectedRecipe from './factories/selectedRecipe.js';
import Ingredient from './templates/ingredient.js';
import Ustensils from './templates/ustensils.js';
import Appliance from './templates/appliance.js';
import Search from './templates/search.js';
import Card from './templates/card.js';
import Tag from './templates/tag.js';

class App {
    constructor() {
        //this.recipesApi = new Api("./data/recipes.json");

        this.wrapper = document.getElementById('main');
        this.cardWrapper = document.querySelector('.cards');
        //this.searchWrapper = document.querySelector('.search');
    }

    async main() {

        //const recipes = await this.recipesApi.get();

        const selected = new SelectedRecipe()
        const getSelect = await selected.getSelected()
        console.log('getSelected: ', getSelect)
        const search = new Search();
      
        search.render()
        search.onSearch(getSelect);

        const ingredient = new Ingredient(getSelect);
        ingredient.render();

        const ustensil = new Ustensils(getSelect);
        ustensil.render();

        const appliance = new Appliance(getSelect);
        appliance.render();

        getSelect.forEach(recipe => {
            const card = new Card(recipe)
            const template = card.render()
            
            this.cardWrapper.appendChild(template)
        })


    }
}

const app = new App();
app.main();