import * as handle from "./handlers.js";

const pwd = document.getElementById("pwd");
const container = document.getElementById("container");
const inputBox = document.getElementById("input-box");

const history = [];
let historyIndex = -1;
container.addEventListener("click", () => inputBox.focus());

document.addEventListener("keydown", getInput, false);

function getInput(e) {
  const TABKEY = 9;
  const ENTERKEY = 13;
  const ESCKEY = 27;
  const LKEY = 76;
  const UPKEY = 38;
  const DOWNKEY = 40;
  switch (e.keyCode) {
    case TABKEY:
      e.preventDefault();
      // handle autocompletion?
      break;
    case ENTERKEY:
      enterCommand();
      inputBox.value = "";
      break;
    case ESCKEY:
      e.preventDefault();
      // vi keybindings? lmao
      break;
    case LKEY:
      if (e.ctrlKey) {
        e.preventDefault();
        handle.clear();
      }
      break;
    case UPKEY:
      e.preventDefault();
      if (historyIndex < 0) return;
      inputBox.value = history[historyIndex--];
      historyIndex = Math.max(0, historyIndex);
      break;
    case DOWNKEY:
      e.preventDefault();
      if (historyIndex >= history.length - 1) return;
      inputBox.value = history[++historyIndex];
      historyIndex = Math.min(history.length - 1, historyIndex);
      break;
  }
}

function enterCommand() {
  const command = inputBox.value;
  history.push(command);
  handle.appendLine(`${pwd.innerText} ${command}`);
  historyIndex = history.length - 1;
  processCommand(command);
}

function processCommand(command) {
  const line = command.split(" ");
  switch (line[0]) {
    case "about":
      handle.about();
      break;
    case "github":
      window.open("https://github.com/cbebe", "_blank");
      break;
    case "resume":
      window.open("bruh.txt", "_blank");
      break;
    case "clear":
      if (line.length === 1) handle.clear();
      else if (line[1] === "history") {
        history.splice(0, history.length);
        historyIndex = -1;
      }
      break;
    case "help":
      handle.help();
      break;
    default:
      handle.error(line[0]);
  }
}
