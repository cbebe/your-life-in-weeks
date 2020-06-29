export function help() {
  console.log("help");
}

export function about() {
  console.log("about");
}

export function error(command) {
  appendLine(`cbbsh: command not found: ${command}`);
}

export function appendLine(line) {
  const output = document.createElement("div");
  output.innerHTML = line;
  output.classList.add("history");
  container.insertBefore(output, terminal);
}
