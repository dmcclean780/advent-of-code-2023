const fs = require('node:fs');
const { nextTick } = require('node:process');
var input
try {
  const data = fs.readFileSync('/home/daniel/Documents/advent-of-code-2023/advent-of-code-2023/Day9/input.txt', 'utf8');
  input=data.split("\n");
} catch (err) {
  console.error(err);
}

function findSum(array){
    var nextNum=0;
    for(var i=1; i<array.length; i++){
        console.log(nextNum)
        nextNum=array[array.length-i-1]-nextNum
    }
    console.log(nextNum);
    return nextNum
}
function countOcc(array, number){
    var counter=0;
    for(var i=0; i<array.length; i++){
        if(array[i]==number){
            counter++;
        }
    }
    return counter;
}
function findNext(history){
    history=history.split(" ");
    console.log("history:",history)
    var lastNums=[Number(history[0])];
    while(countOcc(history, 0)!= history.length){
        var differences=[]
        for(var i=1; i<history.length; i++){
            var u1=history[i-1];
            var u2=history[i];
            var d = u2-u1;
            differences.push(d)
        }
        
        history=differences;
        console.log("history:",history)
        lastNums.push(history[0]);
        console.log("last nums:",lastNums)
    }
    //console.log(findSum(lastNums));
    return findSum(lastNums);
}

console.log(input)
var sum=0;
for(var i=0; i<input.length; i++){
    sum+=findNext(input[i]);
    console.log("current sum:",sum);
}
console.log("final sum", sum);