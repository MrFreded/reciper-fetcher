import * as dom from './elem';
import {parseTitle} from './searchView'

// get Like Listener
export const getLikeListner = function(ge){
    document.querySelector(dom.domStrings.strServingsHolder).addEventListener('click',ge);
};

// Favorite Icon display style control
export const likeIconDisplay = function(box){
if(box.length == 0){
    document.querySelector(dom.domStrings.btnSavedLikes).style.display = 'none';
}else {
    document.querySelector(dom.domStrings.btnSavedLikes).style.display = 'block';
}
};

// display one of the likes on the main recipe panel
export const getLickClick = function(getLike){
    document.querySelector(dom.domStrings.strLikeHolder).addEventListener('click',getLike);
};

// parse likebtn
export const getLikeBtn = function(){
    return document.querySelector('.like-btn').classList;
}

// parse likes at the Like icon dropdown
export const parseLikes = function(Arrayy){
  document.querySelector(dom.domStrings.strLikeHolder).innerHTML = '';
  Arrayy.forEach(element => {
    let html = ` 
    <a class="col-md-12 col-12" href="#${element.recipe.recipe_id}" id="${element.recipe.recipe_id}">
      <div class="col-md-12 col-10 like-display">
        <div class="row">
             <div class="col-md-3 col-3 img-holder">
                 <img src =  "${element.recipe.image_url}" alt = "${parseTitle(element.recipe.title)}"class="img">
             </div>
             <div class="col-md col description text-left align-self-center">
               <div class="row">
                     <div class="col-12 recipe-name">${parseTitle(element.recipe.title)}</div>
                     <div class="col-12 recipe-author">${element.recipe.publisher}</div>
                     </div>
                </div>
            </div>
        </div>    
    </a>`;
    document.querySelector(dom.domStrings.strLikeHolder).insertAdjacentHTML('beforeend',html);
  });
};


    