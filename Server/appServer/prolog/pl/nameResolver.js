
var fs = require('fs');

module.exports={

    resolveModuleName: function (name){
        // if(name==='LukyNumber'){
        //     return ["AnswerEngine.pl","LukyNumber.pl"];
        // }else if(name==='Perizie'){
        //     return ["AnswerEngine","..."];
        // }
       return ["AnswerEngine.pl",name+".pl"] ;
    },
    
    getAllModulesName:  function(directoryPath,res){
        
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            var ris = "";
            if (err) {
                 console.log('Unable to scan directory: ' + err);
            }else{
                files.forEach(function(el){
                    if(el!=="AnswerEngine.pl"){
                        const ell = el.substring(0, el.length-3);
                        ris+='<option value="'+ell+'">'+ell+'</option>';
                    }                   	   
                });
            }         
            res.send(ris);  
        });
    },
    existFile: function(file){
        try {
            return (fs.existsSync(file));
          } catch(err) {
            console.error(err)
            return true;
        }
        
    },
    save : function(name,data){
        try{
            fs.appendFile(name, data);
            return true;
        }catch(err){
            console.log("Save error: "+err);
            return false;
        }
        
    }

};