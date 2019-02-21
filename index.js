const cardsImage = [
  "batman",
  "superman",
  "flash",
  "deadpool",
  "wolverine",
  "lantern",
  "iron-man",
  "cap",
  "punisher",
  "batman",
  "superman",
  "flash",
  "deadpool",
  "wolverine",
  "lantern",
  "iron-man",
  "cap",
  "punisher"
];

let cards = document.querySelectorAll(".square");
cards = [...cards];

let activeCard = "";
const activeCards = [];
let gameResults = 0;
const gamePairs = cardsImage.length / 2;
let startTime = "";

const popUpStart = document.querySelector(".start");
const btn = document.querySelector(".start button");
const showTime = document.querySelector(".timeGame");
const popUpEnd = document.querySelector(".showResult");
const wrap = document.querySelector(".wrap");

const clickCard = function() {
  activeCard = this;
  if (activeCard == activeCards[0]) return;
  activeCard.classList.remove("hidden");
  if (activeCards.length === 0) {
    activeCards[0] = activeCard;
  } else {
    cards.forEach(card => card.removeEventListener("click", clickCard));
    activeCards[1] = activeCard;
    setTimeout(() => {
      if (activeCards[0].className == activeCards[1].className) {
        activeCards.forEach(card => card.classList.add("off"));
        gameResults++;
        cards = cards.filter(card => !card.classList.contains("off"));
        if (gameResults == gamePairs) {
          const endTime = new Date().getTime();
          const gameTime = ((endTime - startTime) / 1000).toFixed(2);
          popUpEnd.classList.add("offResult");
          showTime.textContent = `Your time: ${gameTime}s!!!`;
          wrap.classList.add("black");
          setTimeout(() => {
            location.reload();
            popUpEnd.classList.remove("offResult");
          }, 3500);
        }
      } else {
        cards.forEach(card => card.classList.add("hidden"));
      }
      activeCard = "";
      activeCards.length = 0;
      cards.forEach(card => card.addEventListener("click", clickCard));
    }, 300);
  }
};

const init = () => {
  startTime = new Date().getTime();
  cards.forEach(card => {
    const indexImage = Math.floor(Math.random() * cardsImage.length);
    card.classList.add(cardsImage[indexImage]);
    cardsImage.splice(indexImage, 1);
  });
  setTimeout(() => {
    cards.forEach(card => {
      card.classList.add("hidden");
      card.addEventListener("click", clickCard);
    });
  }, 3500);
};

const btnStart = () => {
  btn.classList.add("startGame");
  popUpStart.classList.add("gameOn");
  setTimeout(() => {
    popUpStart.classList.add("offStart");
  }, 1200);
  init();
};

btn.addEventListener("click", btnStart);
