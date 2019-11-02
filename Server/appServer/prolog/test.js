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
    }, 
    test3 : function(){
        swipl.call('assert(thisIsATest(45))');
        return(swipl.call('current_predicate(thisIsATest)'));        
    },
    test4 : function(){
        swipl.call('assert(thisIsATest(45))');
       // return(swipl.call('thisIsATest(5)'));   //DON'T WORK    
       const query = new swipl.Query('thisIsATest(5)');//<---------- THIS IS OK
        let ret = null;
        while (ret = query.next()) {
            console.log(`Variable X value is: ${ret.X}`);
        }         
        query.close();
        return(ret); 
    },
    test5 : function(){
        swipl.call('assert(user1:thisIsATest(45))');        
        var x= swipl.call('user1:thisIsATest(X)').X;
        swipl.call('retract(user1:_)'); 
        const query = new swipl.Query('user1:thisIsATest(X)');//<---------- THIS IS OK
        let ret = null;
        while (ret = query.next()) {
            console.log(`Variable X value is: ${ret.X}`);
        } 
        return"X=" +x + " after: "+ ret;
    }

}
