import * as dom from './elem';

// get serach value
export const getSearch = function(){
  return  document.querySelector(dom.domStrings.strSearch).value;
};


   // clear field
export const getFieldClear = function(){
  return  document.querySelector(dom.domStrings.strSearch).value ='';
};
   
// search listener
export const getSearchclick = function(getSrch){
  document.querySelector(dom.domStrings.strSearchBtn).addEventListener('click',getSrch);
  window.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            getSrch();
        }
    });
};

// clear the search panel
export const removeSearchContent = function(){
    document.querySelector(dom.domStrings.strSearchPanel).innerHTML=''; 
};

// search panel spinner
 export const addSpinner = function(){
     let html= `<div class= "spinner-grow"></div>`;
     document.querySelector(dom.domStrings.strSearchPanel).insertAdjacentHTML('beforeend',html);
 };

//  remove search panel spinner
 export const removeSpinner = function(){
    document.querySelector(dom.domStrings.strSearchPanel).innerHTML = '';
};

// parse search cc title
const parseSearch = function(current){
let html = ` 
<a href="#${current.recipe_id}" id="${current.recipe_id}">
  <div class="col-md-12 col-12 search-display ">
     <div class="row justify-content-start">
         <div class="col-md-3 col-3 img-holder text-left">
             <img src = "${current.image_url}" alt = "${parseTitle(current.title)}" class="img" />
        </div>
         <div class="col-md col description text-left align-self-center">
            <div class="row">
             <div class=" col-md-12 col-12 recipe-name">${parseTitle(current.title)}</div>
             <div class="col-md-12 col-12 recipe-author">${current.publisher}</div>
            </div>
          </div>
      </div>
    </div>
</a>`;
document.querySelector(dom.domStrings.strSearchPanel).insertAdjacentHTML('beforeend',html);
};

// display the search and paginate
export const displaySearch = function(res){
    var page = 1;
    var noPerPage;
    if(screen.width < 700){
        noPerPage = 10;
    }else noPerPage = 12;
    var start = (page-1)* noPerPage;
    var final = (page*noPerPage) ;
    res.slice(start, final).forEach(parseSearch);
    if(screen.width < 800){
        document.querySelector(dom.domStrings.strPage).innerHTML = `${page}`;
    }else  document.querySelector(dom.domStrings.strPage).innerHTML = `page ${page}`;
    document.querySelector(dom.domStrings.strNextBtn).addEventListener('click',function(){
        if(final < res.length){
            page += 1;
             start = (page-1)* noPerPage;
             final = (page*noPerPage) ;
            //  clear the search panel and render
             removeSearchContent();
            res.slice(start, final).forEach(parseSearch);
            if(screen.width < 800){
                document.querySelector(dom.domStrings.strPage).innerHTML = `${page}`;
            }else  document.querySelector(dom.domStrings.strPage).innerHTML = `page ${page}`;
        }
    });
    document.querySelector(dom.domStrings.strPrevBtn).addEventListener('click', 
    function(){
        if(page > 1){
            page -= 1;
             start = (page-1)* noPerPage;
             final = (page*noPerPage) ;
              //  clear the search panel and render
             removeSearchContent();
            res.slice(start, final).forEach(parseSearch);
            if(screen.width < 800){
                document.querySelector(dom.domStrings.strPage).innerHTML = `${page}`;
            }else  document.querySelector(dom.domStrings.strPage).innerHTML = `page ${page}`;
        }
    });
    document.querySelector(dom.domStrings.strPagnation).style.display = 'block';
}

// parse recipe title to give good display
export const parseTitle = function(title){
    var newTitle = '';
    var newTitleBox = [];
    let titleSum = 0;
    let strSum = 0;
    let titleArray = title.split(' ')
    if (titleArray[0].length > 16){
        newTitle = `${titleArray[0]}...`;
    }else{
        titleArray.forEach(function(element){
            titleSum += element.length;
         });
       if(titleSum <= 16){
          newTitle = title; 
        }else{
          titleArray.forEach(function(element){
              strSum += element.length;
              if(strSum <= 16){
                 newTitleBox.push(element);
                 newTitle = `${newTitleBox.join(' ')} ...` ;  
                }
           });
        }
    }
    return newTitle;
 }

