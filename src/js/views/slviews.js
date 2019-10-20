import * as dom from './elem';

// Listner to display shopping list
export const getShoppingListner = function(ge){
    document.querySelector(dom.domStrings.strSLHolder).addEventListener('click',ge);
};
// listner to delete a recipe from shopping list
export const getItemDel = function(del){
    document.querySelector(dom.domStrings.strShoppingListHolder).addEventListener('click',del);
};
// clear shopping list display panel
export const clearContent = function(){
    document.querySelector(dom.domStrings.strShoppingListHolder).innerHTML='';
};

// display ingredients at the shopping list
export const displayList = function(ingred){
   ingred.forEach(element => {
       let html = `
       <div class="col-md-12 col-12 shopping-list" id ="${element.ID}">
       <div class="row justify-content-start">
           <div class="col-md-3 col-1 count-box-holder">
               <div class="row count-box text-center">
                       <input class="col-md-12 col-12 count rounded text-center" step="${element.unit}" min="${element.unit}" type="number" placeholder="${element.unit}">
                </div>
           </div>
           <div class="col-md-7 col-8 others-sl justify-content-start text-left">
               <span>${element.others}</span>
           </div>
           <div class="col-md-1 col-1 del-btn-cont text-left">
               <button class="del-btn text-left"  id ="${element.ID}"><ion-icon name="close-circle-outline" class="del-btn-icon"></ion-icon></button>
           </div>
       </div>
   </div>
       `;
       document.querySelector(dom.domStrings.strShoppingListHolder).insertAdjacentHTML('beforeend',html);
   });
}


