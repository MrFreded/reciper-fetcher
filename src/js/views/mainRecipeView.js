import * as dom from './elem';

// get display clicked recipe listener
export const curID = function(curId){
    return document.querySelector(dom.domStrings.strSearchPanel).addEventListener('click',curId);
} ;


// get increase btn listener
export const incListener = function(incr){
    return document.querySelector(dom.domStrings.strServingsHolder).addEventListener('click',incr);
} ;
// get reduce btn listener
export const decListener = function(decr){
    return document.querySelector(dom.domStrings.strServingsHolder).addEventListener('click',decr);
}; 

// clear the main recipe details panel
export const removeRecipeContent = function(){
    document.querySelector(dom.domStrings.strTitleHolder).innerHTML= '';
    document.querySelector(dom.domStrings.strServingsHolder).innerHTML='';
    document.querySelector(dom.domStrings.strIngredientHolder).innerHTML='';
    document.querySelector(dom.domStrings.strSLHolder).innerHTML='';
    document.querySelector(dom.domStrings.strHowtoCookHolder).innerHTML='';
    document.querySelector(dom.domStrings.strHowtoCookHolder).style.display = 'none';
};

// remove spain at main recipe panel
export const removeSpinner = function(){
    document.querySelector(dom.domStrings.strTitleHolder).innerHTML = '';
};
// add main recipe spinner
export const addSpinner = function(){
    let html= `<div class= "spinner-grow"></div>`;
    document.querySelector(dom.domStrings.strTitleHolder).insertAdjacentHTML('afterbegin',html);
};

// add the title and picture
const addTitle = function(current){
    let html = 
    `<div class="row justify-content-center">
    <div class="pics col-md-12 col-12">
        <img src="${current.recipe.image_url}" alt = "${current.recipe.title}" class="receip-image">
    </div>
    <div class ="pics-title col-md-10 col-10 text-center">${current.recipe.title}</div>
</div>`;
 return document.querySelector(dom.domStrings.strTitleHolder).insertAdjacentHTML('afterbegin',html);
};

// add the main recipe servings panel
const addServingsEtal = function(current){
    let html = 
    `  <div class="row justify-content-center align-items-center before-ing">
    <div class="col-md-4 col-4 time">
        <div class="row justify-content-start">
                <ion-icon class="watch-icon" name="stopwatch"></ion-icon>30 minutes
        </div>
    </div>
    <div class="col-md-4 col-4 servings">
        <div class="row justify-content-center">
                <ion-icon class="man-icon" name="man"></ion-icon><span class="servings-num">1</span>servings
                <button class="add-minus add" id="add"><ion-icon  class="add-icon" name="add"></ion-icon></button>
                <button class="add-minus minus" id="minus" ><ion-icon  class="minus-icon" name="remove"></ion-icon></button>
        </div>
    </div>
      <button class="like-btn text-center"  id="${current.recipe.recipe_id}"><ion-icon class="like-btn-icon" name="heart-empty"></ion-icon></button>
      </div>
    `;
return document.querySelector(dom.domStrings.strServingsHolder).insertAdjacentHTML('afterbegin',html);
};

// display main recipe ingredients
const addIngridents = function(x){
    x.forEach(element => {     
    let html = 
    `<li class="col-md-6 col-5">
    <div class="row">
            <ion-icon class="list-icon col-md-1 justify-content-start" name="checkmark-circle-outline"></ion-icon>
            <div class="col-md-10 col-12 etc justify-content-start text-left">
                    <span class="unit">${element.unit}</span>   <span class="others"> ${element.others}</span>                   
            </div>
    </div>  
</li>`;
return document.querySelector(dom.domStrings.strIngredientHolder).insertAdjacentHTML('beforeend',html);
});
};

// add the main recipe shopping list panel
const addtoShoppingList = function(current){
    let html =
    `<button class="add-sl-btn col-md-12 col-12" id="${current.recipe.recipe_id}"><ion-icon class="add-sl-icon" name="cart"></ion-icon> add to shopping list</button>`;
return document.querySelector(dom.domStrings.strSLHolder).insertAdjacentHTML('beforeend',html);
}

// add how to cook direction link
const addhowtoCook = function(current){
    let html =
    `<div class="row justify-content-center">
    <div class="col-md-6 col-6 cook-title text-center">
        how to cook it
    </div>
    <div class="col-md-12 col-12 cook-details text-center">
       This recipe was carefully designed and tested by Fredrick.<br>Please check out directions at their website.
    </div>
    <div class="col-md-5 col-5 dir text-center">
    <a href = "${current.recipe.source_url}" target="_blank"><button class="col-md-12 col-12 dir-btn">directions<ion-icon class="dir-icon" name="arrow-dropright"></ion-icon></button></a>
    </div>
</div>`;
document.querySelector(dom.domStrings.strHowtoCookHolder).insertAdjacentHTML('afterbegin',html);
document.querySelector(dom.domStrings.strHowtoCookHolder).style.display = 'block';
} ;

// display all in the UI
export const displayRecipe = function(current,newIngredient){
    addTitle(current);
    addServingsEtal(current);
    addtoShoppingList(current);
    addhowtoCook(current);
    addIngridents(newIngredient);
};

// increase recipe and servings function
export const inc = function(ser, ingre){ 
    document.querySelector(dom.domStrings.strServingsNum).innerHTML = '';
    document.querySelector(dom.domStrings.strServingsNum).innerHTML = ser;

    document.querySelector(dom.domStrings.strIngredientHolder).innerHTML = '';
    ingre.forEach(element => {
        if (parseFloat(element.unit)){
            element.unit += 1;
        }else{
            element.unit;
        }
        let html = 
             `<li class="col-md-6 col-5">
             <div class="row">
                     <ion-icon class="list-icon col-md-1 justify-content-start" name="checkmark-circle-outline"></ion-icon>
                     <div class="col-md-10 col-12 etc justify-content-start text-left">
                             <span class="unit">${element.unit}</span>   <span class="others"> ${element.others}</span>                   
                     </div>
             </div>  
         </li>`;
       return document.querySelector(dom.domStrings.strIngredientHolder).insertAdjacentHTML('beforeend',html);
    });
}

// decrease recipe and servings function
export const dec = function(ser, ingre){ 
    document.querySelector('.servings-num').innerHTML = '';
    document.querySelector('.servings-num').innerHTML = ser;

    document.querySelector(dom.domStrings.strIngredientHolder).innerHTML = ''; 
    ingre.forEach(element => {
        if (parseFloat(element.unit)){
            element.unit -= 1;
        }else{
            element.unit;
        }
        let html = 
             `<li class="col-md-6 col-5">
             <div class="row">
                     <ion-icon class="list-icon col-md-1 justify-content-start" name="checkmark-circle-outline"></ion-icon>
                     <div class="col-md-10 col-12 etc justify-content-start text-left">
                             <span class="unit">${element.unit}</span>   <span class="others"> ${element.others}</span>                   
                     </div>
             </div>  
         </li>`;
       return document.querySelector(dom.domStrings.strIngredientHolder).insertAdjacentHTML('beforeend',html);
    });
};
