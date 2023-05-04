const pokeImg = document.getElementById('pokeImg');
const pokeTextBox = document.getElementById('pokeTextBox');
const submitBtn = document.getElementById('submitBtn');
const data = document.getElementById('data');
const dataName = document.getElementById('dataName');
const dataHeight = document.getElementById('dataHeight');
const typeOne = document.getElementById('typeOne');
const typeTwo = document.getElementById('typeTwo');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const statsContainer = document.getElementById('statsContainer');
const statsOpen = document.getElementById('statsOpen');
const statsClose = document.getElementById('statsClose');

//stats
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('specialAttack');
const specialDefense = document.getElementById('specialDefense');
const speed = document.getElementById('speed');

let height;
let weight;
let flavorText;
let pokemonTypes;
let currentPokemon;
let pokemonObject;

async function fetchPokemon(name) {
    try {
    statsContainer.style.visibility = 'hidden';
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemonData = await pokemon.json();
    const pokedex = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    const pokedexData = await pokedex.json();
    pokeImg.src = pokemonData.sprites.front_default;
    dataName.textContent = getID(pokemonData) + getName(pokemonData);
    dataHeight.innerHTML = getHeight(pokemonData.height) +
        `<br>` + getWeight(pokemonData.weight);
    try {
        if (pokemonData.id >= 900) {
            flavorText = pokedexData.flavor_text_entries[0].flavor_text;
        } else if (pokemonData.id >= 722) {
            flavorText = pokedexData.flavor_text_entries[7].flavor_text;
        } else if (pokemonData.id >= 650) {
            flavorText = pokedexData.flavor_text_entries[6].flavor_text;
        } else if (pokemonData.id >= 494) {
            flavorText = pokedexData.flavor_text_entries[4].flavor_text;
        } else {
            flavorText = pokedexData.flavor_text_entries[0].flavor_text;
        }
        data.textContent = flavorText;
    } catch {
        data.textContent = 'Insufficient Data for Pokedex Entry.'
        console.log(pokemonData);
    }
    

    pokemonTypes = getType(pokemonData);
    typeOne.textContent = pokemonTypes[0];
    typeTwo.textContent = pokemonTypes[1];

    currentPokemon = pokemonData.id;
    pokeTextBox.value = pokemonData.name.toUpperCase();
    data.style.textAlign = 'left';

    pokemonObject = pokemonData;
    } catch (err) {
        data.textContent = "ERROR: INVALID POKÈMON";
        dataName.textContent = '';
        dataHeight.textContent = '';
        pokeImg.src = '';
        data.style.textAlign = 'center';
    }
}


submitBtn.addEventListener('click', function() {
    fetchPokemon(pokeTextBox.value.toLowerCase());
})

rightArrow.addEventListener('click', function() {
    if (currentPokemon !== undefined) {
        fetchPokemon(currentPokemon + 1);
    }
})

leftArrow.addEventListener('click', function() {
    if (currentPokemon !== undefined && currentPokemon > 1) {
        fetchPokemon(currentPokemon - 1);
    }
})

statsOpen.addEventListener('click', function(){
    clearData();
    loadStats(pokemonObject);
    statsContainer.style.visibility = 'visible';
})

statsClose.addEventListener('click', function() {
    fetchPokemon(currentPokemon);
})


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

function getName(data) {
    let name = data.name;
    return name.toUpperCase();
}

function getType(data) {
    let typeOne;
    let typeTwo;

    if (data.types[0] !== undefined && data.types[0] !== null) {
        typeOne = data.types[0].type.name;
    } else {
        typeOne = '';
    }

    if (data.types[1] !== undefined && data.types[1] !== null) {
        typeTwo = data.types[1].type.name;
    } else {
        typeTwo = '';
    }

    return [typeOne.toUpperCase(), typeTwo.toUpperCase()];
}

function loadStats(data) {
    let dataStats = data.stats;
    try {
        hp.textContent = 'HP: ' + dataStats[0].base_stat;
        attack.textContent = 'ATK: ' + dataStats[1].base_stat;
        defense.textContent = 'DEF: ' + dataStats[2].base_stat;
        specialAttack.textContent = 'SP-ATK: ' + dataStats[3].base_stat;
        specialDefense.textContent = 'SP-DEF: ' + dataStats[4].base_stat;
        speed.textContent = 'SPEED: ' + dataStats[5].base_stat; 
    } catch (err) {
        console.log(err);
    }
    
}

function clearData() {
    dataName.textContent = '';
    dataHeight.textContent = '';
    data.textContent = '';
}