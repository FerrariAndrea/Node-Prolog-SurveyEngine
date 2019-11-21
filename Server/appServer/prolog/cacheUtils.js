const {loadInCache} = require('./prolog');
const swipl = require('swipl');
var fs = require('fs');

function insert(survey,clause){
    fs.appendFile('./appServer/prolog/cache/'+survey, clause+"\n",function(err){
        if(err!==null){
            console.log("Add on cache-file error for "+clause+" in "+survey+": "+err);
        }
    });
}
class CacheUtils{
    constructor(){
        this.listLoaded=new Array();

        this.loadOne=function(survey){
            if(!this.listLoaded.includes(survey)){
                try{
                    loadInCache(survey);
                    this.listLoaded.push(survey);                    
                }catch(err){console.log("CacheUtils.loadOne survey["+survey+"] warning: "+err)}
             
            }
        };
        this.add=function(survey,id,resp){
            //la scrittura su file NON è ottimizzata, sarà poi prolog al caricamento della cache dal file
            //che rifarà tutto il lavoro tramite la "addCache"
            var clause= "addCache('"+survey+"',"+id+ ","+resp+",X)";
            var ok =swipl.call(clause);
            console.log("----actual count-->"+ok.X)
            if(ok.X>0){
                insert(survey,clause);
                return true;
            }else{
                return false;
            }
        };
    }
  

}


CacheUtils.Istance = new CacheUtils();
module.exports = CacheUtils;