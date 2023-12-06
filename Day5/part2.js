class Seed{
    constructor(startValue, range){
        this.start=Number(startValue);
        this.range=Number(range);
    }
}


const fs = require('node:fs');
var input
try {
  const data = fs.readFileSync('/home/daniel/Documents/advent-of-code-2023/advent-of-code-2023/Day5/input.txt', 'utf8');
  input=data.split("\n");
} catch (err) {
  console.error(err);
}

function getSeeds(input){
    var seedsRaw=input[0].substring(input[0].indexOf(":") + 2);
    var seedsRaw=seedsRaw.split(" ");
    var seeds=[];
    for(var i=0; i<seedsRaw.length/2; i=i+2 ){
        var seed = new Seed(seedsRaw[i], seedsRaw[i+1]);
        seeds.push(seed);
    }
    return seeds;
}

function getSoilMaps(input){
    var soilMaps=[];
    for(var i=3; i<input.length; i++){
        if(input[i]!=""){
            soilMap=input[i].split(" ");
            soilMaps.push(soilMap);
        }
        else{
            break
        }
    }
    return soilMaps

}

function getFertilizerMaps(input){
    var fertilizerMaps=[];
    for(var i=0; i<input.length; i++){
        if(input[i]=="soil-to-fertilizer map:"){
            break
        }
    }
    for(var i=i+1;i<input.length; i++){
        if(input[i]!=""){
            fertilizerMap=input[i].split(" ");
            fertilizerMaps.push(fertilizerMap);
        }
        else{
            break
        }
    }
    return fertilizerMaps
}

function getWaterMaps(input){
    var waterMaps=[];
    for(var i=0; i<input.length; i++){
        if(input[i]=="fertilizer-to-water map:"){
            break
        }
    }
    for(var i=i+1;i<input.length; i++){
        if(input[i]!=""){
            waterMap=input[i].split(" ");
            waterMaps.push(waterMap);
        }
        else{
            break
        }
    }
    return waterMaps
}

function getLightMaps(input){
    var lightMaps=[];
    for(var i=0; i<input.length; i++){
        if(input[i]=="water-to-light map:"){
            break
        }
    }
    for(var i=i+1;i<input.length; i++){
        if(input[i]!=""){
            lightMap=input[i].split(" ");
            lightMaps.push(lightMap);
        }
        else{
            break
        }
    }
    return lightMaps
}

function getTempMaps(input){
    var tempMaps=[];
    for(var i=0; i<input.length; i++){
        if(input[i]=="light-to-temperature map:"){
            break
        }
    }
    for(var i=i+1;i<input.length; i++){
        if(input[i]!=""){
            tempMap=input[i].split(" ");
            tempMaps.push(tempMap);
        }
        else{
            break
        }
    }
    return tempMaps
}

function getHumidMaps(input){
    var humidMaps=[];
    for(var i=0; i<input.length; i++){
        if(input[i]=="temperature-to-humidity map:"){
            break
        }
    }
    for(var i=i+1;i<input.length; i++){
        if(input[i]!=""){
            humidMap=input[i].split(" ");
            humidMaps.push(humidMap);
        }
        else{
            break
        }
    }
    return humidMaps
}

function getLocnMaps(input){
    var locnMaps=[];
    for(var i=0; i<input.length; i++){
        if(input[i]=="humidity-to-location map:"){
            break
        }
    }
    for(var i=i+1;i<input.length; i++){
        if(input[i]!=""){
            locnMap=input[i].split(" ");
            locnMaps.push(locnMap);
        }
        else{
            break
        }
    }
    return locnMaps
}

function convert(source, maps){
    var dest=0;
    source=Number(source);
    for(var i=0; i<maps.length; i++){
        var sourceStart=Number(maps[i][1]);
        var sourceEnd=Number(maps[i][1])+Number(maps[i][2]);
        if(source>=sourceStart && source<sourceEnd){
            dest=Number(maps[i][0])+(source-sourceStart);
        }
    }
    if(dest==0){
        dest=source;
    }
    return dest;
}

function reverseConvert(source, maps){
    var dest=0;
    source=Number(source);
    for(var i=0; i<maps.length; i++){
        var sourceStart=Number(maps[i][0]);
        //console.log(sourceStart)
        var sourceEnd=Number(maps[i][0])+Number(maps[i][2]);
        //console.log(sourceEnd);
        if(source>=sourceStart && source<sourceEnd){
            dest=Number(maps[i][1])+(source-sourceStart);
        }
    }
    if(dest==0){
        dest=source;
    }
    return dest;
}

function getLocn(seed){
    var soil=reverseConvert(seed,soilMaps);
    var fertilizer=reverseConvert(soil,fertilizerMaps);
    //console.log(seeds[i],fertilizer)
    var water = reverseConvert(fertilizer,waterMaps);
    //console.log(seeds[i],water)
    var light = reverseConvert(water, lightMaps);
    //console.log(seeds[i],light)
    var temp = reverseConvert(light, tempMaps);
    //console.log(seeds[i],temp)
    var humid = reverseConvert(temp, humidMaps);
    //console.log(seeds[i],humid)
    var locn = reverseConvert(humid, locnMaps);
    
    return locn
}

function getSeed(locn){
    var humid=reverseConvert(locn,locnMaps);
    //console.log(locn, humid);
    var temp=reverseConvert(humid,humidMaps);
    //console.log(locn,temp);
    var light = reverseConvert(temp,tempMaps);
    //console.log(locn,light)
    var water = reverseConvert(light, lightMaps);
    //console.log(locn,water)
    var fertilizer = reverseConvert(water, waterMaps);
    //console.log(locn,fertilizer)
    var soil = reverseConvert(fertilizer, fertilizerMaps);
    //console.log(locn,soil)
    var seed = reverseConvert(soil, soilMaps);

    return seed
}
var seeds=getSeeds(input);
var soilMaps=getSoilMaps(input);
var fertilizerMaps=getFertilizerMaps(input);
var waterMaps=getWaterMaps(input);
var lightMaps=getLightMaps(input);
var tempMaps=getTempMaps(input);
var humidMaps=getHumidMaps(input);
var locnMaps=getLocnMaps(input);
var minLocn=0
var seedFound=false;

i=0;
while(!seedFound){
    var locn=i;
    var seed=getSeed(locn);
    console.log(locn, seed)
    for(var j=0; j<seeds.length; j++){
        var seedStart=seeds[j].start;
        var seedEnd=seedStart+seeds[j].range;
        if(seed>=seedStart && seed<seedEnd){
           minLocn=locn;
           seedFound=true;
           break
        }
    }
    i++;
}
console.log(minLocn);