import * as handle from "./handlers.js";

const pwd = document.getElementById("pwd");
const container = document.getElementById("container");
const inputBox = document.getElementById("input-box");
const terminal = document.getElementById("terminal");

container.addEventListener("click", () => inputBox.focus());

document.addEventListener("keydown", getInput, false);

function getInput(e) {
  const TABKEY = 9;
  const ENTERKEY = 13;
  switch (e.keyCode) {
    case TABKEY:
      e.preventDefault();
      // handle autocompletion?
      break;
    case ENTERKEY:
      enterCommand();
      inputBox.value = "";
      break;
  }
}

function enterCommand() {
  const command = inputBox.value;
  handle.appendLine(`${pwd.innerText} ${command}`);
  processCommand(command);
}

function processCommand(command) {
  const line = command.split(" ");
  switch (line[0]) {
    case "github":
      window.open("https://github.com/cbebe", "_blank");
      break;
    case "resume":
      window.open("bruh.txt", "_blank");
    case "about":
      handle.about();
      break;
    case "clear":
      [].forEach.call(document.querySelectorAll(".history"), function (e) {
        e.parentNode.removeChild(e);
      });
      break;
    case "help":
      handle.help();
      break;
    default:
      handle.error(line[0]);
  }
}
