import {key} from './key';

export class currentRecipe {
    constructor(ID) {
        this.ID = ID;   
}
  async mainRecipe(){
    var proxy = "https://cors-anywhere.herokuapp.com/";
    try{
        const recipe = await fetch (`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.ID}`);
        this.result = await recipe.json();

    }catch(error){
        alert(error);
    }
  }
};
// get href from click at the search panel
export const  eventGetter = function(){
    let hf = (event.target.parentNode.id ||event.target.parentNode.parentNode.id ||event.target.parentNode.parentNode.parentNode.id ||event.target.parentNode.parentNode.parentNode.parentNode.id || event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id ||event.target.id);
    return hf;
};



