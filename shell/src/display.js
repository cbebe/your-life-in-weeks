function createElementWithClass(text, type, className) {
  const el = document.createElement(type);
  el.innerHTML = text;
  el.classList.add(className);
  return el;
}

export const appendLine = {
  description: "Prints a single line on the terminal",
  noUse: true,
  visible: false,
  fn: line => {
    const output = createElementWithClass(line, "pre", "output");
    container.insertBefore(output, document.getElementById("terminal"));
  },
};

export const printMultiline = {
  description: "Prints multiple lines on the terminal",
  noUse: true,
  visible: false,
  fn: message => message.forEach(line => appendLine.fn(line)),
};

export const printHelp = {
  description: "Prints list of commands",
  noUse: true,
  visible: false,
  fn: commands => {
    const entries = Object.entries(commands).filter(entry => entry[1].visible);
    for (const entry of entries)
      appendLine.fn(`${entry[0]} - ${entry[1].description}`);
  },
};

export const clearTerminal = {
  description: "Clear the terminal screen",
  noUse: true,
  fn: () =>
    [].forEach.call(document.querySelectorAll(".output"), function (e) {
      e.parentNode.removeChild(e);
    }),
};
