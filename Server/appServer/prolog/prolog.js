const swipl = require('swipl');
var fs = require('fs');
 
module.exports ={

    assert : function(clause){
        return swipl.call('assert('+clause+')');
    },
    retract : function(clause){
        return swipl.call('retract('+clause+')');
    },
    readX: function(roule,dontExe=false){
        // var ret ;
        // if(dontExe){
        //      ret = swipl.call('clause('+roule+',_)'); 
        // }else{
        //     ret = swipl.call(roule); 
        // }
        // //console.log("readX ris-->" , ret.X);       
        // if (ret===undefined || ret === null || ret===false) {            
        //     return false;   
        // } else { 
        //     return ret.X;   
        // }
        var query;
        if(dontExe){
            query =  new swipl.Query('clause('+roule+',_)'); 
        }else{
            query =  new swipl.Query(roule); 
        }
        var ret=false;
        var ris= Array();       
        while (ret = query.next()) {
            ris.push(ret);
        } 
        query.close();
        return(ris); 
    }, 
    exe: function(roule){
        var query=  new swipl.Query(roule); 
        var ret= false;
        var ris= Array();
        while (ret = query.next()) {
            ris.push(ret);
        }
        //console.log("exe-------->",ris);        
        query.close();
        return ris.length>0; 
    },
    clear: function(){
        return swipl.call('retractall(answer(_,_,_,_))');        
    },
    load: function(module_name,session){       
        //perchè eseguire tanti assert invece di un'unico:
        // swipl.call('working_directory(_, prolog)');
        // swipl.call('consult(mycode)'); 
        //siccome il consult vieta la retract sulle sue clausole
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
    }

    
}