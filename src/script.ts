// DOM
const btn: HTMLButtonElement = document.getElementById(
  "btn-start"
) as HTMLButtonElement;
const modeGame: HTMLSelectElement = document.getElementById(
  "mode"
) as HTMLSelectElement;

// API
const API_URL = "https://random-word-api.vercel.app/api?words=1";

//Games Variables
let word: string;

// Events
btn.addEventListener("click", startGame);

async function startGame(): Promise<void> {
  await getRandomWord();
}

async function getRandomWord(): Promise<void> {
  let response: Response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Response status : ${response.status}`);
  }
  let data: any = await response.json();
  word = data[0];
}
