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
        var query = new swipl.Query('thisIsATest(5).');
        let ret = true;
        var ris ;
        while (ret!==false) {
            ret = query.next();
            console.log(`Variable X value is: ${ret}`);
            ris = ret;
        }  
        if(ris!==false){
            query.close();
        }  
        return(ris); 
    },
    test5 : function(){
        swipl.call('assert(user1:thisIsATest(45))');  
        swipl.call('assert(clear_module(Module):-(PredicateIndicator= Module:_,forall(current_predicate(PredicateIndicator), abolish(PredicateIndicator))))');      
        var x= swipl.call('user1:thisIsATest(X)').X;
        console.log("----->",x);
        swipl.call('clear_module(user1)'); 
        const query = new swipl.Query('user1:thisIsATest(X)');//<---------- THIS IS OK
        let ret = null;
        while (ret = query.next()) {
            console.log(`Variable X value is: ${ret.X}`);
        } 
        return"X=" +x + " after: "+ ret;
    }

}
