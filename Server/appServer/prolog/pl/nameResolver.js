
function resolveModuleName(name){
    if(name==='LukyNumber'){
        return ["AnswerEngine.pl","LukyNumber.pl"];
    }else if(name==='Perizie'){
        return ["AnswerEngine","..."];
    }
};
module.exports=resolveModuleName;