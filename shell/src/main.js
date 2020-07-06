import commands from "./commands.js";

const prompt = document.getElementById("prompt");
const container = document.getElementById("container");
const inputBox = document.getElementById("input-box");

let state = {
  history: [],
  pwd: "~",
  isBruh: false,
  historyIndex: -1,
};

container.addEventListener("click", () => inputBox.focus());
inputBox.focus();

commands.intro.fn();

document.addEventListener("keydown", specialControls, false);

function specialControls(e) {
  const TABKEY = 9;
  const ENTERKEY = 13;
  const ESCKEY = 27;
  const LKEY = 76;
  const UPKEY = 38;
  const DOWNKEY = 40;

  switch (e.keyCode) {
    case TABKEY:
      e.preventDefault();
      // handle autocompletion
      break;
    case ENTERKEY:
      e.preventDefault();
      enterCommand();
      inputBox.value = "";
      break;
    case ESCKEY:
      e.preventDefault();
      // vi keybindings lmao
      break;
    case LKEY:
      if (e.ctrlKey) {
        e.preventDefault();
        commands.clearTerminal.fn();
      }
      break;
    case UPKEY:
      e.preventDefault();
      if (state.historyIndex < 0) return;

      inputBox.value = state.history[state.historyIndex--];
      state.historyIndex = Math.max(0, state.historyIndex);
      break;
    case DOWNKEY:
      e.preventDefault();
      if (state.historyIndex >= state.history.length - 1) return;

      inputBox.value = state.history[++state.historyIndex];
      state.historyIndex = Math.min(
        state.history.length - 2,
        state.historyIndex
      );
      break;
  }
}

function enterCommand() {
  const command = inputBox.value;
  commands.appendLine.fn(`${prompt.innerHTML}${command}`);
  if (command !== "") {
    processCommand(command);
    state.history.push(command);
    state.historyIndex = state.history.length - 1;
  }

  if (document.body.scrollHeight > document.body.clientHeight)
    window.scrollTo(0, document.body.scrollHeight);
}

function processCommand(input) {
  const args = input
    .trim()
    .split(" ")
    .filter(arg => arg !== "");

  const command = args.shift();

  // printHelp needs the commands object itself
  if (command === "help") return commands.printHelp.fn(commands);

  const commandToExecute = Object.entries(commands).find(
    entries => entries[0] === command && !entries[1].noUse
  );

  if (commandToExecute) commandToExecute[1].fn(state, args);
  else commands.error.fn(command);
}
