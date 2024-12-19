// DOM
const btn: HTMLButtonElement = document.getElementById(
  "btn-start"
) as HTMLButtonElement;
const modeGame: HTMLSelectElement = document.getElementById(
  "mode"
) as HTMLSelectElement;

// Events
btn.addEventListener("click", startGame);

function startGame(): void {
    console.log(modeGame.value)
}
