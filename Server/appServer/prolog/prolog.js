const swipl = require('swipl');
var fs = require('fs');
 
module.exports ={

    assert : function(clause){
        return swipl.call('assert('+clause+')');
    },
    retract : function(clause){
        return swipl.call('retract('+clause+')');
    },
    readX: function(roule){
        const ret = swipl.call('clause('+roule+',_)');        
        if (ret) {
            return ret.X;
        } else { 
            return false;      
        }
    },
    clear: function(){
        return swipl.call('retractall(answer(_,_,_,_))');        
    },
    load: function(module_name){        
        var contents = fs.readFileSync('./appServer/prolog/pl/'+module_name, 'utf8');
        var line =0;
        contents.split('\n').forEach(function(element) {
            if(element!==undefined && element[0]!=='%'  && element.length>0){
               try{
                if(!swipl.call('assert('+element+')')){
                    console.log("Fail load module "+ module_name+"["+line+"]: assert("+element+").")
                  }
               }catch(Exception){
                    console.log("Fail load module "+ module_name+"["+line+"]: assert("+element+").")
               }
             
            }
            line++;
        });  
        console.log("FINISH")
    }
    
}