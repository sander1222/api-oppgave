async function fetchCards() {
  try {
    document.querySelector("#loading").style.display = "block";
    const response = await fetch(
      `https://api.pokemontcg.io/v2/cards?pageSize=10`
    );
    const data = await response.json();
    document.querySelector("#loading").style.display = "none";
    return data.data;
  } catch (error) {
    console.error("Failed to fetch cards:", error);
    document.querySelector("#loading").textContent = "Failed to load cards.";
    return [];
  }
}

function createCardElement(card) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.innerHTML = `
      <img src="${card.images.small}" alt="${card.name}">
      <h3>${card.name}</h3>
      <p>HP: ${card.hp || "N/A"}</p>
      <p>Type: ${card.types ? card.types[0] : "Unknown"}</p>`;
  return cardDiv;
}

function displayCards(cards, container) {
  cards.forEach((card) => {
    const cardElement = createCardElement(card);
    container.appendChild(cardElement);
  });
}

function battle(card1, card2) {
  const attack1 = parseInt(card1.hp || 0);
  const attack2 = parseInt(card2.hp || 0);
  if (attack1 > attack2) return 1;
  if (attack2 > attack1) return 2;
  return 0;
}

async function initializeGame() {
  const cards = await fetchCards();
  if (!cards.length) return;

  const gameArea = document.querySelector("#game-area");
  const player1Deck = cards.slice(0, 5);
  const player2Deck = cards.slice(5);

  gameArea.innerHTML = "";
  displayCards(player1Deck, gameArea);
  displayCards(player2Deck, gameArea);

  const winner = battle(player1Deck[0], player2Deck[0]);
  console.log(`Winner: Player ${winner}`);
}

document.addEventListener("DOMContentLoaded", initializeGame);

document.querySelector("#game-area").addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    console.log(`You clicked on ${e.target.alt}`);
  }
});

async function fetchCards() {
  try {
    document.querySelector("#loading").style.display = "block";

    // Construct the query string with specific filters for Gardevoir and its subtypes
    const query = "name:gardevoir (subtypes:mega OR subtypes:vmax)";
    const response = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(
        query
      )}&pageSize=10`
    );

    const data = await response.json();
    document.querySelector("#loading").style.display = "none";

    if (data.data) {
      return data.data;
    } else {
      console.error("No cards found");
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch cards:", error);
    document.querySelector("#loading").textContent = "Failed to load cards.";
    return [];
  }
}

function createCardElement(card) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.innerHTML = `
        <img src="${card.images.small}" alt="${card.name}">
        <h3>${card.name}</h3>
        <p>HP: ${card.hp || "N/A"}</p>
        <p>Type: ${card.types ? card.types[0] : "Unknown"}</p>`;
  return cardDiv;
}

function displayCards(cards, container) {
  container.innerHTML = "";
  cards.forEach((card) => {
    const cardElement = createCardElement(card);
    container.appendChild(cardElement);
  });
}

async function initializeGame() {
  const cards = await fetchCards();
  if (!cards.length) return;

  const gameArea = document.querySelector("#game-area");
  displayCards(cards, gameArea);
}

document.addEventListener("DOMContentLoaded", initializeGame);
