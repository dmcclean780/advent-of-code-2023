const fs = require('node:fs');
var input
try {
  const data = fs.readFileSync('/home/daniel/Documents/advent-of-code-2023/advent-of-code-2023/Day2/input.txt', 'utf8');
  input=data.split("\n");
} catch (err) {
  console.error(err);
}

function trimInput(inputList){
  for(var i=0; i<inputList.length; i++){
    str=inputList[i];
    str = str.substring(str.indexOf(":") + 2);
    inputList[i]=str;
  }
  return inputList
}

function splitInput(inputList){
  var splitInputList=[]
  var finalInput=[[]];
  for(var i=0; i<inputList.length; i++){
    splitInputList[i]=inputList[i].split("; ");
  }
  for(var i=0; i<inputList.length; i++){
    finalInput[i]=new Array(splitInputList[i].length)
    for(var j=0; j<splitInputList[i].length; j++){
      finalInput[i][j]=splitInputList[i][j].split(", ");
    }
  }
  return finalInput;
}

function getColourNumbers(inputList){
  var colourAmount=[]
  for(var i=0; i<inputList.length; i++){
    colourAmount[i]=new Array(inputList[i].length);
    for(var j=0;j<inputList[i].length; j++){
      colourAmount[i][j]=[0,0,0];
      for(var k=0; k<inputList[i][j].length; k++){
        var colour=inputList[i][j][k].split(" ")
        if(colour[1]=="red"){
          colourAmount[i][j][0]=colour[0];
        }
        if(colour[1]=="blue"){
          colourAmount[i][j][1]=colour[0];
        }
        if(colour[1]=="green"){
          colourAmount[i][j][2]=colour[0];
        }
      }
    }
  }
  return colourAmount;
}

function checkValid(colours){
  var valid=true;
  var sum=0;
  for(var i=0; i<colours.length; i++){
    for(var j=0; j<colours[i].length; j++){
        if(Number(colours[i][j][0])>12){
          valid=false;
        }
        if(Number(colours[i][j][1])>14){
          valid=false;
        }
        if(Number(colours[i][j][2])>13){
          valid=false;
        }
    }
    if(valid){
      sum=sum+i+1
    }
    valid=true
  }
  console.log(sum);
}

function findPower(colours){
  var powers=0
  var maxRed=0
  var maxBlue=0
  var maxGreen=0
  var thisPower=0
  for(var i=0; i<colours.length; i++){
    for(var j=0; j<colours[i].length; j++){
        if(Number(colours[i][j][0])>maxRed){
          maxRed=colours[i][j][0];
        }
        if(Number(colours[i][j][1])>maxBlue){
          maxBlue=colours[i][j][1];
        }
        if(Number(colours[i][j][2])>maxGreen){
          maxGreen=colours[i][j][2]
        }
    }
    console.log("red:", maxRed);
    console.log("blue:", maxBlue);
    console.log("green:", maxGreen);
    thisPower=maxRed*maxBlue*maxGreen;
    console.log("power:", thisPower);
    powers+=thisPower;
    var maxRed=0
    var maxBlue=0
    var maxGreen=0
  }
  console.log(powers);
}

input=trimInput(input);
input=splitInput(input);
var colours=getColourNumbers(input);
findPower(colours);
