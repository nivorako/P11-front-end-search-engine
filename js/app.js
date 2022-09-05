class Api {
    constructor(url){
        this._url = url;
    }
    async get(){
        return fetch(this._url)
            .then(res => res.json())
            .then(res => res.recipes)
            .catch(err => console.log('an error occurs', err))
    }
}

class App{
    constructor(){
        this.wrapper = document.getElementById('main');
        this.recipesApi = new Api("/data/recipes.json")
    }

    async main(){

       const recipes = await this.recipesApi.get()
       console.log("recipes: ", recipes)
    }
}

const app = new App();
 app.main();