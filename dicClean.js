// clean all comment cannot use\
// don't use the array method because in this time i don'y know that 
// some code are incomplete
const form = document.getElementById('form');
const text = document.getElementById('text');
const antonyms = document.getElementById('antonyms')
const partOfSpeech = document.getElementById('partOfSpeech')
const SynonymsWord = document.getElementById('synonyms')

function getWordDic(){
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/home`)
    .then(res =>res.json()).then(data=>{
        console.log(data[0].meanings);
        console.log("-----------------");
        mainArray(data)
        allSynonyms(data)
        allDefinition(data)
        separateDefArray(definitionArray)
        console.log(filterSynArray);
        checkAntonyms(data[0].meanings[0].antonyms)
    })
}
let partOfSpeechArray = [];

let synonymsArray = []; 
let filterSynArray = [] 

let definitionArray = [];
let filterDefArray = [];

function mainArray(data){
    const anatomyWord = data[0].meanings;
    for(let i = 0; i< anatomyWord.length; i++){
        partOfSpeechArray.push(anatomyWord[i].partOfSpeech)
    }
    if(text.value === '');
    else{
        partOfSpeech.innerHTML = partOfSpeechArray
    }
}

function allSynonyms(data){
    let numberSyn = data[0].meanings
    for(let i = 0 ; i<numberSyn.length ; i++){
        let sizeArraySyn = numberSyn[i].synonyms;
        for(let j = 0 ; j < sizeArraySyn.length ; j++){
            filterSynArray.push(sizeArraySyn[j])
        }
        synonymsArray.push(numberSyn[i].synonyms);
    }
    if(text.value === '');
    else{
        if(filterSynArray[0] === 'indefinite' || filterSynArray[1] === 'undefinable'){
            filterSynArray.shift()
            filterSynArray.shift()
        }
        SynonymsWord.innerHTML = filterSynArray
    }
}

function showSyn(data){
    for(let i = 0 ;i < data.length ; i++){
        console.log(data[i]);
    }
}

function allDefinition(data){
    let numberDef = data[0].meanings;
    for(let i = 0; i< numberDef.length ;i++){
        let sizeArrayDef =  numberDef[i].definitions;
        for(let j = 0 ; j < sizeArrayDef.length ; j++){
            definitionArray.push(sizeArrayDef[j]);
        }
    }
    console.log(definitionArray.length);
}

function separateDefArray(data){
    let sizeSepDef = data.length
    for(let i = 0 ; i < sizeSepDef ; i++){
        filterDefArray.push(data[i].definition)
    }
    console.log(filterDefArray);
    if(text.value === '');
    else{
        definitionWord.innerHTML = `Definition\n
        ${filterDefArray.join(["****next definition****"])}`
    }
}

function checkAntonyms(dataArray){
    if(dataArray.length === 0){
        antonyms.innerHTML = ""
    }
    else{
        for(let wordAntonyms of (data[0].meanings[0].antonyms)){
            antonyms.innerHTML = wordAntonyms;
        }
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const word = text.value
    if(word.trim() === ''){
        alert("enter word");
    }
    else{
        getWordDic()
        word = ''
    }
    
})

getWordDic()