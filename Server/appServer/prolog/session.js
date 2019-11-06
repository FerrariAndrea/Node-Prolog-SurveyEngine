class Session{

    constructor(expireTime=60){//expireTime-->min
        var id =Session.NextId();
        this.GetMyId=function(){ return id};
        this.ExpireDate=new Date();
        this.isInactive= function(){
           return(new Date().getTime()-this.ExpireDate.getTime()>expireTime);
        };
        this.up =function(){
            this.ExpireDate =new Date();
        };
    
    }

  

};
Session.ID=0;
Session.allSession = new Array();
Session.NextId =function(){
    Session.ID+=1;
    return Session.ID;
};
Session.Get=function(id){
    var ris =null;
    Session.allSession.forEach(function(s){
        if(s.GetMyId().toString()===id.toString()){
            s.up();
            ris =s; 
           // console.log("------------->",ris);
        }
    });
   
    return ris;
};

Session.Clean= function(callback){
    Session.allSession =Session.allSession.filter(function(element){
        if(element.isInactive()){
            callback(element);
        }
        return !element.isInactive();
    });
};
Session.DellAll= function(callback){
    Session.allSession.forEach(function(element){
        callback(element);
    });
    Session.allSession=new Array();
};

Session.Create=function(){
    var actualSession =new Session();
    Session.allSession.push(actualSession);
    return actualSession;
};

module.exports = Session;