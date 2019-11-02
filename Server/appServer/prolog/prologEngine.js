const {assert,retract,readX,load,clear,exeAndRead,exe} = require('./prolog');
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
               if(exe("resetAnswer")){
                   var ris = exeAndRead('getActualAnswer(X)');
                   console.log("-------->",ris)
                   if(ris.length>0 && ris[0].X !== undefined){
                      this.localAnswer=ris[0].X;
                      return ris[0].X;
                   }else{                       
                     return false;
                   }
               }else{
                    return false;
               }
       };
       this.SetResp=function(resp){
           
           const ris =exe("setResponse("+resp+")");
            if(ris){
                var x =exeAndRead('nextAnswer(X)');
                if(x.length>0 && x[0].X>0){        
                    var ans = exeAndRead('getActualAnswer(X)');
                    if(ans.length>0 && ans[0].X !== undefined){
                       this.localAnswer=ans[0].X;
                       return this.localAnswer;
                    }else{     
                        console.log("Error to handle?");                  
                         return false; //errore ?!?!
                    }                    
                }else{//X ==-1 --> hai finito il questionario
                    return false;
                }
            }else{
                return null;
            }
        };
        this.GetResult=function(){
           var ris =exeAndRead('getResult(X)');
           //console.log("----result----------->", ris);
           if(ris.length<3){
                var filtered = ris.filter(function(value, index, arr){
                    return (value!== false && value!==undefined);            
                });
                return filtered;
           }else{
                var filtered = ris.filter(function(value, index, arr){
                    return (value!== false && value!==undefined && value.X !== 'no result as default');            
                });
                return filtered;
           }
          
        };
        this.GetLocalAnswer = function(){
            return this.localAnswer;
        }
    }

  

};


PorlogEngine.Istance = new PorlogEngine();
module.exports = PorlogEngine;