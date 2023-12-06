const fs = require('node:fs');
var input
try {
  const data = fs.readFileSync('/home/daniel/Documents/advent-of-code-2023/advent-of-code-2023/Day5/input.txt', 'utf8');
  input=data.split("\n");
} catch (err) {
  console.error(err);
}

function getSeeds(input){
    var seeds=input[0].substring(input[0].indexOf(":") + 2);
    var seeds=seeds.split(" ");
    return seeds
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


var seeds=getSeeds(input);
var soilMaps=getSoilMaps(input);
var fertilizerMaps=getFertilizerMaps(input);
var waterMaps=getWaterMaps(input);
var lightMaps=getLightMaps(input);
var tempMaps=getTempMaps(input);
var humidMaps=getHumidMaps(input);
var locnMaps=getLocnMaps(input);

var locns=[]
for(var i=0; i<seeds.length; i++){
    var soil=convert(seeds[i],soilMaps);
    //console.log(seeds[i],soil)
    var fertilizer=convert(soil,fertilizerMaps);
    //console.log(seeds[i],fertilizer)
    var water = convert(fertilizer,waterMaps);
    //console.log(seeds[i],water)
    var light = convert(water, lightMaps);
    //console.log(seeds[i],light)
    var temp = convert(light, tempMaps);
    //console.log(seeds[i],temp)
    var humid = convert(temp, humidMaps);
    //console.log(seeds[i],humid)
    var locn = convert(humid, locnMaps);
    //console.log(seeds[i],locn)
    locns.push(locn);
}
console.log(Math.min(...locns));