const container = document.getElementById("pokemon-container");

const regions = 
{ kanto: { start: 1, end: 151}, 
  johto: { start: 152, end: 251}, 
  hoenn: { start: 252, end: 386}, 
  sinnoh: { start: 387, end: 494}, 
  unova: { start: 495, end: 649}, 
  kalos: { start: 650, end: 721}, 
  alola: { start: 722, end: 809}, 
  galar: { start: 810, end: 905}, 
  paldea: { start: 906, end: 1025}, 
};

async function fetchPokemonList() {
  try {
    const limit = document.getElementById("pokemon-limit").value;

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    );
    const data = await response.json();
    const pokemonList = data.results;

    console.log("Fetched Pokémon List:", pokemonList)

    container.innerHTML = "";

    for (const pokemon of pokemonList) {
      await displayPokemon(pokemon.url);
    }
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
  }
}

async function fetchRandomPokemon() {
  try {
    const randomId = Math.floor(Math.random() * 1025) + 1; // Pokémon ID range: 1 - 1025
    await displayPokemon(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  } catch (error) {
    console.error("Error fetching random Pokémon:", error);
  }
}

async function searchPokemon() {
  const searchInput = document
    .getElementById("search-pokemon")
    .value.trim()
    .toLowerCase();

  if (!searchInput) {
    alert("Please enter a Pokémon name or ID!");
    return;
  }

  try {
    await displayPokemon(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);
  } catch (error) {
    console.error("Error searching for Pokémon:", error);
    alert("Pokémon not found! Please try again.");
  }
}

function getBulbapediaLink(pokemonName) {
  const baseUrl = "https://bulbapedia.bulbagarden.net/wiki/";
  return `${baseUrl}${pokemonName}_(Pokémon)`;
}

async function displayPokemon(url) {
  
  try {
    const response = await fetch(url);
    const details = await response.json();

    const type = details.types?.[0]?.type?.name || "Unknown";
    const sprite = details.sprites?.front_default || "No sprite available";
    const name = details.name.charAt(0).toUpperCase() + details.name.slice(1);
    const bulbapediaLink = getBulbapediaLink(name);

    container.innerHTML += `
      <a href="${bulbapediaLink}" target="_blank">
        <div class="pokemon-card">
          <h2>${name}</h2>
          <p>Type: ${type}</p>
          <img src="${sprite}" alt="${name}" />
        </div>
      </a>`;
  } catch (error) {
    console.error("Error displaying Pokémon:", error);
  }
}

async function fetchPokemonByRegion() { 
  const selectedRegion = document.getElementById("region-select").value; 

  if (!selectedRegion) {
    alert('Please select a region!')
    return;
  }

  const { start, end,} = regions[selectedRegion]; 
  container.innerHTML = ""; 
  for (let i = start; i <= end; i++) { 
    await displayPokemon(`https://pokeapi.co/api/v2/pokemon/${i}`); 
  } 
}

function clearPokemon() {
  container.innerHTML = '';
}



document
  .getElementById("fetch-pokemon")
  .addEventListener("click", fetchPokemonList);
document
  .getElementById("random-pokemon")
  .addEventListener("click", fetchRandomPokemon);
document
  .getElementById("search-pokemon-btn")
  .addEventListener("click", searchPokemon);
document
  .getElementById('clear-pokemon')
  .addEventListener('click', clearPokemon);
document
  .getElementById('fetch-region-pokemon')
  .addEventListener('click', fetchPokemonByRegion);

