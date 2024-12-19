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
  ".div-word"
) as HTMLParagraphElement;

// API
const API_URL = "https://random-word-api.vercel.app/api?words=1";

//Games Variables
let word: string;
let chances: number = 6;

// Events
btn.addEventListener("click", startGame);

async function startGame(): Promise<void> {
  config.classList.add("hide");
  await getRandomWord();
  initHideWord();
  initLetters();
}

async function getRandomWord(): Promise<void> {
  let response: Response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Response status : ${response.status}`);
  }
  let data: any = await response.json();
  word = data[0];
}

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
    btn.addEventListener("click", play);
    lettersDiv?.append(btn);
  }
  game?.append(lettersDiv);
}

function initHideWord() {
  console.log(word);
  for (let i: number = 0; i < word.length; i++) {
    let div: HTMLDivElement = document.createElement("div");
    let p: HTMLParagraphElement = document.createElement("p");
    p.textContent = "_";
    div.append(p);
    divWord?.append(div);
  }
}

function play(this: HTMLButtonElement): void {
  let letter: string = this.id;
  this.removeEventListener("click", play);
  this.classList.add("disable");

  if (!word.includes(letter)) {
    chances--;
    updateChances();
  } else {
    // TODO print letters
  }
}

function updateChances(): void {
  chancesText!.textContent = `Chances Left : ${chances}`;
  if (chances == 0) gameOver();
}

function gameOver(): void {}
