(() => {
  const grid = document.getElementById("grid");
  const dateInput = document.getElementById("birth");
  const weekStatement = document.getElementById("weeks");
  const dobForm = document.getElementById("date-of-birth");

  const WEEK_IN_MS = 1000 * 3600 * 24 * 7;
  const YEARS = 80;
  const NUMBER_OF_WEEKS = 52 * YEARS;
  const LIFESPAN = WEEK_IN_MS * NUMBER_OF_WEEKS;
  let birth;
  let pastWeeksLived;
  let weeksLived;
  let today = new Date();

  function update() {
    if (weeksLived != null) {
      pastWeeksLived = weeksLived;
    }

    birth = new Date(dateInput.value);
    weeksLived = Math.floor((today - birth) / WEEK_IN_MS);
    updateWeekStatement(weeksLived);
    unhighlightCells(grid, 0, pastWeeksLived);
    highlightCells(grid, 0, weeksLived);
  }
  function updateWeekStatement(weeks) {
    const uOld =
      weeks === NUMBER_OF_WEEKS
        ? ", and you're still going. Congrats!"
        : `. You have ${
            NUMBER_OF_WEEKS - weeks
          } weeks left. Are you spending them well?`;
    weekStatement.innerHTML = `So far, you have lived ${weeks} out of ${NUMBER_OF_WEEKS} weeks${uOld}`;
  }

  function appendCell(grid) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
  }

  function highlightCells(grid, head, tail) {
    const pastWeeks = Array.from(grid.children).slice(head, tail);
    pastWeeks.forEach(cell => {
      cell.classList.add("past");
    });
  }

  function unhighlightCells(grid, head, tail) {
    const futureWeeks = Array.from(grid.children).slice(head, tail);
    futureWeeks.forEach(cell => {
      cell.classList.remove("past");
    });
  }

  function zeroPad(num, places) {
    return String(num).padStart(places, "0");
  }

  function getStringfromDate(date) {
    const year = date.getFullYear();
    const month = zeroPad(date.getMonth() + 1, 2);
    const day = zeroPad(date.getDate(), 2);
    return `${year}-${month}-${day}`;
  }

  // create grid
  for (let i = 0; i < NUMBER_OF_WEEKS; i++) appendCell(grid);

  const oldestDate = new Date(today - LIFESPAN);

  dateInput.min = getStringfromDate(oldestDate);
  dateInput.max = getStringfromDate(today);

  dobForm.addEventListener("submit", e => {
    e.preventDefault();
    update();
  });

  update();
})();
