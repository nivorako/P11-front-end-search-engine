import Api from "../api/api.js"

export default class SelectedRecipe{
    constructor(selected){
        this.selected = selected
        this.recipesApi = new Api("./data/recipes.json")
    }

    async getSelected(){
        console.log('this.selected: ', this.selected)
        const recipes = await this.recipesApi.get()
        if(!this.selected){
            return recipes
        }else return this.selected
    }
}