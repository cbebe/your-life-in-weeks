const pwd = document.getElementById("pwd");
const container = document.getElementById("container");
const inputBox = document.getElementById("input-box");
const terminal = document.getElementById("terminal");

container.addEventListener("click", () => inputBox.focus());

document.addEventListener("keydown", inputHandler, false);

function inputHandler(e) {
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
  const line = document.createElement("div");
  const command = inputBox.value;
  line.innerHTML = `${pwd.innerText} ${command}`;
  container.insertBefore(line, terminal);
  if (command === "github") {
    window.open("https://github.com/cbebe", "_blank");
  }
}
