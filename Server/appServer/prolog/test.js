const swipl = require('swipl');

module.exports ={
    test1 : function(){
        const ret = swipl.call('member(X, [1,2,3,4])');
        if (ret) {
            console.log(`Variable X value is: ${ret.X}`);
            return true;
        } else {
            console.log('Call failed.');  
            return false;      
        }

    },
    test2 : function(){
        swipl.call('assert(provaProlog(A,B):=A == B,A != 0.)');
        return(swipl.call('provaProlog(2,B)').B==2);        
    }

}
