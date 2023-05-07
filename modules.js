async function fetchPokemon(name) {
    try {
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemonData = await pokemon.json();
        const pokedex = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
        const pokedexData = await pokedex.json();

        return [pokemonData, pokedexData];
    } catch (err) {
        console.log(err);
    }
}

function fetchFail() {
    console.log('boobs');
}

module.exports = {fetchPokemon, fetchFail};