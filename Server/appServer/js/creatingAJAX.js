//------------------------------------------------------------
class Answer {
    constructor(ans, id,end_node=false) {
      this.ans = ans;
      this.id = id;
      this.isEndNode = function(){return end_node};
      this.is=function(id){return  (!this.isEndNode() && this.id==id);};

    }
}
class Arc {
    constructor(id,risp, comp,source,dest) {
      this.id = id;
      this.risp = risp;
      this.dest = dest;
      this.comp = comp;
      this.source = source;
      this.getAnsProlog=function(){
          if(dest.data.label==="END NODE"){
            var ans="MODULE_SESSION:answer("+this.source.id+","+this.source.data.info+","+this.risp+",-1)";
            if(this.comp!==undefined && this.comp.length>0){
                ans+=":-"+this.comp;
            }
            return ans;
          }else{
            var ans="MODULE_SESSION:answer("+this.source.id+","+this.source.data.info+","+this.risp+","+ this.dest.id+")";
            if(this.comp!==undefined && this.comp.length>0){
                ans+=":-"+this.comp;
            }
            return ans;
          }
             
      };

    }
}
//------------------------------------------------------------
var actualS = null;
var actualD= null;
var myNodes=new Array();
var myArcs=new Array();
var endnodeID=0;
//------------------------------------------------------------
function addArc() {
    if(actualS!==null && actualD!==null){
        var risposta = prompt("Inserire la possibile risposta, per segnalare una variabile inserire 'X'", "X");
        if (risposta !== null) {
            var compr = prompt("Inserire il comportamento in prolog, ricorda che se hai inserito 'X', questa è una variabile prolog.\n"+
            " Puoi lasciare vuoto il campo se non vuoi comportamento.\n"+
            "Ricorda di usare 'MODULE_SESSION:' davanti a ogni clausola.", "");
            if(compr !== null){
                var l ;
                if(compr!==undefined && compr.length>0){
                     l = (risposta+":-"+compr);
                }else{
                    l=risposta;
                }          
                const actualID= graph.newEdge(actualS, actualD,{label:l, risp:risposta,comp:compr }).id;
                myArcs.push(new Arc(actualID,risposta,compr,actualS,actualD));
            }
          
        }
    }else{
        alert("Non hai selezionato alcuna sorgente o destinazione per arco.");
    }
    
}
function reset(){
    removeAll();
    if(graph===null){
        initGraph();
    }
    const actualID= graph.newNode({label: "END NODE", info: "END NODE"}).id;  
    endnodeID=actualID;
    myNodes=new Array(); 
    myArcs=new Array();
    myNodes.push(new Answer("END NODE",actualID,true));
}
function addAns() {
    if(graph===null){
        initGraph();
        const actualID= graph.newNode({label: "END NODE", info: "END NODE"}).id;  
        endnodeID=actualID;
        myNodes.push(new Answer("END NODE",actualID,true));
    }
    var ans = document.getElementById("newAns").value;
    if(ans[0]!=="'"){
        ans="'"+ans+"'";
    }
    const actualID= graph.newNode({label: ans,info: ans}).id;   
    myNodes.push(new Answer(ans,actualID));
}



