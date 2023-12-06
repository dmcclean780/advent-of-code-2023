const fs = require('node:fs');
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

function findCombos(time, record){
    var combos=0;
    for(var i=0; i<time; i++){
        var speed=i;
        var moveTime=time-i
        var dist=moveTime*speed
        if(dist>record){
            combos++
        }
    }
    return combos;
}

function getError(times, dist){
    var margin=1;
    for(var i=0; i<times.length; i++){
        var time=Number(times[i])
        var record=Number(dist[i])
        margin=margin*findCombos(time,record);
    }
    console.log(margin);
}
var times=getTimes(input);
var dist=getDistances(input);
getError(times, dist);

    