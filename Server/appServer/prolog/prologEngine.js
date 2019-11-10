// REMEMBER------------>the word "MODULE_SESSION:" is reserved
const {load,clear,exeAndRead,exe} = require('./prolog');
const swipl = require('swipl');
const {existFile,save} = require('./pl/nameResolver');

// function decript(element){
//     if(element!==undefined){
//         if(element.name!==undefined && element.args!==undefined){
//             return  element.name + " "+decript(element.args);
//          }else{
//              console.log("undef-->",element)
//              return  element;
//          }
//     }else{
//         return "";
//     }
 
// }


function clearClause(element,sessionID){
    if(element!==undefined){
       return  element.replace('user'+sessionID+':','');
    }else{
        return "";
    }
}
class PorlogEngine{
    constructor(){
       swipl.call('assert(clear_module(Module):-(PredicateIndicator= Module:_,forall(current_predicate(PredicateIndicator), abolish(PredicateIndicator))))');
      
       this.Init=function (module_name,session){
            clear(session.GetMyId());
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
        this.DellSession= function(session){
            clear(session.GetMyId());
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
                
                // if(ret.X!==undefined && ret.X.args!==undefined && ret.X.args[1]!==undefined && ret.X.args[1].args!==undefined){
                //     node['act'] =ret.X.args[1].args;
                // }else{
                node['act']= clearClause(ret.X,session.GetMyId());
                //}
                //console.log(ret.X)
                list.allans.push(node);
            } 
            query.close();
            return(list); 
        }
    }

  

};

PorlogEngine.SaveFile = function(json){
    //   {name:'provaNome', 
    //     id0:'MODULE_SESSION:answer(1,domanda1,X,3)', 
    //     id0:'MODULE_SESSION:answer(1,domanda1,X,2):-assert(MODULE_SESSION:prova(X))', 
    //     id0:MODULE_SESSION:answer(2,domanda2,si,3), 
    //     id0:MODULE_SESSION:answer(3,domanda3,X,4), 
    //     id0:MODULE_SESSION:answer(2,domanda2,no,4), 
    //     id0:MODULE_SESSION:answer(3,domanda3,ok,0)}'
    //  }
    var status = "errore generico"
    var name = "";
    var content = "";
    var preprolog ="";
    var ris ="";
    Object.keys(json).forEach(function(k){
        if(k==='name'){
            name=json[k];
        }else if(k[0]==='i' && k[1]==='d'){
            content+=json[k]+"\n";
        }else if(k[0]==='p' && k[1]==='r'){
            preprolog+=json[k]+"\n";
        }else if(k[0]==='r' && k[1]==='e'){
            ris+=json[k];
        }else{
            console.log("Unknow KEY: "+ k+ ", value: ",json[k]);
        }
    });
    // console.log("Nome: "+name );
    // console.log("Content: "+content );
    // console.log("Preprolog: "+preprolog );
    // console.log("Ris: "+ris );
    if(existFile('./appServer/prolog/pl/'+name+".pl")){
        return "Nome già esistente."
    }else{
        if(save('./appServer/prolog/pl/'+name+".pl",preprolog+content+ris)){
            return "Modulo salvato."
        }else{
            return "Impossibile salvare il nuovo modulo."
        }
    }
};

PorlogEngine.Istance = new PorlogEngine();
module.exports = PorlogEngine;