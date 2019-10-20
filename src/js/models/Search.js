import {key} from './key';

export class Search {
    //query
    constructor(query) {
        this.query = query;  
}
  async recipeSearch(){
    var proxy = "https://cors-anywhere.herokuapp.com/";
    try{
     // get recipe with query and turn to object
      const recipe = await fetch (`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
      const res = await recipe.json();
      this.result = res.recipes;

    }catch(error){
     alert(error);
     }
   }

};
