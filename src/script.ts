// DOM
const btn: HTMLButtonElement = document.getElementById(
  "btn-start"
) as HTMLButtonElement;
const modeGame: HTMLSelectElement = document.getElementById(
  "mode"
) as HTMLSelectElement;
const game: HTMLDivElement = document.querySelector(".game") as HTMLDivElement;
const config: HTMLDivElement = document.querySelector(
  ".config"
) as HTMLDivElement;
const divWord: HTMLDivElement = document.querySelector(
  ".div-word"
) as HTMLDivElement;
const chancesText: HTMLParagraphElement = document.querySelector(
  ".chances-label"
) as HTMLParagraphElement;
const image: HTMLImageElement = document.getElementById(
  "hang-man-pict"
) as HTMLImageElement;

// API
const API_URL = "https://random-word-api.vercel.app/api?words=1";

//Games Variables
let word: string;
let chances: number = 6;
let countFoundLetter: number = 0;
let givenLetters: string[] = [];

// Events
btn.addEventListener("click", startGame);

/**
 * Initializes the game by setting up the game state and fetching a random word.
 */
async function startGame(): Promise<void> {
  config.classList.add("hide");
  await getRandomWord();
  updateChances();
  initHideWord();
  setLevel();
  initLetters();
  image.classList.remove("hide");
}

/**
 * Fetches a random word from the Random Word API.
 */
async function getRandomWord(): Promise<void> {
  let response: Response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Response status : ${response.status}`);
  }
  let data: any = await response.json();
  word = data[0].toUpperCase();
}

/**
 * Initalize letters and assign event the the button
 */

function initLetters() {
  let lettersDiv: HTMLDivElement = document.createElement("div");
  lettersDiv.id = "div_letters";
  let codeAsciiLetterA: number = "A".charCodeAt(0);
  let codeAsciiLetterZ: number = "Z".charCodeAt(0);

  for (let i: number = codeAsciiLetterA; i <= codeAsciiLetterZ; i++) {
    let letter = String.fromCharCode(i);
    let btn = document.createElement("button");
    btn.textContent = letter;
    btn.id = letter;
    if (givenLetters.includes(letter)) {
      btn.classList.add("disable");
    } else {
      btn.addEventListener("click", play);
    }
    lettersDiv?.append(btn);
  }
  game?.append(lettersDiv);
}

/**
 * Initializes the display of the word by creating a series of underscores ("_") for
 * each letter.
 */
function initHideWord() {
  for (let i: number = 0; i < word.length; i++) {
    let p: HTMLParagraphElement = document.createElement("p");
    p.textContent = "_";
    divWord?.append(p);
  }
}

/**
 * Handles the click event for a letter button in the Hangman game.
 * @param {HTMLButtonElement} this - The button clicked by the user, representing the guessed
 */
function play(this: HTMLButtonElement): void {
  let letter: string = this.id;
  this.removeEventListener("click", play);
  this.classList.add("disable");
  if (!word.includes(letter)) {
    chances--;
    image.src = `./assets/images/${chances}.jpg`;
    updateChances();
  } else {
    printGoodLetters(letter);
    checkIfWin();
  }
}

/**
 * Updates the display of remaining chances and checks if the game is over.
 */
function updateChances(): void {
  chancesText!.textContent = `Chances Left : ${chances}`;
  if (chances == 0) gameOver();
}

/**
 * Updates the display by revealing the correct letters in the word.
 * @param letter The correct letter that was guessed by the player.
 */
function printGoodLetters(letter: string): void {
  for (let i: number = 0; i < word.length; i++) {
    if (word[i] === letter) {
      divWord!.childNodes[i].textContent = letter;
      countFoundLetter++;
    }
  }
}

/**
 * Handles the game over state when the player loses the game.
 */
function gameOver(): void {
  showMessage("you lost");
  removesAllLetters();
  setTimeout(() => {}, 4000);
  showAnswer();
}

/**
 * Displays the given message on the screen.
 * @param msg the message to be displayed on the screen
 */
function showMessage(msg: string): void {
  let txt = document.createElement("p");
  txt.textContent = msg;
  game?.append(txt);
}

/**
 * Checks if the player has won the game.
 */
function checkIfWin() {
  if (countFoundLetter == word.length) {
    showMessage("you win");
    removesAllLetters();
  }
}

/**
 * Removes all letters buttons and disables their click events
 */
function removesAllLetters(): void {
  const buttons: any = document.getElementById("div_letters");
  for (let btn of buttons.childNodes) {
    btn.removeEventListener("click", play);
    btn.classList.add("disable");
  }
}

/**
 * Displays the correct answer by revealing all the letters of the word.
 */
function showAnswer(): void {
  for (let i: number = 0; i < word.length; i++) {
    divWord!.childNodes[i].textContent = word[i];
  }
}

/**
 * Sets the level of difficulty for the game.
 */
function setLevel(): void {
  let mode: string = modeGame.value;
  if (mode === "Easy") {
    let nb: number = Math.floor(Math.random() * word.length);
    printGoodLetters(word[nb]);
    givenLetters.push(word[nb]);
  }
}
