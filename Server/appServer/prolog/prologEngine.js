const {assert,retract,readX,load,clear} = require('./prolog');
class PorlogEngine{
    constructor(){
        
       this.Init=function (module_name){
            clear();
            if(module_name!==undefined){
                if(module_name.isArray()){
                    module_name.array.forEach(element => {
                        load(element);
                    });
                }else{
                    load(module_name);
                }
            }
       };
       this.test=function(){
           var x =readX("answer(1,X,'si',2)");
            return (x=='Hai un gatto?');
       };
    }

  

};


PorlogEngine.Istance = new PorlogEngine();
module.exports = PorlogEngine;