

function drawGraphFromServer(){
    var id=document.getElementById("UserId").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            if(json.error===undefined || json.error===false ){                
                 drawGraph(json);
            }else{
                document.getElementById("graph").innerHTML="Errore generico, nella recezione dei dati per il grafico, potrebbe essere scaduta la sessione.";
                document.getElementById("graph").style.display = "block"; 
            }
         }
    };
    xhttp.open("GET", "/getIA?MyId="+id, true);
    xhttp.send();
}

var graph=null;
function removeAll(){
    if(graph!==null){
        const endes =graph.edges;
        const nodes =graph.nodeSet;
        for (i in endes)
        {
            graph.removeEdge(endes[i]);
        }
        for (i in nodes)
        {
            graph.removeNode(nodes[i]);
        }
    }
   
}
function initGraph(){    
    graph = new Springy.Graph();
    $('#my_canvas').springy({ graph: graph });

    jQuery('#my_canvas').springy({ graph: graph, nodeSelected: function(node) {
        var _html ="";
        if(node.data.info.list ===undefined){
            _html='<div style="text-align: left;"><p>selected:'+node.data.info+'</p></div>';
        }else{
             _html =  '<div style="text-align: left;"><ul>';
            node.data.info.list.forEach(element => {
                _html+="<li>";
                if(element.risposta!==null){
                    _html+="Input: "+element.risposta+"<ul><li>Azione: "+element.azione+ "</li></ul>";
                }else{
                    _html+="Input: X<ul><li>Azione: "+element.azione+ "</li></ul>";
                }
                _html+="</li>"
            });
            _html+= "</ul></dv>";
           
        }
        _html+= '<input type="hidden" id="selectedNodeID" value="'+node.id+'"></input>';
        document.getElementById("nodeSelectedInfo").innerHTML =_html;
    } });
    document.getElementById("my_canvas").height = window.innerHeight; 
    document.getElementById("my_canvas").width =  window.innerWidth; 
}

function drawGraph(list_nodes){
    removeAll();
    if(list_nodes===undefined || list_nodes.error!==undefined && list_nodes.error){
        document.getElementById("graph").innerHTML="Errore generico, nella recezione dei dati per il grafico.";
    }else{
        //console.log(list_nodes);
        document.getElementById("my_canvas").height = window.innerHeight; 
        document.getElementById("my_canvas").width =  window.innerWidth; 
        document.getElementById("graph").style.display = "block"; 
      
        if(graph==null){
            initGraph();
        }
       var map=new Array();
       list_nodes.allans.forEach(element => {
           //{id : ret.A,ans: ret.B,resp : ret.C,dest :ret.D,act: ret.X}
           if(element.id!==undefined ){
               if( map["n"+element.id]===undefined){
                   var info = {};
                   info.list=[];
                   info.list.push( {risposta: element.resp ,azione:  JSON.stringify(element.act)});
                  map["n"+element.id]={label: element.ans, info: info};
               }else{
                   map["n"+element.id].info.list.push({risposta: element.resp ,azione:  JSON.stringify(element.act)});
               }
              
           }
       });
       map["END NODE"]={label: "END NODE", info: "END NODE"};
         var nodeList= new Array();
       Object.keys(map).forEach(key => {
           console.log(map[key].label)
           nodeList[key]=graph.newNode(map[key]);
       });
       var indexE =0;
       list_nodes.allans.forEach(element => {
             indexE++;
           
           if(element.dest>0 && nodeList["n"+element.id]!==undefined && nodeList["n"+element.dest]!==undefined){
               if(element.resp!==null){
                   graph.newEdge(nodeList["n"+element.id], nodeList["n"+element.dest],{label: element.resp });
               }else{                   
                   graph.newEdge(nodeList["n"+element.id], nodeList["n"+element.dest]);
               }
              
           }else if(element.dest===-1){
                graph.newEdge(nodeList["n"+element.id], nodeList["END NODE"]);
           }else{
          //  console.log("Ignored->",element)
           }
        });
       // console.log("Count.:", indexE)
       //console.log(graph)
  
    
    //    var layout = new Springy.Layout.ForceDirected(
    //     graph,
    //     400.0, // Spring stiffness
    //     400.0, // Node repulsion
    //     0.5 // Damping
    //   );
     //  renderer.start();
    }      
}
