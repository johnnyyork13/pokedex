// function checkLanguage(flavorText) {
//     for (let i = 0; i < 10; i++) {
//         let text = flavorText[i];
//         console.log(text.localCompare())
//     }
// }

async function getGMAX(url) {
    try {
        gmax = await fetch(url);
        gmaxResponse = await gmax.json();
        pokeImg.src = gmaxResponse.sprites.front_default;
        gmaxResponse = null;
    } catch (err) {
        console.log(err);
        console.log('Pokemon does not have a recorded alternate form.');
    }

}

function getFlavorText(pokemonData, pokedexData) {
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
    }
}

function fetchAudio(pokemon) {
    let pokeName = pokemon.name.toLowerCase();
    let srcName = '';
    for (let i = 0; i < pokeName.length; i++) {
        if (pokeName[i] !== '-') {
            srcName += pokeName[i];
        }
    }

    pokemonCry.src = `https://play.pokemonshowdown.com/audio/cries/${srcName}.mp3`;
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
    if (data.types[0] !== undefined && data.types[0] !== null) {
        typeOne.textContent = data.types[0].type.name.toUpperCase();
    } else {
        typeOne.textContent = '';
    }

    if (data.types[1] !== undefined && data.types[1] !== null) {
        typeTwo.textContent = data.types[1].type.name.toUpperCase();
    } else {
        typeTwo.textContent = '';
    }
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

function getWeight(weight) {
    return `Wt. ${Math.trunc(weight / 5.536)} lbs`;
}