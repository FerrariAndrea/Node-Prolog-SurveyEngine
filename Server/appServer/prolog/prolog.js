// REMEMBER------------>the word "MODULE_SESSION:" is reserved
const swipl = require('swipl');
var fs = require('fs');
 
module.exports ={

    assert : function(clause,session){
        return swipl.call('assert('+'user'+session+':'+clause+')');
    },
    retract : function(clause,session){
        return swipl.call('retract('+'user'+session+':'+clause+')');
    },
    readX: function(roule,session){
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
        var query=  new swipl.Query('clause('+'user'+session+':'+roule+',_)');
        var ret=true;
        var ris= Array();
        while (ret!==false) {
            ret = query.next();
            ris.push(ret);
        } 
        //if(ris.length>1 || ris[0]!==false){
       //     console.log("[***] Query readX chiusa!!!!!!!")
            query.close();
       // }
        return(ris); 
    }, 
    exeAndRead: function(roule,session){
        console.log("[***] Query EXE_READ ---> ",roule)
        var query=  new swipl.Query('user'+session+':'+roule); 
        var ret= true;
        var ris= Array();     
        while (ret!==false) {
            ret = query.next();
            ris.push(ret);
        } 
        //console.log("*********----------->", ris);
       // if(ris.length>1 || ris[0]!==false){
        //    console.log("[***] Query exe chiusa!!!!!!!")
            query.close();
       // }
        return(ris); 
    },
    exe: function(roule,session){
        console.log("[***] Query EXE ---> ",roule)
        var ris=  swipl.call('user'+session+':'+roule); 
        return(ris); 
    },
    clear: function(session){
        return swipl.call('clear_module(user'+session+')');        
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
                const clause='assert('+element.replace(/MODULE_SESSION:/g,"user"+session+":")+')';
               try{
                if(!swipl.call(clause)){
                    console.log("Fail load module "+ module_name+"["+line+"]: "+ clause)
                  }
               }catch(err){
                    console.log("Fail load module "+ module_name+"["+line+"]: "+clause+". \n\t\t Error:"+err)
               }
             
            }
            line++;
        });
    },
    loadInCache: function(module_name){       
        var contents = fs.readFileSync('./appServer/prolog/cache/'+module_name, 'utf8');
        var line =0;
        contents.split('\n').forEach(function(element) {
            if(element!==undefined && element[0]!=='%'  && element.length>0){
                const clause='assert('+element+')';
               try{
                if(!swipl.call(clause)){
                    console.log("Fail load module "+ module_name+"["+line+"]: "+ clause)
                  }
               }catch(err){
                    console.log("Fail load module "+ module_name+"["+line+"]: "+clause+". \n\t\t Error:"+err)
               }
             
            }
            line++;
        });
    }

    
}