function dellNode(){
    if(graph===null){
        initGraph();
        const actualID= graph.newNode({label: "END NODE", info: "END NODE"}).id;  
        endnodeID=actualID;
        myNodes.push(new Answer("END NODE",actualID,true));
    }
    const elementSelected = document.getElementById("selectedNodeID");

    if(elementSelected!==null && elementSelected!==undefined  ){
        if(elementSelected.value!=endnodeID){
            if(elementSelected.value!="1"){
                const id =elementSelected.value;
                const endes =graph.edges;
                const nodes =graph.nodeSet;
                var countEdgesDel =0;
                var countNodesDel =0;
                for (i in endes)
                {
                    if(endes[i].target.id==id || endes[i].source.id==id ){
                        graph.removeEdge(endes[i]);
                        myArcs= myArcs.filter(function(el){return !el.is(endes[i].id);});
                        countEdgesDel++;
                    }
                }
                for (i in nodes)
                {
                    //console.log(nodes[i].id+"->"+id,nodes[i].id==id)
                    if(nodes[i].id==id){   
                         graph.removeNode(nodes[i]);
                         countNodesDel++;
                    }
                }
                myNodes=myNodes.filter(function(el){return !el.is(id);});
                alert("Eliminati "+countEdgesDel + " archi e "+countNodesDel+" nodi.");
            }else{
                alert("Non puoi eliminare il nodo HEAD");
            }
          
        }else{
            alert("Non puoi eliminare il nodo END NODE");
        }
       
    }else{
        alert("Nessun nodo selezionato.");
    }
}

function setSorgente(){
    if(graph===null){
        initGraph();
        const actualID= graph.newNode({label: "END NODE", info: "END NODE"}).id;  
        endnodeID=actualID;
        myNodes.push(new Answer("END NODE",actualID,true));
    }
    const elementSelected = document.getElementById("selectedNodeID");
    if(elementSelected!==null && elementSelected!==undefined){
        const nodes =graph.nodeSet;
        const id =elementSelected.value;
        var nodoselezionato=null;
        for (i in graph.nodeSet)
        {
            if(nodes[i].id==id){  
                nodoselezionato= nodes[i];
                break;
            }
        }
        if(nodoselezionato!==null){
            if(!myNodes.find(function(el){return el.is(id);}).isEndNode()){
                document.getElementById("nodoSorgente").innerHTML=nodoselezionato.data.info;
                actualS=nodoselezionato;
            }else{
                alert("END NODE non può essere un nodo sorgente!");
            }
        }else{
            alert("Il nodo selezionato non è valido!");
        }
    }else{
        alert("Nessun nodo selezionato.");
    }
}
function setDestinazione(){
    if(graph===null){
        initGraph();
        const actualID= graph.newNode({label: "END NODE", info: "END NODE"}).id;  
        endnodeID=actualID;
        myNodes.push(new Answer("END NODE",actualID,true));
    }
    const elementSelected = document.getElementById("selectedNodeID");
    if(elementSelected!==null && elementSelected!==undefined){
        const id =elementSelected.value;
        var nodoselezionato=null;
        const nodes =graph.nodeSet;
        for (i in graph.nodeSet)
        {
            if(nodes[i].id==id){  
                nodoselezionato= nodes[i];
                break;
            }
        }
        if(nodoselezionato!==null){
            document.getElementById("nodoDestinazione").innerHTML=nodoselezionato.data.info;
            actualD=nodoselezionato;
        }else{
            alert("Il nodo selezionato non è valido!");
        }
    }else{
        alert("Nessun nodo selezionato.");
    }
}

function save(){
    if(document.getElementById("name").value!==""){
        var xhttp = new XMLHttpRequest();
        var url = 'save';        
        var params = '';
        var index = 0;
        xhttp.open('POST', url, true);     
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      
        params+="name="+ document.getElementById("name").value;
        myArcs.forEach(arc => {
            try{
                params+="&id"+index +"="+ arc.getAnsProlog();   
                index++;  
            }catch(err){
                alert("Arco scartato: "+ err)
            }
                    
        });
        if(document.getElementById("resSurvey").value!==""){
            params+="&resSurvey=MODULE_SESSION:getResult(Ris):-"+document.getElementById("resSurvey").value;           
        }
        if(document.getElementById("preProlog").value!==""){
            document.getElementById("preProlog").value.split("\n").forEach(
                function(el){
                    params+="&preProlog"+index+"="+el; 
                    index++;
                }
            );          
        }
        
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                   document.getElementById("saveResp").innerHTML = this.responseText;
            }
        };
        xhttp.send(params);
    }else{
        alert("Il nome non è valido");
    }
}