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

  function countOcc(cards, target){
    var count=0;
    for(var i=0; i<cards.length; i++){
      if(cards[i]==target){
        count++
      }
    }
    return count;
  }
  
  function calcType(hand){
    var cards=[]
    console.log(hand);
    cards.push((hand.match(new RegExp("2","g")) || []).length);
    cards.push((hand.match(new RegExp("3","g")) || []).length);
    cards.push((hand.match(new RegExp("4","g")) || []).length);
    cards.push((hand.match(new RegExp("5","g")) || []).length);
    cards.push((hand.match(new RegExp("6","g")) || []).length);
    cards.push((hand.match(new RegExp("7","g")) || []).length);
    cards.push((hand.match(new RegExp("8","g")) || []).length);
    cards.push((hand.match(new RegExp("9","g")) || []).length);
    cards.push((hand.match(new RegExp("T","g")) || []).length);
    cards.push((hand.match(new RegExp("Q","g")) || []).length);
    cards.push((hand.match(new RegExp("K","g")) || []).length);
    cards.push((hand.match(new RegExp("A","g")) || []).length);
    var J = (hand.match(new RegExp("J","g")) || []).length;
    //console.log(J)
    var highestCard=Math.max(...cards)
    //console.log(highestCard);
    var count=highestCard+J;
    //console.log(count)
    if(count==5){
      return 7;
    }
    if(count==4){
      return 6
    }
    if(count==1){
      return 1;
    }
    if(count==3){
      var two=countOcc(cards,2)
      //console.log(two)
      if(two==2 && J==1 || two==1 && J==0){
        return 5 ;
      }
      else{
        return 4;
      }
    }
    if(count==2){
      var two=countOcc(cards,2)
      if(two==1 && J==1 || two==2 && J==0){
        return 3
      }
      else{
        return 2;
      }
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
          handNum.push(1);
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
      console.log(type);
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
  
  