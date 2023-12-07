class Card{
  constructor(type, hand, bid){
    this.type=type;
    this.hand=hand;
    this.bid=bid;
  }
}

const fs = require('node:fs');
var input
try {
  const data = fs.readFileSync('/home/daniel/Documents/advent-of-code-2023/advent-of-code-2023/Day7/input.txt', 'utf8');
  input=data.split("\n");
} catch (err) {
  console.error(err);
}

function splitInput(input){
  for(var i=0; i<input.length; i++){
    input[i]=input[i].split(" ");
  }
  return input
}

function calcType(hand){
  var card1=hand[0];
  var card1Count=(hand.match(new RegExp(card1, "g")).length);
  if(card1Count!=5){
    var card2=""
    var i=1
    while(card2==""){
      if(hand[i]!=card1){
        card2=hand[i];
      }
      i++
    }
    var card2Count=(hand.match(new RegExp(card2, "g")).length);
    if(card1Count+card2Count!=5){
      var card3=""
      var i=1
      while(card3==""){
        if(hand[i]!=card1 && hand[i]!=card2){
          card3=hand[i];
        }
        i++
      }
      var card3Count=(hand.match(new RegExp(card3, "g")).length);
      if(card1Count+card2Count+card3Count!=5){
        var card4=""
        var i=1
        while(card4==""){
          if(hand[i]!=card1 && hand[i]!=card2 && hand[i]!=card3){
            card4=hand[i];
          }
          i++
        }
        var card4Count=(hand.match(new RegExp(card4, "g")).length);
        if(card1Count+card2Count+card3Count+card4Count!=5){
          var type=1
          return type;
        }
        else{
          var type=2;
          return type;
        }
      }
      else{
        if(card1Count==3 || card2Count==3 || card3Count==3){
          var type=4
          return type;
        }
        else{
          var type=3;
          return type;
        }
      }
    }
    else{
      if(card1Count==4 || card2Count==4){
        var type=6;
        return type;
      }
      else{
        var type=5;
        return type;
      }
    }
  }
  else{
    var type=7;
    return type;
  }
}

function handToNum(hand){
  var handNum=[]
  for(var i=0; i<hand.length; i++){
    switch(hand[i]){
      case "A":
        handNum.push(14)
        break;
      case "K":
        handNum.push(13)
        break;
      case "Q":
        handNum.push(12)
        break;
      case "J":
        handNum.push(11);
        break;
      case "T":
        handNum.push(10)
        break;
      default:
        handNum.push(Number(hand[i]))
    }
  }
  console.log(handNum)
  return handNum;
}


function buildGame(input){
  var game=[]
  input=splitInput(input);
  for(var i=0; i<input.length; i++){
    var hand=input[i][0];
    var type=calcType(hand);
    hand=handToNum(hand);
    var bid=input[i][1];
    var card = new Card(type, hand, bid);
    //console.log(card)
    game.push(card);
  }
  return game;
}
var swaps=1;
function rank(game){
  while(swaps!=0){
    swaps=0;
    for(var j=1; j<game.length; j++){
      //console.log(j+1<=game.length)
        //conmnjle.log(game[j-1], game[j])
        if(game[j-1].type>game[j].type){
          var temp=game[j];
          game[j]=game[j-1];
          game[j-1]=temp
          //console.log("swap ")
          swaps++
        }
          if(game[j].type==game[j-1].type){
            game=compareHands(game,j);
            //console.log(swaps) 
          }
    }
    //console.log(swaps);
    //printGame(game);
  }
  return game
}
function compareHands(game, j){
  hand1=game[j-1].hand;
  hand2=game[j].hand;
  for(var k=0;k<5; k++){
    var a=hand1[k];
    var b=hand2[k];
    if(a>b){
      swaps++
      var temp=game[j];
      game[j]=game[j-1];
      game[j-1]=temp
      return game;
    }
    if(b>a){
      return game;
    }
  }
  return game
}
function totalWinnings(game){
  var winnings=0
  for(var i=0; i<game.length; i++){
    winnings+=(i+1)*Number(game[i].bid);
  }
  console.log(winnings);
}

function printGame(game){
  for(var i=0; i<game.length; i++){
    console.log(game[i]);
    console.log(game[i].hand)
  }
  console.log("end")
}
var game=buildGame(input);
game=rank(game);
printGame(game)
totalWinnings(game);
//printGame(game)

