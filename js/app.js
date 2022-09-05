import Api from './api/api.js';
import Ingredient from './templates/ingredient.js';
import Ustensils from './templates/ustensils.js';
import Tools from './templates/tools.js';
import Search from './templates/search.js';

class App{
    constructor(){
        this.wrapper = document.getElementById('main');
        this.recipesApi = new Api("/data/recipes.json")
    }

    async main(){

       const recipes = await this.recipesApi.get();

       const search = new Search();
       search.render();

       const ingredient = new Ingredient();
       ingredient.render();

       const ustensil = new Ustensils();
       ustensil.render();

       const tool = new Tools();
       tool.render();
    }
}

const app = new App();
 app.main();