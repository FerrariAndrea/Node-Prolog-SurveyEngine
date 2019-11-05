

function drawGraphFromServer(){
    var id=document.getElementById("UserId").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            drawGraph(JSON.parse(this.responseText));
         }
    };
    xhttp.open("GET", "/getIA?MyId="+id, true);
    xhttp.send();
}


function drawGraph(list_nodes){
    if(list_nodes===undefined || list_nodes.error!==undefined && list_nodes.error){
        document.getElementById("graph").innerHTML="Errore generico, nella recezione dei dati per il grafico.";
    }else{
         console.log(list_nodes);
        document.getElementById("my_canvas").height = window.innerHeight; 
        document.getElementById("my_canvas").width =  window.innerWidth; 
        document.getElementById("graph").style.display = "block"; 
       var graph = new Springy.Graph();
       var map={};
       list_nodes.allans.forEach(element => {
           //{id : ret.A,ans: ret.B,resp : ret.C,dest :ret.D,act: ret.X}
           if(element.id!==undefined &&  map["n"+element.id]===undefined){
               map["n"+element.id]=graph.newNode({label: element.ans, info: "azione: "+ JSON.stringify(element.act)});
           }
       });
       map["END NODE"]=graph.newNode({label: "END NODE", info: "END NODE"});
       var indexE =0;
       list_nodes.allans.forEach(element => {
             indexE++;
           
           if(element.dest>0 && map["n"+element.id]!==undefined && map["n"+element.dest]!==undefined){
               if(element.resp!==null){
                   graph.newEdge(map["n"+element.id], map["n"+element.dest],{label: element.resp });
               }else{                   
                   graph.newEdge(map["n"+element.id], map["n"+element.dest]);
               }
              
           }else if(element.dest===-1){
            graph.newEdge(map["n"+element.id], map["END NODE"]);
           }else{
            console.log("Ignored->",element)
           }
        });
        console.log("Count.:", indexE)
       console.log(graph)
       $('#my_canvas').springy({ graph: graph });

       jQuery('#my_canvas').springy({ graph: graph, nodeSelected: function(node) {
           document.getElementById("nodeSelectedInfo").innerHTML = node.data.info;
        } });
    //    var layout = new Springy.Layout.ForceDirected(
    //     graph,
    //     400.0, // Spring stiffness
    //     400.0, // Node repulsion
    //     0.5 // Damping
    //   );
     //  renderer.start();
    }      
}
