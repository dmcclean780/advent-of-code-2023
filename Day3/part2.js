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
            str=str.concat(inputData[i][j]);
        }
    }
    return str
}

function checkIfValid(inputData, width, height){
    var sum=0;
    var validNums=[];
    for(var i=0; i<inputData.length; i++){
        if(inputData[i]=="*"){
            var nums=findNeighbors(inputData, i, width, height)
            console.log("Gear:", i, "Numbers:", nums);
            var ratio = Number(nums[0])*Number(nums[1]);
            console.log(ratio);
            validNums.push(ratio)
            sum+=ratio;
            
        }
    }
    console.log(sum);
}

function getFullNumber(numberIndex, inputData){
    var completeL=false;
    var completeR=false;
    var num=inputData[numberIndex]
    var numberIndexs=[numberIndex];
    i=-1;
    while(!completeL){
        if(!isNaN(inputData[numberIndex+i])){
            var temp=num;
            num=""
            num=num.concat(inputData[numberIndex+i]);
            num=num.concat(temp);
            numberIndexs.push(numberIndex+i)
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
            numberIndexs.push(numberIndex+i)
            i=i+1;

        }
        else{
            completeR=true;
        }
        
    }
    var getNumber=[num, numberIndexs];
    return getNumber
}

function findNeighbors(input, index, width, height){
    var nums=[]
    var numsIdexes=[];
    var nextIndex;
    for(var i=-1; i<2; i++){
        for(var j=-1; j<2; j++){
            nextIndex=index+(width*i+j);
            if(!isNaN(input[nextIndex]) && numsIdexes.includes(nextIndex)==false && nextIndex != index && nextIndex>0 && nextIndex<width*height){
                var getNumber=getFullNumber(nextIndex, input);
                nums.push(getNumber[0]);
                for(var k=0; k<getNumber[1].length; k++){
                    numsIdexes.push(getNumber[1][k]);
                }
                
            } 
        }
    }
    if(nums.length==2){
        return nums;
    }
    return [0,0];
}

var width=input[1].length;
var height=input.length
input=inputToString(input, width, height);
checkIfValid(input,width, height);