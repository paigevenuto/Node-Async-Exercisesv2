let pile = $("#pile");
let numberFacts = $("#numberfacts");
let draw = $("#drawCard");
let faveNum = "42";
let deck;
let pileCount = 0;

async function makeFacts() {
  for (let i = 1; i < 5; i++) {
    let newFact = await axios.get(`http://numbersapi.com/${faveNum}`);
    numberFacts.append(`<li>${newFact.data}</li>`);
  }
}

async function newDeck() {
  let newDeck = await axios
    .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .catch((err) => console.log(`ERROR: ${err}`));
  deck = newDeck.data;
}

async function getCard() {
  if (pileCount < 52 && deck) {
    let response = await axios
      .get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw`)
      .catch((err) => console.log(`ERROR: ${err}`));
    genCard(response);
  }
}

function genCard(response) {
  let card = response.data.cards[0];
  console.log(`${card.value} of ${card.suit}`);
  pileCount++;
  let newCard = document.createElement("img");
  newCard.setAttribute("src", card.image);
  newCard.classList.add("playingCard");

  let degrees = Math.floor(45 - (Math.random() * 90 + 1));
  $(newCard).css("transform", `rotate(${degrees}deg)`);

  pile.append(newCard);
}

makeFacts();
newDeck();

draw.click(getCard);
