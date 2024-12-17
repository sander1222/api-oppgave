async function fetchPokemonList() {
  try {
    const limit = document.getElementById("pokemon-limit").value;

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    );
    const data = await response.json();
    const pokemonList = data.results;

    const container = document.getElementById("pokemon-container");
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
    const randomId = Math.floor(Math.random() * 1010) + 1; // Pokémon ID range: 1 - 1010
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

async function displayPokemon(url) {
  const container = document.getElementById("pokemon-container");

  try {
    const response = await fetch(url);
    const details = await response.json();

    const type = details.types?.[0]?.type?.name || "Unknown";
    const sprite = details.sprites?.front_default || "No sprite available";

    container.innerHTML += `
      <div class="pokemon-card">
        <h2>${details.name}</h2>
        <p>Type: ${type}</p>
        <img src="${sprite}" alt="${details.name}" />
      </div>`;
  } catch (error) {
    console.error("Error displaying Pokémon:", error);
  }
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
