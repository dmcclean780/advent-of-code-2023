const fs = require('node:fs');
var input
try {
  const data = fs.readFileSync('/home/daniel/Documents/advent-of-code-2023/advent-of-code-2023/Day3/input.txt', 'utf8');
  input=data.split("\n");
} catch (err) {
  console.error(err);
}

function inputToString(inputData, width){
    var str="";
    for(var i=0; i<inputData.length; i++){
        for(var j=0; j<width; j++){
            //console.log(inputData[i][j])
            str=str.concat(inputData[i][j]);
        }
    }
    return str
}

function checkIfValid(inputData, width, height){
    sum=0;
    vaildNums=[];
    for(var i=0; i<inputData.length; i++){
        if(!isNaN(inputData[i])){
            var valid=findNeighbors(inputData, i, width, height)
            if(valid){
                var getNumber=getFullNumber(i, inputData);
                var number=getNumber[0];
                var lastIndex=getNumber[1];
                i=lastIndex;
                sum+=Number(number);
                vaildNums.push(number);
            }
            
        }
    }
    console.log(vaildNums);
    console.log(sum);
}

function getFullNumber(numberIndex, inputData){
    var completeL=false;
    var completeR=false;
    var num=inputData[numberIndex]
    i=-1;
    while(!completeL){
        if(!isNaN(inputData[numberIndex+i])){
            var temp=num;
            num=""
            num=num.concat(inputData[numberIndex+i]);
            num=num.concat(temp);
            i=i-1;
        }
        else{
            completeL=true;
        }
        
    }
    i=1;
    while(!completeR){
        if(!isNaN(inputData[numberIndex+i])){
            num=num.concat(inputData[numberIndex+i]);
            i=i+1;
        }
        else{
            completeR=true;
        }
        
    }
    var lastIndex=numberIndex+i;
    var getNumber=[num, lastIndex];
    return getNumber
}

function findNeighbors(input, index, width, height){
    var validNum=false;
    var nextIndex;
    var k=0;
    for(var i=-1; i<2; i++){
        for(var j=-1; j<2; j++){
            k++;
            nextIndex=index+(width*i+j);
            if(input[nextIndex] != "." && isNaN(input[nextIndex]) && nextIndex != index && nextIndex>0 && nextIndex<width*height){
                validNum=true;
                return validNum
            }
        }
    }
    return false;
}

var width=input[1].length;
var height=input.length

input=inputToString(input, width, height);
checkIfValid(input,width, height);


