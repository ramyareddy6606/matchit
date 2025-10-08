const emojis = ["😀", "😎", "😀", "😎"];
let firstCard, secondCard;
let lockBoard = false;

function startGame() {
  document.getElementById("home").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";
  loadGame();
}

function loadGame() {
  const grid = document.getElementById("grid");
  const shuffled = emojis.sort(() => 0.5 - Math.random());

  shuffled.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${emoji}</div>
        <div class="card-back">❓</div>
      </div>
    `;
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

  if (isMatch) {
    document.getElementById("message").textContent = "🎉 You Won the Game!";
    resetBoard();
  } else {
    document.getElementById("message").textContent = "❌ You Lost the Match!";
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
