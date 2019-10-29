const swipl = require('swipl');

module.exports ={

    assert : function(clause){
        swipl.call('assert('+clause+')');
    },
    retract : function(clause){
        swipl.call('retract('+clause+')');
    },
    readX: function(roule){
        const ret = swipl.call('clause('+roule+',_)');
        if (ret) {
            return  "${ret.X}";
        } else { 
            return false;      
        }
    }
    
}