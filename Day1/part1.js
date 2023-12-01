const fs = require('node:fs');
var input
try {
  const data = fs.readFileSync('//home/daniel/Documents/Advent-of-code-2023/Day1/input.txt', 'utf8');
  input=data.split("\n");
} catch (err) {
  console.error(err);
}

function findCal(inputList){
    var calVal= "";
    var sum=0;
    for(var i=0; i<inputList.length; i++){
        var word=inputList[i];
        for(var j=0; j<word.length+1; j++){
            if(!isNaN(word[j])){
                calVal=calVal+word[j]
                break
            }
        }
        for(var j=0; j<word.length+1; j++){
            
            if(!isNaN(word[word.length-j])){
                calVal=calVal+word[word.length-j];
            }
            if(calVal.length==2){
                sum+=Number(calVal);
                calVal="";
                break
            }
        }
    }
    console.log(sum);
}

findCal(input);
