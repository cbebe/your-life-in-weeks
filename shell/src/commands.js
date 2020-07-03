function getTerminal() {
  return document.getElementById("terminal");
}

function createElementWithClass(text, type, className) {
  const el = document.createElement(type);
  el.innerHTML = text;
  el.classList.add(className);
  return el;
}

const appendLine = {
  description: "Prints a single line on the terminal",
  noUse: true,
  visible: false,
  fn: line => {
    const output = createElementWithClass(line, "pre", "output");
    container.insertBefore(output, getTerminal());
  },
};

const printMultiline = {
  description: "Prints multiple lines on the terminal",
  noUse: true,
  visible: false,
  fn: message => {
    message.forEach(line => appendLine.fn(line));
  },
};

const github = {
  description: "Go to my Github profile",
  visible: true,
  fn: () => {
    appendLine.fn("cbbsh: Opening Github in a new tab...");
    window.open("https://github.com/cbebe", "_blank");
  },
};

const site = {
  description: "Go to my main website (coming soon!)",
  visible: true,
  fn: () => {
    appendLine.fn("cbbsh: Going to website... Bye bye!");
    setTimeout(() => (window.location.href = "https://cbebe.xyz"), 1500);
    getTerminal().style.display = "none";
  },
};

const bruh = {
  description: "bruh",
  visible: false,
  fn: (state, args) => {
    if (state.isBruh)
      printMultiline.fn([
        "cbbsh:",
        " _                _",
        "| |__  _ __ _   _| |__",
        "| '_ \\| '__| | | | '_ \\",
        "| |_) | |  | |_| | | | |",
        "|_.__/|_|   \\__,_|_| |_|",
      ]);
    else appendLine.fn("cbbsh: bruh");
    state.isBruh = !state.isBruh;
  },
};

const printHelp = {
  description: "Prints list of commands",
  noUse: true,
  visible: false,
  fn: commands => {
    const entries = Object.entries(commands).filter(entry => entry[1].visible);
    for (const entry of entries)
      appendLine.fn(`${entry[0]} - ${entry[1].description}`);
  },
};

const about = {
  description: "About me",
  visible: true,
  fn: () => {
    printMultiline.fn([
      "Hi! I'm Charles.",
      "I'm a Computer Engineering student and a self-taught web developer.",
      "Feel free to check out my projects on Github by typing `github`!",
    ]);
  },
};

const error = {
  description: "Print error message",
  noUse: true,
  visible: false,
  fn: command => {
    appendLine.fn(`cbbsh: command not found: ${command}`);
  },
};

const clearTerminal = {
  description: "Clear the terminal screen",
  noUse: true,
  fn: () => {
    [].forEach.call(document.querySelectorAll(".output"), function (e) {
      e.parentNode.removeChild(e);
    });
  },
};

const intro = {
  description: "reprint the intro",
  visible: true,
  fn: () => {
    printMultiline.fn([
      "      _          _",
      "  ___| |__   ___| |__   ___  __  ___   _ ____",
      " / __| '_ \\ / _ \\ '_ \\ / _ \\ \\ \\/ / | | |_  /",
      "| (__| |_) |  __/ |_) |  __/_ >  <| |_| |/ /",
      " \\___|_.__/ \\___|_.__/ \\___(_)_/\\_\\\\__, /___|",
      "                                   |___/",
      "Charles Ancheta's Cbebe shell",
      " ",
      "Type `help` + ENTER to see a list of commands.",
    ]);
  },
};

const resume = {
  description: "Opens my resumé in a new tab",
  visible: true,
  fn: () => {
    appendLine.fn("cbbsh: Opening resumé in a new tab...");
    window.open("https://cbebe.xyz/Resume.pdf", "_blank");
  },
};

const cd = {
  description: "Change directory",
  visible: false,
  fn: (state, args) => {
    if (args.length > 1) appendLine.fn("cbbsh: cd: too many arguments");
    else {
      const dir = args[0];
      const pwd = document.querySelector("#prompt > span.blue");
      pwd.innerHTML = dir ? `~/${dir}` : "~";
      state.pwd = pwd.innerHTML;
    }
  },
};

const contact = {
  description: "Show contact information",
  visible: true,
  fn: () => {
    appendLine.fn(
      "cbbsh: You can reach me through email at `cancheta@ualberta.ca`"
    );
  },
};

const history = {
  description: "Prints command history",
  visible: true,
  fn: state => {
    if (state.history.length) {
      appendLine.fn("history: ");
      printMultiline.fn(history);
    } else appendLine.fn("history: No command history");
  },
};

const clear = {
  description: "Clears terminal screen / command history (--history)",
  visible: true,
  fn: (state, args) => {
    if (args.length === 0) clearTerminal.fn();
    else if (args[0] === "--history") {
      state.history.splice(0, state.history.length);
      state.historyIndex = -1;
      commands.appendLine.fn("clear: Cleared input history");
    } else commands.appendLine.fn(`clear: unknown option: ${args}`);
  },
};

const commands = {
  about,
  cd,
  site,
  intro,
  clearTerminal,
  clear,
  error,
  printHelp,
  bruh,
  printMultiline,
  appendLine,
  github,
  resume,
  history,
  contact,
};

export default commands;
