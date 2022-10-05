document.addEventListener("DOMContentLoaded", () => {
  const cardsArr = [
    {
      name: "blogs",
      img: "images/kottans-mail.png",
    },
    {
      name: "files",
      img: "images/kottans-map.png",
    },
    {
      name: "mail",
      img: "images/kottans-mars.png",
    },
    {
      name: "map",
      img: "images/kottans-photo.png",
    },
    {
      name: "mars",
      img: "images/kottans-translate.png",
    },
    {
      name: "news",
      img: "images/kottans-videos.png",
    },
  ];

  const doubleCardsArr = [...cardsArr, ...cardsArr];

  // get random arr sort from https://css-tricks.com/snippets/javascript/shuffle-array/
  doubleCardsArr.sort(function () {
    return 0.5 - Math.random();
  });

  const field = document.querySelector(".field");
  let flippedCards = [];
  let flippedCardsId = [];
  let cardsWon = [];

  function newGame() {
    for (let i = 0; i < doubleCardsArr.length; i++) {
      let card = document.createElement("img");
      card.setAttribute("src", "images/kottans-black.png");
      card.setAttribute("card-id", i);
      card.addEventListener("click", flipcard);
      field.appendChild(card);
    }
  }

  function checkForEquality() {
    let cards = document.querySelectorAll("img");
    const optionOneId = flippedCardsId[0];
    const optionTwoId = flippedCardsId[1];
    if (flippedCards[0] === flippedCards[1]) {
      if (optionOneId === optionTwoId) {
        // if clicked on the same card
        cards[optionOneId].setAttribute("src", "images/kottans-black.png");
        cards[optionTwoId].setAttribute("src", "images/kottans-black.png");
      } else if (flippedCards[0] === flippedCards[1]) {
        // if found a match
        cards[optionOneId].setAttribute("src", "images/kottans-white.png");
        cards[optionTwoId].setAttribute("src", "images/kottans-white.png");
        cards[optionOneId].removeEventListener("click", flipcard);
        cards[optionTwoId].removeEventListener("click", flipcard);
        cardsWon.push(flippedCards);
      }
    } else {
      // if not match
      cards[optionOneId].setAttribute("src", "images/kottans-black.png");
      cards[optionTwoId].setAttribute("src", "images/kottans-black.png");
    }
    flippedCards = [];
    flippedCardsId = [];
    if (cardsWon.length === doubleCardsArr.length / 2) {
      pauseWatch();
      let timeOfGame = document.querySelector(".watch");
      function playAgain() {
        let result = "";
        result = `
        <div class="new_game_div">
        <h2>You win! <br> Your time: ${timeOfGame.innerText}</h2>
        <div class="div_with_btn"><button class="btn_new-game" id="btn_new-game">Play again</button></div>
        </div> `;
        document.getElementById("wrapper").innerHTML = result;

        document
          .getElementById("btn_new-game")
          .addEventListener("click", playAgain);

        function playAgain() {
          // check setTimeout
          setTimeout(window.location.reload.bind(window.location), 3);
        }
      }
      playAgain();
    }
  }

  function flipcard() {
    startWatch();
    let cardId = this.getAttribute("card-id");
    flippedCards.push(doubleCardsArr[cardId].name);
    flippedCardsId.push(cardId);
    this.setAttribute("src", doubleCardsArr[cardId].img);
    if (flippedCards.length === 2) {
      setTimeout(checkForEquality, 500);
    }
  }

  newGame();
});

// ------------------------------------------------------------------------

// stopwatch

const watch = document.querySelector("#watch");
let milliseconds = 0;
let timer;

const startWatch = () => {
  watch.classList.remove("paused");
  clearInterval(timer);
  timer = setInterval(() => {
    milliseconds += 10;
    let dateTimer = new Date(milliseconds);
    watch.innerHTML =
      ("0" + dateTimer.getUTCHours()).slice(-2) +
      ":" +
      ("0" + dateTimer.getUTCMinutes()).slice(-2) +
      ":" +
      ("0" + dateTimer.getUTCSeconds()).slice(-2) +
      ":" +
      ("0" + dateTimer.getUTCMilliseconds()).slice(-3, -1);
  }, 10);
};

const pauseWatch = () => {
  watch.classList.add("paused");
  clearInterval(timer);
};

const resetWatch = () => {
  watch.classList.remove("paused");
  clearInterval(timer);
  milliseconds = 0;
  watch.innerHTML = "00:00:00:00";
};
