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

// Correct Pokémon names for Bulbapedia links
function correctPokemonName(name) {
  const corrections = {
    'ho-oh': 'Ho-Oh',
    'nidoran-m': 'Nidoran♂',
    'nidoran-f': 'Nidoran♀',
    'mr-mime': 'Mr._Mime',
    'deoxys-normal': 'Deoxys',
    'wormadam-plant': 'Wormadam',
    'mime-jr': 'Mime_Jr.',
    'porygon-z': 'Porygon-Z',
    'giratina-altered': 'Giratina',
    'shaymin-land': 'Shaymin',
    'basculin-red-striped': 'Basculin',
    'darmanitan-standard': 'Darmanitan',
    'tornadus-incarnate': 'Tornadus',
    'thundurus-incarnate': 'Thundurus',
    'landorus-incarnate': 'Landorus',
    'keldeo-ordinary': 'Keldeo',
    'meloetta-aria': 'Meloetta',
    'meowstic-male': 'Meowstic',
    'aegislash-shield': 'Aegislash',
    'pumpkaboo-average': 'Pumpkaboo',
    'gourgeist-average': 'Gourgeist',
    'zygarde-50': 'Zygarde',
    'oricorio-baile': 'Oricorio',
    'lycanroc-midday': 'Lycanroc',
    'wishiwashi-solo': 'Wishiwashi',
    'type-null': 'Type:_Null',
    'minior-red-meteor': 'Minior',
    'mimikyu-disguised': 'Mimikyu',
    'tapu-koko': 'Tapu_Koko',
    'tapu-lele': 'Tapu_Lele',
    'tapu-bulu': 'Tapu_Bulu',
    'tapu-fini': 'Tapu_Fini',
    'toxtricity-amped': 'Toxtricity',
    'mr-rime': 'Mr._Rime',
    'eiscue-ice': 'Eiscue',
    'indeedee-male': 'Indeedee',
    'morpeko-full-belly': 'Morpeko',
    'urshifu-single-strike': 'Urshifu',
    'basculegion-male': 'Basculegion',
    'enamorus-incarnate': 'Enamorus',
    'oinkologne-male': 'Oinkologne',
    'maushold-family-of-four': 'Maushold',
    'squawkabilly-green-plumage': 'Squawkabilly',
    'palafin-zero': 'Palafin',
    'tatsugiri-curly': 'Tatsugiri',
    'dudunsparce-two-segment': 'Dudunsparce',
    'great-tusk': 'Great_Tusk',
    'scream-tail': 'Scream_Tail',
    'brute-bonnet': 'Brute_Bonnet',
    'flutter-mane': 'Flutter_Mane',
    'slither-wing': 'Slither_Wing',
    'sandy-shocks': 'Sandy_Shocks',
    'iron-treads': 'Iron_Treads',
    'iron-bundle': 'Iron_Bundle',
    'iron-hands': 'Iron_Hands',
    'iron-jugulis': 'Iron_Jugulis',
    'iron-moth': 'Iron_Moth',
    'iron-thorns': 'Iron_Thorns',
    'wo-chien': 'Wo-Chien',
    'chien-pao': 'Chien-Pao',
    'ting-lu': 'Ting-Lu',
    'chi-yu': 'Chi-Yu',
    'roaring-moon': 'Roaring_Moon',
    'iron-valiant': 'Iron_Valiant',
    'walking-wake': 'Walking_Wake',
    'iron-leaves' : 'Iron_Leaves',
    'gouging-fire': 'Gouging_Fire',
    'raging-bolt': 'Raging_Bolt',
    'iron-boulder': 'Iron_Boulder',
    'iron-crown': 'Iron_Crown',
  }
  return corrections[name.toLowerCase()] || name;
}

// Get Bulbapedia link
function getBulbapediaLink(pokemonName) {
  const correctedName = correctPokemonName(pokemonName);
  const baseUrl = "https://bulbapedia.bulbagarden.net/wiki/";
  return `${baseUrl}${correctedName}_(Pokémon)`;
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

document.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    const activeElement = document.activeElement;
    if (activeElement.id === 'pokemon-limit') {
      fetchPokemonList();
    } else if (activeElement.id === 'search-pokemon') {
      searchPokemon(); 
    }
  }
});

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

