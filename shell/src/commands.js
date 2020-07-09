import * as link from "./links.js";
import * as display from "./display.js";

function unknownOptions(command, args) {
  display.appendLine.fn(
    `${command}: unknown option:${args.map(arg => ` ${arg}`)}`
  );
}

const bruh = {
  description: "bruh",
  visible: false,
  fn: (state, args) => {
    if (args.length !== 0) {
      if (args[0] === "moment") {
        display.appendLine.fn("cbbsh: bruh moment");
        link.bruhMoment();
      } else unknownOptions("bruh", args);

      return;
    }
    if (state.isBruh)
      display.printMultiline.fn([
        "cbbsh:",
        " _                _",
        "| |__  _ __ _   _| |__",
        "| '_ \\| '__| | | | '_ \\",
        "| |_) | |  | |_| | | | |",
        "|_.__/|_|   \\__,_|_| |_|",
      ]);
    else display.appendLine.fn("cbbsh: bruh");
    state.isBruh = !state.isBruh;
  },
};

const about = {
  description: "About me",
  visible: true,
  fn: () => {
    display.printMultiline.fn([
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
  fn: command => display.appendLine.fn(`cbbsh: command not found: ${command}`),
};

const intro = {
  description: "reprint the intro",
  visible: true,
  fn: () => {
    display.printMultiline.fn([
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

const cd = {
  description: "Change directory",
  visible: false,
  fn: (state, args) => {
    if (args.length > 1) display.appendLine.fn("cbbsh: cd: too many arguments");
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
  fn: () =>
    display.appendLine.fn(
      "cbbsh: You can reach me through email at `cancheta@ualberta.ca`"
    ),
};

const history = {
  description: "Prints command history",
  visible: true,
  fn: state => {
    if (state.history.length) {
      display.appendLine.fn("history: ");
      display.printMultiline.fn(history);
    } else display.appendLine.fn("history: No command history");
  },
};

const clear = {
  description: "Clears terminal screen / command history (--history)",
  visible: true,
  fn: (state, args) => {
    if (args.length === 0) display.clearTerminal.fn();
    else if (args[0] === "--history") {
      state.history.splice(0, state.history.length);
      state.historyIndex = -1;
      display.appendLine.fn("clear: Cleared input history");
    } else unknownOptions("clear", args);
  },
};

const commands = {
  about,
  ...link,
  ...display,
  cd,
  intro,
  clear,
  error,
  bruh,
  history,
  contact,
};

export default commands;
