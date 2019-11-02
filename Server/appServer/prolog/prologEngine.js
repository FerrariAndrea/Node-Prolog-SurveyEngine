const {assert,retract,readX,load,clear,exe} = require('./prolog');
const swipl = require('swipl');
class PorlogEngine{
    constructor(){
        
       this.Init=function (module_name){
            clear();
            if(module_name!==undefined){
                if(Array.isArray(module_name)){
                    module_name.forEach(element => {
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
       this.StartSurvey=function(){
               if(swipl.call("resetAnswer")){
                   var ris = readX('getActualAnswer(X)');
                   if(ris.length>0 && ris[0].X !== undefined){
                      return ris[0].X;
                   }else{                       
                    return false;
                   }
               }else{
                    return false;
               }
       };
       this.SetResp=function(resp){
           const ris =exe("setResponse('"+resp+"').");
           console.log("--------------->",ris);
            if(ris){
                var x =readX('nextAnswer(X)');
                if(x.length>0 && x[0]>0){                    
                    return readX('getActualAnswer(X)');
                }else{//X ==-1 --> hai finito il questionario
                    return false;
                }
            }else{
                return null;
            }
        };
        this.GetResult=function(){
           var ris =readX('getResult(X)');
           if(Array.isArray(ris)){
             var filtered = ris.filter(function(value, index, arr){
                return value !== 'no result as default';            
             });
             return filtered;
           }else if(ris.length>0){
               return ris[0];
           }else{
               return ris;
           }
        };
    }

  

};


PorlogEngine.Istance = new PorlogEngine();
module.exports = PorlogEngine;