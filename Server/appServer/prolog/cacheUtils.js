const {loadInCache} = require('./prolog');
const swipl = require('swipl');
var fs = require('fs');

class CacheUtils{
    constructor(){
        this.listLoaded=new Array();

        this.loadOne=function(survey){
            if(!this.listLoaded.includes(survey)){
                try{
                    loadInCache(survey);
                    this.listLoaded.push(survey);
                }catch(err){console.log("CacheUtils.loadOne warning: "+err)}
             
            }
        };
        this.add=function(survey,id,resp){
            //push in cache the risp
            var clause= "cache('"+survey+"',"+id+ ","+resp+")";
            var ok =swipl.call('assert('+clause+')');
            if(ok){
                fs.appendFile('./appServer/prolog/cache/'+survey, clause+"\n",function(err){
                    console.log("Add on cache error: "+err);
                });
                return true;
            }else{
                return false;
            }
        };
    }
  

}


CacheUtils.Istance = new CacheUtils();
module.exports = CacheUtils;