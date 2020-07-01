function getTerminal() {
  return document.getElementById("terminal");
}

export function appendLine(line) {
  const output = document.createElement("pre");
  output.innerHTML = line;
  output.classList.add("output");
  container.insertBefore(output, getTerminal());
}

export function printMultiline(message) {
  message.forEach(line => appendLine(line));
}

export function site() {
  handle.appendLine("cbbsh: Going to website... Bye bye!");
  setTimeout(() => (window.location.href = "https://cbebe.xyz"), 1500);
  getTerminal().style.display = "none";
}

export function bruh(isBruh) {
  if (isBruh)
    printMultiline([
      "cbbsh:",
      " _                _",
      "| |__  _ __ _   _| |__",
      "| '_ \\| '__| | | | '_ \\",
      "| |_) | |  | |_| | | | |",
      "|_.__/|_|   \\__,_|_| |_|",
    ]);
  else appendLine("cbbsh: bruh");
}

export function help() {
  printMultiline([
    "about  - About me",
    "github - Go to my Github profile",
    "site - Go to main website",
    "resume - Check out my resumé",
    "contact - Provides contact information",
    "clear  - Clear the terminal screen",
    "  (add `--history` to clear this session's shell history)",
  ]);
}

export function about() {
  printMultiline([
    "Hi! I'm Charles.",
    "I'm a Computer Engineering student and a self-taught web developer.",
    "Feel free to check out my projects on Github by typing `github`!",
  ]);
}

export function error(command) {
  appendLine(`cbbsh: command not found: ${command}`);
}

export function clear() {
  [].forEach.call(document.querySelectorAll(".output"), function (e) {
    e.parentNode.removeChild(e);
  });
}
