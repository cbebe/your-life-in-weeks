import { appendLine } from "./display.js";

function goToLink(link, newTab) {
  if (newTab) window.open(link, "_blank");
  else window.location.href = link;
}

export const site = {
  description: "Go to my main website (coming soon!)",
  visible: true,
  fn: () => {
    appendLine.fn("cbbsh: Going to website... Bye bye!");
    setTimeout(() => goToLink("https://cbebe.xyz"), 1000);
    document.getElementById("terminal").style.display = "none";
  },
};

export const resume = {
  description: "Opens my resumé in a new tab",
  visible: true,
  fn: () => {
    appendLine.fn("cbbsh: Opening resumé in a new tab...");
    goToLink("https://cbebe.xyz/Resume.pdf", true);
  },
};

export const github = {
  description: "Go to my Github profile",
  visible: true,
  fn: () => {
    appendLine.fn("cbbsh: Opening Github in a new tab...");
    goToLink("https://github.com/cbebe", true);
  },
};

export const life = {
  description: "Shows your life in terms of weeks",
  visible: false,
  fn: () => goToLink("https://cbebe.xyz/life/"),
};

export const car = {
  description: "Be scared",
  visible: false,
  fn: () => goToLink("https://www.youtube.com/watch?v=GMgsFZ4rkEI"),
};

export const bruhMoment = {
  description: "Bruh moment",
  visible: false,
  noUse: true,
  fn: () => goToLink("https://www.youtube.com/watch?v=1F6vJzX6LdA", true),
};
