const fs = require('node:fs');
var input
try {
  const data = fs.readFileSync('//home/daniel/Documents/Advent-of-code-2023/Day1/input.txt', 'utf8');
  input=data.split("\n");
} catch (err) {
  console.error(err);
}

//input=["two1nine", "eightwothree", "abcone2threexyz", "xtwone3four", "4nineeightseven2", "zoneight234", "7pqrstsixteen"]

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
            else{
                calVal+=checkIfWord(word, j);
                if(calVal!=""){
                    break
                }

            }
            
        }
        for(var j=0; j<word.length+1; j++){
            
            if(!isNaN(word[word.length-j])){
                calVal=calVal+word[word.length-j];
            }
            else{
                calVal+=checkIfWord(word, word.length-j);
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

function checkIfWord(word, j){
    var number=""
    number=number+word[j]+word[j+1]+word[j+2];
    if(number=="one"){
        return 1
    }
    if(number=="two"){
        return 2
    }
    if(number=="six"){
        return 6
    }
    number=number+word[j+3]
    if(number=="four"){
        return 4
    }
    if(number=="five"){
        return 5
    }
    if(number=="nine"){
        return 9
    }
    number=number+word[j+4]
    if(number=="three"){
        return 3
    }
    if(number=="seven"){
        return 7
    }
    if(number=="eight"){
        return 8
    }
    return ""

}


findCal(input);
