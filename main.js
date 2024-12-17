
const content = document.querySelector('.content');

const pokeapi = 'https://pokeapi.co/api/v2/'

const kantoPokemon = [];
const johtoPokemon = [];
const hoennPokemon = [];
const sinnohPokemon = [];
const unovaPokemon = [];
const kalosPokemon = [];
const alolaPokemon = [];
const galarPokemon = [];
const paldeaPokemon = [];

async function getAllPokemon() {
    try {
        const result = await fetch(`${pokeapi}pokemon?limit=3000`)
        const data = await result.json()
        const pokemonList = data.results
        for (const pokemon of pokemonList) {
            await getData(pokemon.url)
        }
        renderLists()
    } catch(error) {
        console.log(error)
    }
}

async function getData(url) {
    try {
        const result = await fetch(url)
        const data = await result.json()

        categorizePokemon(data)
    } catch(error) {
        console.log(error)
    }
}

function categorizePokemon(data) {
    const region = data.location_area_encounters

    if (region.includes('kanto')) {
        kantoPokemon.push(data)
    } else if (region.includes('johto')) {
        johtoPokemon.push(data)
    } else if (region.includes('hoenn')) {
        hoennPokemon.push(data)
    } else if (region.includes('sinnoh')) {
        sinnohPokemon.push(data)
    } else if (region.includes('unova')) {
        unovaPokemon.push(data)
    } else if (region.includes('kalos')) {
        kalosPokemon.push(data)
    } else if (region.includes('alola')) {
        alolaPokemon.push(data)
    } else if (region.includes('galar')) {
        galarPokemon.push(data)
    } else if (region.includes('paldea')) {
        paldeaPokemon.push(data)
    }
}

function renderLists() {
    renderList(kantoPokemon,'Kanto Pokémon')
    renderList(johtoPokemon,'Johto Pokémon')
    renderList(hoennPokemon,'Hoenn Pokémon')
    renderList(sinnohPokemon,'Sinnoh Pokémon')
    renderList(unovaPokemon,'Unova Pokémon')
    renderList(kalosPokemon,'Kalos Pokémon')
    renderList(alolaPokemon,'Alola Pokémon')
    renderList(galarPokemon,'Galar Pokémon')
    renderList(paldeaPokemon,'Paldea Pokémon')
}

function renderList(pokemonList, title) {
    console.log(pokemonList)

    const listContainer = document.createElement('div')
    const listTitle = document.createElement('h2')
    listTitle.textContent = title
    listContainer.appendChild(listTitle)

    pokemonList.forEach(pokemon => {
        const pokemonData = document.createElement('img')
        pokemonData.src = pokemon.sprites.front_default
        listContainer.appendChild(pokemonData)
    })
    content.appendChild(listContainer)
}
getAllPokemon();
