const terminal = document.getElementById("terminal");

export function help() {
  [
    "about  - About me",
    "github - Go to my Github profile",
    "resume - Check out my resumé",
    "clear  - Clear the terminal screen",
    "  (add `--history` to clear this session's shell history)",
  ].forEach(line => appendLine(line));
}

export function about() {
  [
    "Hi! I'm Charles.",
    "I'm a Computer Engineering student and a self-taught web developer.",
    "Feel free to check out my projects on Github by typing `github`!",
  ].forEach(line => appendLine(line));
}

export function error(command) {
  appendLine(`cbbsh: command not found: ${command}`);
}

export function appendLine(line) {
  const output = document.createElement("pre");
  output.innerHTML = line;
  output.classList.add("output");
  container.insertBefore(output, terminal);
}

export function clear() {
  [].forEach.call(document.querySelectorAll(".output"), function (e) {
    e.parentNode.removeChild(e);
  });
}
