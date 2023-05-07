const express = require('express');
const cld = require('cld');
const {fetchPokemon} = require('./modules.js');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', {pokeName: 'charmander'});
})

let pokeTextBox;
let allData;
let pokemonData;
let pokedexData;
let pokeImgSrc;
let dataName;
let dataHeight;
let dataDescription;
let hp;
let atk;
let def;
let sAtk;
let sDef;
let sp;
let typeOne;
let typeTwo;
let statsOpen;
let pokemonCry;

app.post('/', async function(req, res){
    pokeTextBox = req.body.pokeTextBox;
    if (req.body.action === 'searchBtn') {
        allData = await fetchPokemon(pokeTextBox.toLowerCase());
        pokeImgSrc = allData[0].sprites.front_default;
    } else if (req.body.action === 'gmaxBtn') {
        try {
            pokeImgSrc = allData[2].sprites.front_default;
        } catch {
            console.log('No GMAX Form Available.');
        }

    } else if (req.body.action === 'leftBtn') {
        allData = await fetchPokemon(allData[0].id - 1);
        pokeImgSrc = allData[0].sprites.front_default;
    } else if (req.body.action === 'rightBtn') {
        allData = await fetchPokemon(allData[0].id + 1);
        pokeImgSrc = allData[0].sprites.front_default;
    } else if (req.body.action === 'statsOpenBtn') {
        statsOpen = true;
    } else if (req.body.action === 'statsCloseBtn') {
        statsOpen = false;
    }
    
    pokemonData = allData[0];
    pokedexData = allData[1];

    dataName = `${getID(pokemonData)}${pokemonData.name.toUpperCase()}`;
    dataHeight = getHeight(pokemonData.height) + '<br>' + getWeight(pokemonData.weight);
    dataDescription = await getEnglishDescription(pokedexData);
    getType(pokemonData);
    loadStats(pokemonData);

    pokemonCry = fetchAudio(pokemonData);
    if (!statsOpen) {
        clearStats();
    } else {
        clearDescription();
    }
    res.render('index.ejs', {pokeName: pokemonData.name.toUpperCase(),
        pokeImgSrc: pokeImgSrc,
        dataName: dataName,
        dataHeight: dataHeight,
        dataDescription: dataDescription,
        typeOne: typeOne,
        typeTwo: typeTwo,
        hp: hp,
        atk: atk,
        def: def,
        sAtk: sAtk,
        sDef: sDef,
        sp: sp,
        pokemonCry: pokemonCry});
})



// cld.detect('This is a language recognition example').then((result) => {
//     console.log(result);
// });

app.listen(3000);

function getID(data) {
    let id = data.id;
    if (id < 10) {
        return `00${id}.`;
    } else if (id < 100) {
        return `0${id}.`;
    } else {
        return `${id}.`;
    }
}

function fetchAudio(pokemonData) {
    pokemonCry = '';
    let pokeName = pokemonData.name.toLowerCase();
    let srcName = '';
    for (let i = 0; i < pokeName.length; i++) {
        if (pokeName[i] !== '-') {
            srcName += pokeName[i];
        }
    }

    return `https://play.pokemonshowdown.com/audio/cries/${srcName}.mp3`;
}

async function getEnglishDescription(pokedex) {
    let language = 'ENGLISH';
    let found = false;
    let index = 0;
    while (!found) {
        try {
            let entry = pokedex.flavor_text_entries[index].flavor_text;
            let checkEntry = await cld.detect(entry);
            if (checkEntry.languages[0].name === language) {
                found = true;
                return entry;
            } else if (index >= pokedex.flavor_text_entries.length) {
                found = true;
                console.log('no english found');
                return 'Insufficient Pokedex Data';
            };
            index++;
        } catch {
            entry = 'Insufficient Pokedex Data';
            return entry;
        }
        
    }

    
}


function getHeight(height) {
    let convertedHeight = height * 3.937;
    let mod;
    if (convertedHeight >= 12) {
        mod = convertedHeight % 12;
    } else {
        return `Ht. 0'${Math.trunc(convertedHeight)}''`;
    }
    return `Ht. ${Math.floor(convertedHeight/12)}'${Math.trunc(mod)}''`;
}

function getWeight(weight) {
    return `Wt. ${Math.trunc(weight / 5.536)} lbs`;
}

function loadStats(data) {
    let dataStats = data.stats;
    try {
        hp = 'HP: ' + dataStats[0].base_stat;
        atk = 'ATK: ' + dataStats[1].base_stat;
        def = 'DEF: ' + dataStats[2].base_stat;
        sAtk = 'SP-ATK: ' + dataStats[3].base_stat;
        sDef = 'SP-DEF: ' + dataStats[4].base_stat;
        sp = 'SPEED: ' + dataStats[5].base_stat; 
    } catch (err) {
        console.log(err);
    }
    
}

function getType(data) {
    if (data.types[0] !== undefined && data.types[0] !== null) {
        typeOne = data.types[0].type.name.toUpperCase();
    } else {
        typeOne = '';
    }

    if (data.types[1] !== undefined && data.types[1] !== null) {
        typeTwo = data.types[1].type.name.toUpperCase();
    } else {
        typeTwo = '';
    }
}

function clearStats() {
    hp = '';
    atk = '';
    def = '';
    sAtk = '';
    sDef = '';
    sp = '';
}

function clearDescription() {
    dataName = '';
    dataHeight = '';
    dataDescription = '';
}