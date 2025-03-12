function shuffle(src) {
  const copy = [...src];
  const length = copy.length;
  for (let i = 0; i < length; i++) {
    const x = copy[i];
    const y = Math.floor(Math.random() * length);
    const z = copy[y];
    copy[i] = z;
    copy[y] = x;
  }
  return typeof src === 'string' ? copy.join('') : copy;
}

const wordsList = ["apple", "banana", "orange", "grape", "melon", "peach", "cherry", "mango", "lemon", "berry"];
const WINNING_SCORE = 5; // Change this to adjust difficulty

let words = [...wordsList];
let currentWord = "";
let shuffledWord = "";
let score = 0;
let strikes = 0;

function pickNewWord() {
  if (score >= WINNING_SCORE) {
    document.getElementById("game").innerHTML = `<h2>🎉 Congratulations! You won! 🎉</h2>
      <p>Final Score: ${score}</p>
      <button onclick='restartGame()'>Play Again</button>`;
    return;
  }

  if (words.length === 0 || strikes >= 3) {
    document.getElementById("game").innerHTML = `<h2>Game Over!</h2>
      <p>Score: ${score}</p>
      <button onclick='restartGame()'>Play Again</button>`;
    return;
  }

  currentWord = words[Math.floor(Math.random() * words.length)];
  shuffledWord = shuffle(currentWord);
  words = words.filter(word => word !== currentWord);
  document.getElementById("word").innerText = shuffledWord;
}

function handleGuess() {
  let input = document.getElementById("guess").value.toLowerCase();
  if (input === currentWord) {
    score++;
  } else {
    strikes++;
  }
  document.getElementById("score").innerText = `Score: ${score} | Strikes: ${strikes}/3`;
  document.getElementById("guess").value = "";
  pickNewWord();
}

function restartGame() {
  words = [...wordsList];
  score = 0;
  strikes = 0;
  document.getElementById("game").innerHTML = `<h1>Scramble Game</h1>
      <h2 id="word">Loading...</h2>
      <input id="guess" type="text" placeholder="Your guess" />
      <button onclick="handleGuess()">Submit</button>
      <p id="score">Score: 0 | Strikes: 0/3</p>`;
  pickNewWord();
}

document.addEventListener("DOMContentLoaded", pickNewWord);
