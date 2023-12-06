const fs = require('node:fs');
const { maxHeaderSize } = require('node:http');
var input
try {
  const data = fs.readFileSync('/home/daniel/Documents/advent-of-code-2023/advent-of-code-2023/Day6/input.txt', 'utf8');
  input=data.split("\n");
} catch (err) {
  console.error(err);
}
function getTimes(input){
    var times= input[0].substring(input[0].indexOf(":")+1);
    times=times.split(" ");
    var newTimes=[]
    for(var i=0; i<times.length; i++){
        if(times[i]!=""){
            newTimes.push(times[i]);
        }
    }
    return newTimes
}

function getDistances(input){
    var distances= input[1].substring(input[1].indexOf(":")+1);
    distances=distances.split(" ");
    var newDistances=[]
    for(var i=0; i<distances.length; i++){
        if(distances[i]!=""){
            newDistances.push(distances[i]);
        }
    }
    return newDistances
}

function solveQuadratic(a,b,c){
    var d = findRoots(a,b,c);
    if (d > 0) { 
        const root1 = (-b + Math.sqrt(d)) / (2 * a); 
        const root2 = (-b - Math.sqrt(d)) / (2 * a); 
        return [root1, root2]; 
    } else if (d === 0) { 
        const root = -b / (2 * a); 
        return [root]; 
    } else { 
        return []; 
    } 
} 

function findRoots(a,b,c){
    return b * b - 4 * a * c;
}

function getError(times, dist){
    var time=""
    var record=""
    for(var i=0; i<times.length; i++){
        time=time+times[i];
        record=record+dist[i];
    }
    var p = 0;
    var q=Number(time);
    var a=-1
    var b=-(p+q);
    var c=(p*q)-record
    var roots=solveQuadratic(a,b,c);
    var maxRoot=Math.ceil(roots[0]);
    var minRoot=Math.ceil(roots[1]);
    console.log(-1*(maxRoot-minRoot));
}
var times=getTimes(input);
var dist=getDistances(input);
getError(times, dist);