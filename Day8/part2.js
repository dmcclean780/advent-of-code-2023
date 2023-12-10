class Node{
    constructor(name,left,right){
        this.name=name;
        this.left=left;
        this.right=right;
    }
}

function gcd(num1, num2){
  
    //Loop till both numbers are not equal
    while(num1 != num2){
      
      //check if num1 > num2
      if(num1 > num2){
        //Subtract num2 from num1
        num1 = num1 - num2;
      }else{
        //Subtract num1 from num2
        num2 = num2 - num1;
      }
    }
    
    return num2;
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
    var graph=[]
    for(i=2; i<input.length; i++){
        var nodeRaw=input[i].split(" = ");
        var name=nodeRaw[0];
        var dests=nodeRaw[1].split(", ");
        var left = dests[0].substring(1);
        var right = dests[1].slice(0,-1);
        var node = new Node(name, left, right)
        graph.push(node);
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

function findStart(graph){
    startingLocn=[]
    for(var i=0; i<graph.length; i++){
        var name=graph[i].name;
        if(name[2]=="A"){
            startingLocn.push(i);
        }
    }
    return startingLocn
}

function checkLocations(locations){
    for(var i=0; i<locations.length; i++){
        if(locations[i][2]!="Z"){
            return false;
        }
    }
    return true;
}

function followGraph(graph, instruct){
    var instructLength = instruct.length
    var destinations=findStart(graph);
    var stepsList=new Array(destinations.length)
    for(var j=0; j<destinations.length; j++){
        var i=0;
        var steps=-1;
        while(true){
            var graphLocn=destinations[j];
            locn=graph[graphLocn].name;
            var left=graph[graphLocn].left;
            var right=graph[graphLocn].right;
            if(instruct[i]=="R"){
                dest=right;
                
                
            }
            else{
                dest=left;
            }
            dest=findDest(dest, graph);
            destinations[j]=dest
            
            i++
            steps++
            if(i>=instructLength){
                i=0
            }
            if(locn[2]=="Z"){
                stepsList[j]=steps;
                break
            }
            //console.log(locations, checkLocations(locations))   
        }
    }
    return stepsList

}

function gcd(num1, num2){
  
    //Loop till both numbers are not equal
    while(num1 != num2){
      
      //check if num1 > num2
      if(num1 > num2){
        //Subtract num2 from num1
        num1 = num1 - num2;
      }else{
        //Subtract num1 from num2
        num2 = num2 - num1;
      }
    }
    
    return num2;
}

function findLCM(stepsList){
    var i=1
    while(stepsList.length!=1){
        n1=stepsList[0];
        n2=stepsList[i];
        var GCD=gcd(n1,n2);
        var lcm=(n1*n2)/GCD;
        stepsList.splice(0,2);
        stepsList.splice(0,0,lcm);
    }
    console.log(lcm)
}
var instruct=(input[0]);
var graph=getNodes(input);
var stepsList=followGraph(graph, instruct);
console.log(stepsList)
findLCM(stepsList);