async function fetchPokemon(name) {
    try {
        let gmax;
        let gmaxResponse;
        const poke = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemonData = await poke.json();
        const pokedex = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
        const pokedexData = await pokedex.json();
        try {
            gmax = await fetch(pokedexData.varieties[1].pokemon.url);
            gmaxResponse = await gmax.json();
            //pokeImg.src = gmaxResponse.sprites.front_default;
            //gmaxResponse = null;
        } catch (err) {
            gmaxResponse = null;
            console.log('Pokemon does not have a recorded alternate form.');
        }

        return [pokemonData, pokedexData, gmaxResponse];
    } catch (err) {
        console.log('ERROR ERROR ERROR');
        console.log(err);
    }
}

module.exports = {fetchPokemon};