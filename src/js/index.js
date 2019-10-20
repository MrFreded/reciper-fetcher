import * as search from './models/Search';
import * as searchview from './views/searchView';
import * as mainrecipe from './models/MainRecipe';
import * as mainrecipeview from './views/mainRecipeView';
import * as ingreList from './models/Sl';
import * as ingreListview from './views/slviews';
import * as likeview from './views/likeview';



var res ;
let hf
let hr
var LikesArray =[]
var IdArray = [];
var newIngredient;
let servings
let slIds = [];


/**
 * Search Recipe */

async function getRecipeSearch() {

    //  get input query from UI
    var inputQuery = searchview.getSearch()
    if(inputQuery !=='' && typeof(inputQuery) == 'string' && inputQuery !== ' '){

    // Clear inner HTML for Display
    mainrecipeview.removeRecipeContent();
    searchview.removeSearchContent();
   
    // Add Spinner
    searchview.addSpinner();

    // Create class that with query
    var newSearch = new search.Search(inputQuery);
    searchview.getFieldClear();

    // Array to hold search result
    var searchResult = [];

    try {
        // Call method inside class to fetch search results
        await newSearch.recipeSearch();

        // Convert from Json to Object 
        searchResult = newSearch.result;

        // Remove spinner and display result
        searchview.removeSpinner();
        searchview.displaySearch(searchResult);

    }
    catch (err) {
        console.log(err)
    }
    }
}
// Call the function when search is clicked
searchview.getSearchclick(getRecipeSearch);

/**
 * MAIN RECIPE ON DISPLAY
 */
async function getMainRecipe() {
    // get the href
   hf = (mainrecipe.eventGetter());
   servings = 1;
    // let hf = location.hash.substr(1, location.hash.length) (working but affects change storing of liked recipe)

    // clear UI for display and add spinner
    mainrecipeview.removeRecipeContent();
    ingreListview.clearContent();
    mainrecipeview.addSpinner();
   
    // new object for query
    var newRecipe = new mainrecipe.currentRecipe(hf);

    try {
        // fetch the query result
        await newRecipe.mainRecipe();
        res = newRecipe.result;

        // remove spinner
        mainrecipeview.removeSpinner();

        // get the parse ingredients and display the query result
        newIngredient = ingreList.organiseIngre(res.recipe.ingredients)
        mainrecipeview.displayRecipe(res, newIngredient);
        // check if query have been liked before
        if(IdArray.includes(hf)){
            likeview.getLikeBtn().add('like-btn-tog')
        }
    }
    catch (err) {
        console.log(err)
    }
}
mainrecipeview.curID(getMainRecipe)

/**
 * Add a recipe Ingredient to shopping list
 */
const addShoppingList = function () {
    if (event.target) {
        if(!slIds.includes(hf)){
            slIds.push(hf)
             // Clear space for display
            ingreListview.clearContent();
            //(optional, if i want the shopping list not to be constant)

           // Display ingredients
           ingreListview.displayList(newIngredient);
        } 
    }
}
ingreListview.getShoppingListner(addShoppingList);

/**
 * Add a liked recipe in the favorite 
 */

const addLikes = function (e) {
  var hrf = (e.target.parentNode.id ||e.target.id)

    // check if clicked 
  if (hrf === hf || hrf === hr){
    // if recipe have not been liked before, push to the array
    if(!IdArray.includes(hrf)){
       IdArray.push(hrf)
       LikesArray.push(res)
       // add the liked btn class
       likeview.getLikeBtn().add('like-btn-tog')

    // if liked before, remove it from the array   
    }else{
       var u = IdArray.indexOf(hrf)
       IdArray.splice(u,1)
       LikesArray.splice(u,1)
       //remove the liked btn class
       likeview.getLikeBtn().remove('like-btn-tog')
    }
    // Parse the recipe and display
    likeview.parseLikes(LikesArray)
    // check if the likearray is empty to display favorite Icon
    likeview.likeIconDisplay(LikesArray);
    }
}
likeview.getLikeListner(addLikes)

/**
 * saveliked at favourite Icon
 *  */

 const getLick = function () {
  hr = mainrecipe.eventGetter();
  
  if (hr) {
     LikesArray.forEach(element => {
        //  check the clicked one
       if (element.recipe.recipe_id == hr) {
        // Clear UI and display
          mainrecipeview.removeRecipeContent();
          newIngredient = ingreList.organiseIngre(element.recipe.ingredients)
          mainrecipeview.displayRecipe(element, newIngredient);
          // check if query have been liked before
          likeview.getLikeBtn().add('like-btn-tog')
        }
      })          
    }
}
likeview.getLickClick(getLick)


/**
 * Increase and Decrease Btn works
 */
const incgred = function(event){
   var x =  (event.target.parentNode.id)
    if(x === 'add' && servings < 10){
        servings += 1;
        mainrecipeview.inc(servings,newIngredient); 
    }
}
const decgred = function(event){
    var x =  (event.target.parentNode.id)
     if(x === 'minus' && servings > 1){
        servings -= 1;
        mainrecipeview.dec(servings,newIngredient);
     }
 }
 mainrecipeview.incListener(incgred)
 mainrecipeview.decListener(decgred)

 /**
  * Delete an Ingredient from shopping list
  */
 const delIngred = function(){
     let ingID = event.target.parentNode.parentNode.parentNode.parentNode.id;
     let btnID = event.target.parentNode.id;
     if(ingID && btnID){
         newIngredient.forEach((element,index)=>{
             if(element.ID == ingID){
                 newIngredient.splice(index, 1);
             }
         })
         document.querySelector(`#${ingID}`).parentNode.removeChild(document.querySelector(`#${ingID}`))
     }
 }
 ingreListview.getItemDel(delIngred);


