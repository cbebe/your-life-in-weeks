import * as handle from "./handlers.js";

const prompt = document.getElementById("prompt");
const container = document.getElementById("container");
const inputBox = document.getElementById("input-box");

const history = [];

let pwd = "~";
let isBruh = false;
let historyIndex = -1;

container.addEventListener("click", () => inputBox.focus());

document.addEventListener("keydown", specialControls, false);

function updatePrompt() {
  prompt.innerText = `charles@cbebe:${pwd}$ `;
}

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
      historyIndex = Math.min(history.length - 2, historyIndex);
      break;
  }
}

function enterCommand() {
  const command = inputBox.value;
  handle.appendLine(`${prompt.innerText}${command}`);
  if (command !== "") {
    processCommand(command);
    history.push(command);
    historyIndex = history.length - 1;
  }

  if (document.body.scrollHeight > document.body.clientHeight)
    window.scrollTo(0, document.body.scrollHeight);
}

function processCommand(input) {
  const line = input
    .trim()
    .split(" ")
    .filter(arg => arg !== "");

  const command = line.shift();
  switch (command) {
    case "site":
      handle.site();
      break;
    case "about":
      handle.about();
      break;
    case "github":
      handle.appendLine("cbbsh: Opening Github in a new tab...");
      window.open("https://github.com/cbebe", "_blank");
      break;
    case "resume":
      window.open("https://cbebe.xyz/Resume.pdf", "_blank");
      break;
    case "clear":
      if (line.length === 0) handle.clear();
      else if (line[0] === "--history") {
        history.splice(0, history.length);
        historyIndex = -1;
        handle.appendLine("clear: Cleared input history");
      } else handle.appendLine(`clear: unknown option: ${line}`);
      break;
    case "help":
      handle.help();
      break;
    case "ls":
      break;
    case "cd":
      break;
    case "bruh":
      handle.bruh(isBruh);
      isBruh = !isBruh;
      break;
    case "contact":
      handle.appendLine(
        "cbbsh: You can reach me through email at `cancheta@ualberta.ca`"
      );
      break;
    case "history":
      if (history.length) {
        handle.appendLine("history: ");
        handle.printMultiline(history);
      } else handle.appendLine("history: No command history");
      break;
    default:
      handle.error(command);
  }
}
