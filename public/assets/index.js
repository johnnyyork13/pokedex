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
const gmaxBtn = document.getElementById('gmaxBtn');
const pokemonCry = document.getElementById('pokemonCry');
const isEnglish = document.getElementById('isEnglish');

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
let gmax;
let gmaxResponse;
let pokedexData;

/* STATEMENTS THAT NEED HOMES


*/

async function fetchPokemon(name) {
    try {
        statsContainer.style.visibility = 'hidden';
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemonData = await pokemon.json();
        const pokedex = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
        pokedexData = await pokedex.json();

        pokeImg.src = pokemonData.sprites.front_default;
        dataName.textContent = getID(pokemonData) + getName(pokemonData);
        dataHeight.innerHTML = getHeight(pokemonData.height) +
            `<br>` + getWeight(pokemonData.weight);

        getFlavorText(pokemonData, pokedexData);
        getType(pokemonData);
        // checkLanguage(pokedexData.flavor_text_entries);

        currentPokemon = pokemonData.id;
        pokeTextBox.value = pokemonData.name.toUpperCase();
        data.style.textAlign = 'left';

        pokemonObject = pokemonData;
        fetchAudio(pokemonData);
    } catch (err) {
        console.log(err);
        data.textContent = "ERROR: INVALID POKÈMON";
        dataName.textContent = '';
        dataHeight.textContent = '';
        pokeImg.src = '';
        data.style.textAlign = 'center';
    }
}

gmaxBtn.addEventListener('click', function() {
    try {
        getGMAX(pokedexData.varieties[1].pokemon.url); 
    } catch {
        console.log('Pokemon does not have a recorded alternate form.');
    }
})

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

