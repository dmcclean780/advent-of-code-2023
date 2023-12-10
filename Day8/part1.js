class Node{
    constructor(name,left,right){
        this.name=name;
        this.left=left;
        this.right=right;
    }
}



const fs = require('node:fs');
var input
try {
  const data = fs.readFileSync('/home/daniel/Documents/advent-of-code-2023/advent-of-code-2023/Day8/input.txt', 'utf8');
  input=data.split("\n");
} catch (err) {
  console.error(err);
}

function getNodes(input){
    //console.log(input.length-2)
    var graph=[]
    for(i=2; i<input.length; i++){
        var nodeRaw=input[i].split(" = ");
        var name=nodeRaw[0];
        var dests=nodeRaw[1].split(", ");
        var left = dests[0].substring(1);
        var right = dests[1].slice(0,-1);
        var node = new Node(name, left, right)
        graph.push(node);
        //console.log(node)
    }
    return graph;
}
function findDest(dest, graph){
    for(var i=0; i<graph.length; i++){
        if(graph[i].name==dest){
            return i;
        }
    }
}
function followGraph(graph, instruct){
    locn=""
    dest="AAA"
    var instructLength = instruct.length
    var i=0;
    var steps=0;
    while(locn!="ZZZ"){
        var graphLocn=findDest(dest, graph);
        locn=dest;
        if(locn=="ZZZ"){
            return steps
        }
        var left=graph[graphLocn].left;
        var right=graph[graphLocn].right;
        if(instruct[i]=="R"){
            dest=right;
        }
        else{
            dest=left;
        }
        i++
        steps++
        if(i>=instructLength){
            i=0
        }
    }

}
var instruct=(input[0]);
var graph=getNodes(input);
console.log(followGraph(graph, instruct));