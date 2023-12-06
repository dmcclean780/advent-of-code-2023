const fs = require('node:fs');
var input
try {
  const data = fs.readFileSync('/home/daniel/Documents/advent-of-code-2023/advent-of-code-2023/Day4/input.txt', 'utf8');
  input=data.split("\n");
} catch (err) {
  console.error(err);
}

function tidyInput(inputData){
    for(var i=0; i<inputData.length; i++){
        str=inputData[i];
        str = str.substring(str.indexOf(":") + 2);;
        inputData[i]=str;
    }
    return inputData
}

function findWinning(inputData){
    var sum=0;
    var cardAmounts= new Array(inputData.length)
    cardAmounts.fill(1);
    for(var i=0; i<inputData.length; i++){
        var matches=0;
            var card=inputData[i].split("|");
            var winning=card[0].split(" ");
            var numbers=card[1].split(" ");
            for(var k=0; k<numbers.length; k++){
                if(winning.includes(numbers[k]) && numbers[k]!=""){
                    matches++
                }
            }
            for(var k=0;k<matches; k++){
                cardAmounts[i+k+1]+=1*cardAmounts[i];
            }
            matches=0;
    }
    for(var i=0; i<inputData.length; i++){
        sum+=cardAmounts[i];
        //console.log(inputData[i].length)
    }
    console.log(sum);
}
input=tidyInput(input);
findWinning(input);