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

    }
}
//------------------------------------------------------------
var actualS = null;
var actualD= null;
var myStructure=new Array();
var myArcs=new Array();
//------------------------------------------------------------
function addArc() {
    if(actualS!==null && actualD!==null){
        var risposta = prompt("Inserire la possibile risposta, per segnalare una variabile inserire 'X'", "X");
        if (risposta !== null) {
            var compr = prompt("Inserire il comportamento in prolog, ricorda che se hai inserito 'X', questa è una variabile prolog. Puoi lasciare vuoto il campo se non vuoi comportamento.", "");
            var l ;
            if(compr!==undefined && compr.length>0){
                 l = (risposta+":-"+compr);
            }else{
                l=risposta;
            }          
            const actualID= graph.newEdge(actualS, actualD,{label:l  }).id;
            myArcs.push(new Arc(actualID,risposta,compr,actualS,actualD));
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
    const actualID= graph.newNode({label: "END NODE", info: "selected: END NODE"});  
    myStructure=new Array(); 
    myArcs=new Array();
    myStructure.push(new Answer("END NODE",actualID,true));
}
function addAns() {
    if(graph===null){
        initGraph();
        const actualID= graph.newNode({label: "END NODE", info: "selected: END NODE"});  
        myStructure.push(new Answer("END NODE",actualID,true));
    }
    var ans = document.getElementById("newAns").value;
    const actualID= graph.newNode({label: ans,info: ans}).id;   
    myStructure.push(new Answer(ans,actualID));
}



function dellNode(){
    if(graph===null){
        initGraph();
        const actualID= graph.newNode({label: "END NODE", info: "selected: END NODE"});  
        myStructure.push(new Answer("END NODE",actualID,true));
    }
    const elementSelected = document.getElementById("selectedNodeID");
    if(elementSelected!==null && elementSelected!==undefined){
        const id =elementSelected.value;
        const endes =graph.edges;
        const nodes =graph.nodeSet;
        var countEdgesDel =0;
        var countNodesDel =0;
        for (i in endes)
        {
            if(endes[i].target.id==id || endes[i].source.id==id ){
                graph.removeEdge(endes[i]);//REMOVEEDGE
                myArcs= myArcs.fill(function(el){return !el.is(endes[i].id);});
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
        myStructure=myStructure.filter(function(el){return !el.is(id);});
        alert("Eliminati "+countEdgesDel + " archi e "+countNodesDel+" nodi.");
    }else{
        alert("Nessun nodo selezionato.");
    }
}

function setSorgente(){
    if(graph===null){
        initGraph();
        const actualID= graph.newNode({label: "END NODE", info: "selected: END NODE"});  
        myStructure.push(new Answer("END NODE",actualID,true));
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
            if(!myStructure.find(function(el){return el.is(id);}).isEndNode()){
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
        const actualID= graph.newNode({label: "END NODE", info: "selected: END NODE"});  
        myStructure.push(new Answer("END NODE",actualID,true));
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