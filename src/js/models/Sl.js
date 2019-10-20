
class List {
   constructor(ID,unit,others){
    this.ID = ID;
    this.unit = unit;
    this.others = others;
   }
}


// unique ID function
const uniID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
}
// parse Ingredients
export const organiseIngre = function(In){
    let newIngredientArray = [];
    let lineIngredient;
    In.forEach(element => {
        element = element.replace(/ *\([^)]*\) */g, " ").trim();
        let elem = element.split(' ');
        let unit ;
        let others;
        let ID = uniID();
             if (parseInt(elem[0]) && parseInt(elem[1])){
                unit = parseFloat((eval(elem[0]) + eval(elem[1])).toFixed(2));
                elem.splice(0,2);
                others = elem.join(' ');
             }
             else if(elem[0].includes('-')){
                let ele = elem[0].split('-');
                unit = parseFloat(eval(ele[0]));
                elem.splice(0,1);
                others = elem.join(' ');
            }
            else if(elem[0].includes('"')){
                let ele = elem[0].split('"');
                unit = parseFloat(eval(ele[0]));
                elem.splice(0,1);
                others = `inches ${elem.join(' ')}`;
            }  
                       
             else if (parseInt(elem[0])){
                 unit = eval(elem[0]);
                 elem.splice(0,1);
                 others = elem.join(' ');
             }
             else{
                unit = 1;
                others = "" + elem.join(' ');
             } 
             lineIngredient = new List(ID,unit,others);
             newIngredientArray.push(lineIngredient);

     });                 
 return newIngredientArray;
};






