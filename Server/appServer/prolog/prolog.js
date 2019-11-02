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
        console.log("[***] Query readX ---> ",roule)
        var query=  new swipl.Query('clause('+roule+',_)');
        var ret=true;
        var ris= Array();
        while (ret!==false) {
            ret = query.next();
            ris.push(ret);
        } 
        if(ris.length>1 || ris[0]!==false){
            console.log("[***] Query readX chiusa!!!!!!!")
            query.close();
        }
        return(ris); 
    }, 
    exeAndRead: function(roule){
        console.log("[***] Query EXE_READ ---> ",roule)
        var query=  new swipl.Query(roule); 
        var ret= true;
        var ris= Array();     
        while (ret!==false) {
            ret = query.next();
            ris.push(ret);
        } 
        //console.log("*********----------->", ris);
        if(ris.length>1 || ris[0]!==false){
            console.log("[***] Query exe chiusa!!!!!!!")
            query.close();
        }
        return(ris); 
    },
    exe: function(roule){
        console.log("[***] Query EXE ---> ",roule)
        var ris=  swipl.call(roule); 
        return(ris); 
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