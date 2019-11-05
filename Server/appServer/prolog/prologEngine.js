// REMEMBER------------>the word "MODULE_SESSION:" is reserved
const {readX,load,clear,exeAndRead,exe} = require('./prolog');
const swipl = require('swipl');
class PorlogEngine{
    constructor(){
       swipl.call('assert(clear_module(Module):-(PredicateIndicator= Module:_,forall(current_predicate(PredicateIndicator), abolish(PredicateIndicator))))');
      
       this.Init=function (module_name,session){
            clear();
            if(module_name!==undefined){
                if(Array.isArray(module_name)){
                    module_name.forEach(element => {
                        load(element,session.GetMyId());
                    });
                }else{
                    load(module_name,session.GetMyId());
                }
            }
       };  
       this.StartSurvey=function(session){
               if(exe("resetAnswer",session.GetMyId())){
                   var ris = exeAndRead('getActualAnswer(X)',session.GetMyId());
                   console.log("-------->",ris)
                   if(ris.length>0 && ris[0].X !== undefined){
                     session.localAnswer=ris[0].X;
                      return ris[0].X;
                   }else{                       
                     return false;
                   }
               }else{
                    return false;
               }
       };
       this.SetResp=function(resp,session){
           
           const ris =exe("setResponse("+resp+")",session.GetMyId());
            if(ris){
                var x =exeAndRead('nextAnswer(X)',session.GetMyId());
                if(x.length>0 && x[0].X>0){        
                    var ans = exeAndRead('getActualAnswer(X)',session.GetMyId());
                    if(ans.length>0 && ans[0].X !== undefined){
                        session.localAnswer=ans[0].X;
                       return session.localAnswer;
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
        this.GetResult=function(session){
           var ris =exeAndRead('getResult(X)',session.GetMyId());
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
        this.GetLocalAnswer = function(session){
            return session.localAnswer;
        }
        this.GetAllAnswer = function(session){
            var query=new swipl.Query('user'+session.GetMyId()+':getAllAnswer(A,B,C,D,X)'); 
            var ret= true;
            var list= {};  
            list.allans=[];
            while (ret!==false) {
                ret = query.next();
                var node ={};
                node['id'] = ret.A;
                node['ans'] = ret.B;
                node['resp'] = ret.C;
                node['dest'] = ret.D;
                if(ret.X!==undefined && ret.X.args!==undefined && ret.X.args[1]!==undefined && ret.X.args[1].args!==undefined){
                    node['act'] =ret.X.args[1].args;
                }else{
                    node['act'] =ret.X;
                }
                console.log(ret.X)
                list.allans.push(node);
            } 
            query.close();
            return(list); 
        }
    }

  

};


PorlogEngine.Istance = new PorlogEngine();
module.exports = PorlogEngine;