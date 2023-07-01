//DEADLINE 12/06

const BASE_URL = "https://swapi.dev/api/";
//stan
let page = 1;
let tableData = "";
let category = "";
let url = "";

//przyciski previous, next, clear
const chartPagination = document.getElementById("chartPagination");
let prevButton = document.createElement("button");
let prevText = document.createTextNode("< previous");
prevButton.appendChild(prevText);
prevButton.classList.add("prevButton");
let nextButton = document.createElement("button");
let nextText = document.createTextNode("next >");
nextButton.appendChild(nextText);
nextButton.classList.add("nextButton");
let clearButton = document.createElement("button");
let clearTable = document.createTextNode("^ HIDE ^");
clearButton.appendChild(clearTable);
clearButton.disabled = true; // why is this button active by default?
chartPagination.appendChild(prevButton);
chartPagination.appendChild(clearButton);
chartPagination.appendChild(nextButton);

const next = document.querySelector(".nextButton");
const prev = document.querySelector(".prevButton");
// deklaracja innycyh podstawowych obiektow
const buttons = document.getElementById("buttons"); //container na buttony
const titleButton = document.getElementsByClassName("titleButton");
const table = document.getElementById("chart");

//fetch ogolnego linku z API:
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
//funkcja do siegniecia glebiej:
const getCategory = async (category, page) => {
  const url = `${BASE_URL}/${category}?page=${page}`;
  return await fetchData(url);
};

//stworzenie przyciskow z tytulami kategorii:
const fetchButtons = async () => {
  const data = await fetchData(BASE_URL);
  const titles = Object.keys(data); //nazwy kategorii

  titles.forEach((title) => {
    const $btn = document.createElement("button");
    $btn.innerHTML = title;
    $btn.setAttribute("data-title", title);
    buttons.appendChild($btn);
    $btn.classList.add("title");

    $btn.addEventListener("click", async (event) => {
      page = 1;
      tableData = "";
      category = event.target.getAttribute("data-title");
      createTable(category, page);
    });
  });
  next.addEventListener("click", () => {
    page++;
    createTable(category, page);
  });
  prev.addEventListener("click", async () => {
    if (page > 1) {
      page--;
      const categoryData = await getCategory(category, page);
      createTable(category, page, categoryData);
    }
  });
  clearButton.disabled = false;
};
fetchButtons();

const $btn = document.getElementsByClassName("title");

let categoryData;
const createTable = async (category, page) => {
  next.disabled = false;
  categoryData = await getCategory(category, page);
  let results = [];

  if (categoryData.results) {
    results = categoryData.results;
  } else if (categoryData.data) {
    results = categoryData.data;
  }

  let total_pages;
  let totalItems = Math.floor(categoryData.count);
  const pagesPerPage = Math.floor(results.length);
  total_pages = Math.round(Math.ceil(totalItems / pagesPerPage) - 1);

  if (totalItems > 0 && pagesPerPage > 0) {
    total_pages = Math.ceil(totalItems / pagesPerPage);
  }
  console.log(total_pages);

  if (page === 1) {
    prev.disabled = true;
  } else {
    prev.disabled = false;
  }

  if (
    total_pages === undefined ||
    total_pages > 9 ||
    total_pages === NaN ||
    page === total_pages
  ) {
    next.disabled = true;
  }

  let tableData = "";
  //naglowki html-em
  if (category === "people") {
    tableData = `<tr>
        <th>ID</th>
        <th>Name</th>
        <th>Skin color</th>
        <th>Birth year</th>
        <th>Created:</th>
      </tr>`;
  } else if (category === "planets") {
    tableData = `<tr>
        <th>ID</th>
        <th>Name</th>
        <th>Climate</th>
        <th>Gravity</th>
        <th>Created:</th>
      </tr>`;
  } else if (category === "films") {
    tableData = `<tr>
        <th>ID</th>
        <th>Title</th>
        <th>Director</th>
        <th>Release date</th>
        <th>Created:</th>
      </tr>`;
  } else if (category === "species") {
    tableData = `<tr>
        <th>ID</th>
        <th>Name</th>
        <th>Classification</th>
        <th>Language</th>
        <th>Created:</th>
      </tr>`;
  } else {
    tableData = `<tr>
        <th>ID</th>
        <th>Name</th>
        <th>Manufacturer</th>
        <th>Cost in credits</th>
        <th>Created:</th>
      </tr>`;
  }

  const table = document.getElementById("chart");
  table.innerHTML = tableData;

  results.forEach((values, index) => {
    let rowData = "";
    if (category === "people") {
      const person = new People(
        index + 1,
        values.name,
        values.skin_color,
        values.birth_year,
        values.created
      );
      person.addToState();
      const rowData = person.addToTable();
      table.innerHTML += rowData;
    } else if (category === "planets") {
      const planet = new Planets(
        index + 1,
        values.name,
        values.climate,
        values.gravity,
        values.created
      );
      planet.addToState();
      const rowData = planet.addToTable();
      table.innerHTML += planet.addToTable();
    } else if (category === "films") {
      const film = new Films(
        index + 1,
        values.title,
        values.director,
        values.release_date,
        values.created
      );
      film.addToState();
      const rowData = film.addToTable();
      table.innerHTML += film.addToTable();
    } else if (category === "species") {
      const species = new Species(
        index + 1,
        values.name,
        values.classification,
        values.language,
        values.created
      );
      species.addToState();
      const rowData = species.addToTable();
      table.innerHTML += species.addToTable();
    } else if (category === "vehicles") {
      const vehicle = new Vroom(
        index + 1,
        values.name,
        values.manufacturer,
        values.cost_in_credits,
        values.created
      );
      vehicle.addToState();
      const rowData = vehicle.addToTable();
      table.innerHTML += vehicle.addToTable();
    } else {
      const starship = new Starships(
        index + 1,
        values.name,
        values.manufacturer,
        values.cost_in_credits,
        values.created
      );

      starship.addToState();
      const rowData = starship.addToTable();
      table.innerHTML += starship.addToTable();
    }
    table.innerHTML += rowData;
    function replaceNaNStrings() {
      const traversePage = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      while (traversePage.nextNode()) {
        const node = traversePage.currentNode;
        node.textContent = node.textContent.replace("NaN-NaN-NaN", "?");
        node.textContent = node.textContent.replace("-NaN", "?");
        node.textContent = node.textContent.replace("NaN-", "?");
      }
    }
    replaceNaNStrings();
  });

  const validation = document.querySelector(".validation");
  validation.innerHTML = "";
  const pageInfo = document.createElement("div");
  validation.appendChild(pageInfo);

  const selectPage = document.createElement("select");
  selectPage.name = "pages";
  selectPage.id = "select_page";
  const selectByID = document.getElementById("select_page");

  for (let i = 1; i <= total_pages; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectPage.appendChild(option);
  }

  const currentPage = `You are currently on page ${page} out of ${total_pages} ${selectPage.outerHTML} <button id="goToPage">Go to page</button>`;
  pageInfo.innerHTML = currentPage;

  const goToPageButton = document.getElementById("goToPage");
  goToPageButton.addEventListener("click", () => {
    const selectPageElement = document.getElementById("select_page");
    if (selectPageElement) {
      const selectedPage = parseInt(selectPageElement.value);
      console.log(selectedPage);

      createTable(category, selectedPage);
    } else {
      console.error("Select element not found.");
    }
  });
};

// funkcja usuniecia rzedu tabelki
function removeRow(row) {
  row.remove();
}

//DELETE yes/no za pomoca event.target
table.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    const button = event.target;
    const row = event.target.closest("tr");
    const id = event.target.dataset.id;
    const badFeelingSound = document.getElementById("bad-feeling");
    badFeelingSound.play();
    badFeelingSound.volume = 0.5;
    badFeelingSound.speed = 1.2;
    function showModal(id, row) {
      const modal = document.createElement("div"); //stworzenie modala
      modal.classList.add("modal");
      const modalContent = document.createElement("div");
      modalContent.classList.add("modalContent");
      const modalText = `<h2 class="areYouSure">Are you sure?</h2>
      <button class="yes">YES</button>
      <button class="no">NO</button>`;

      modalContent.innerHTML = modalText;
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
      const yesButton = modal.querySelector(".yes");
      const noButton = modal.querySelector(".no");
      const doItSound = document.getElementById("do-it");
      yesButton.addEventListener(
        "mouseover",
        function () {
          doItSound.play();
          doItSound.volume = 0.5;
        },
        false
      );

      if (yesButton) {
        yesButton.addEventListener("click", () => {
          row = button.closest("tr");
          row.remove();
          closeModal(modal); // Close the modal
        });
      }

      if (noButton) {
        noButton.addEventListener("click", () => {
          closeModal(modal); // Close the modal
        });
      }
    }
    showModal(id, row);
  }
});
//funkcja close modal
function closeModal(modal) {
  modal.remove(); // Remove the detailsModal
}

//  DETAILS,
function showDetails(data) {
  const detailsModal = document.createElement("div"); //stworzenie modala na cala strone
  detailsModal.classList.add("detailsModal");
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("detailsContainer");

  const detailsList = document.createElement("div"); //stworzenie divu na liste
  detailsList.classList.add("detailsList");
  const detailsContent = document.createElement("div"); //stworzenie divu na details
  detailsContent.classList.add("detailsContent");

  const formattedJson = JSON.stringify(data, null, 2)
    .replace(/",/g, '",\n')
    .replace(/{/g, "{\n")
    .replace(/}/g, "\n}")
    .replace(/,/g, ",<br>");
  detailsContent.innerHTML = formattedJson;

  const closeButton = document.createElement("button");
  closeButton.classList.add("closeButton");
  closeButton.innerHTML = "X";

  const listText = `Lista czego?`;
  detailsList.innerHTML = listText;
  detailsContainer.appendChild(detailsList);
  detailsContainer.appendChild(detailsContent);
  detailsModal.appendChild(detailsContainer);
  detailsContainer.appendChild(closeButton);
  document.body.appendChild(detailsModal);

  detailsContent.scrollTop = 0;
  //zamkniecie modala x'em
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closeModal(detailsModal);
    });
  }
}

// po kliknięciu w DETAILS wyświetl listę po lewej stronie
// po prawej pokaż rozszerzony widok konkretnego modelu

table.addEventListener("click", async (event) => {
  if (event.target.classList.contains("details")) {
    const row = event.target.closest("tr");
    const idContainer = row.querySelector(".id");
    const numberIndex = idContainer ? parseInt(idContainer.textContent) : null;

    if (!isNaN(numberIndex)) {
      let link = `${BASE_URL}${category}/${numberIndex}`;
      const data = await fetchObjectDetailsById(link);
      showDetails(data);
    }
  }
});
//to fetch details
async function fetchObjectDetailsById(link) {
  console.log(link);
  const response = await fetch(link);
  const responseData = await response.json();
  return responseData;
}

class People {
  constructor(index, name, skin_color, birth_year, created) {
    this.index = index;
    this.name = name;
    this.skin_color = skin_color;
    this.birth_year = birth_year;
    this.created = created;
    this.addToState();
  }
  addToTable() {
    const newDate = new Date(this.created);
    const formattedDate = `${newDate.getDate()}-${newDate.getMonth() + 1}-${
      newDate.getFullYear() % 100
    }`;
    this.created = formattedDate;

    return `
   <tr>
   <td class="id">${this.index}</td>
    <td>${this.name}</td>
    <td>${this.skin_color}</td>
    <td>${this.birth_year}</td>
    <td>${this.created}</td>
    <td><button class="delete" data-id="${this.index}">DELETE</button> <button class="details">DETAILS</button></td>
    </tr>
    `;
  }
  addToState() {
    category = "people";
  }
}

class Planets {
  constructor(index, name, climate, gravity, created) {
    this.index = index;
    this.name = name;
    this.climate = climate;
    this.gravity = gravity;
    this.created = created;
  }
  addToTable() {
    const newDate = new Date(this.created);
    const formattedDate = `${newDate.getDate()}-${newDate.getMonth() + 1}-${
      newDate.getFullYear() % 100
    }`;
    this.created = formattedDate;
    return `
   <tr>
   <td class="id">${this.index}</td>
    <td>${this.name}</td>
    <td>${this.climate}</td>
    <td>${this.gravity}</td>
    <td>${this.created}</td>
    <td><button class="delete" data-id="${this.index}">DELETE</button> <button class="details">DETAILS</button></td>

     </tr>
    `;
  }
  addToState() {
    category = "planets";
  }
}

class Films {
  constructor(index, title, director, release_date, created) {
    this.index = index;
    this.title = title;
    this.director = director;
    this.release_date = release_date;
    this.created = created;
  }
  addToTable() {
    const newDate = new Date(this.created);
    const formattedDate = `${newDate.getDate()}-${newDate.getMonth() + 1}-${
      newDate.getFullYear() % 100
    }`;
    this.created = formattedDate;
    return `
   <tr>
   <td class="id">${this.index}</td>
    <td>${this.title}</td>
    <td>${this.director}</td>
    <td>${this.release_date}</td>
    <td>${this.created}</td>
    <td><button class="delete" data-id="${this.index}">DELETE</button> <button class="details">DETAILS</button></td>

     </tr>
    `;
  }
  addToState() {
    category = "films";
  }
}

class Species {
  constructor(index, name, classification, language, created) {
    this.index = index;
    this.name = name;
    this.classification = classification;
    this.language = language;
    this.created = created;
  }
  addToTable() {
    const newDate = new Date(this.created);
    const formattedDate = `${newDate.getDate()}-${newDate.getMonth() + 1}-${
      newDate.getFullYear() % 100
    }`;
    this.created = formattedDate;

    return `
   <tr>
   <td class="id">${this.index}</td>
    <td>${this.name}</td>
    <td>${this.classification}</td>
    <td>${this.language}</td>
    <td>${this.created}</td>
    <td><button class="delete" data-id="${this.index}">DELETE</button> <button class="details">DETAILS</button></td>

     </tr>
    `;
  }
  addToState() {
    category = "species";
  }
}

class Vroom {
  constructor(index, name, manufacturer, cost_in_credits, created) {
    this.index = index;
    this.name = name;
    this.manufacturer = manufacturer;
    this.cost_in_credits = cost_in_credits;
    this.created = created;
  }
  addToTable() {
    const newDate = new Date(this.created);
    const formattedDate = `${newDate.getDate()}-${newDate.getMonth() + 1}-${
      newDate.getFullYear() % 100
    }`;
    this.created = formattedDate;
    return `
   <tr>
   <td class="id">${this.index}</td>
    <td>${this.name}</td>
    <td>${this.manufacturer}</td>
    <td>₹${this.cost_in_credits}</td>
    <td>${this.created}</td>
    <td><button class="delete" data-id="${this.index}">DELETE</button> <button class="details">DETAILS</button></td>

     </tr>
    `;
  }
  addToState() {
    category = "vehicles";
  }
}

class Starships {
  constructor(index, name, manufacturer, cost_in_credits, created) {
    this.index = index;
    this.name = name;
    this.manufacturer = manufacturer;
    this.cost_in_credits = cost_in_credits;
    this.created = created;
  }
  addToTable() {
    const newDate = new Date(this.created);
    const formattedDate = `${newDate.getDate()}-${newDate.getMonth() + 1}-${
      newDate.getFullYear() % 100
    }`;
    this.created = formattedDate;
    return `
     <tr>
     <td class="id">${this.index}</td>
      <td>${this.name}</td>
      <td>${this.manufacturer}</td>
      <td>₹${this.cost_in_credits}</td>
      <td>${this.created}</td>
      <td><button class="delete" data-id="${this.index}">DELETE</button> <button class="details">DETAILS</button></td>
  
       </tr>
      `;
  }
  addToState() {
    category = "starships";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("TEST");
}); //test

//clearButton fun:
clearButton.addEventListener("click", function () {
  const table = document.getElementById("chart");
  table.innerHTML = "";
  const validation = document.querySelector(".validation");

  clearButton.innerHTML = "PRESS TO PLAY DARTH VADER HUNT";
  clearButton.classList.toggle("play");

  const playButton = document.querySelector(".play");

  if (clearButton.classList.contains("play")) {
    playButton.addEventListener("click", () => {
      const funBeginsSound = document.getElementById("fun-begins");
      funBeginsSound.play();
      const playPitch = document.createElement("div");
      playPitch.classList.add("playPitch");
      const closeGame = document.createElement("button");
      closeGame.id = "closeGame";
      closeGame.innerText = "X";
      closeGame.addEventListener("click", function () {
        playPitch.remove();
      });
      playPitch.appendChild(closeGame);
      document.body.appendChild(playPitch);
      const startGameBtn = document.createElement("button");
      startGameBtn.innerText = `GO!`;
      playPitch.appendChild(startGameBtn);
      const lightsaberSound = document.getElementById("lightsaber");
      playPitch.addEventListener("click", function () {
        lightsaberSound.play();
        lightsaberSound.volume = 0.2;
      });
      startGameBtn.addEventListener("click", function playNow() {
        startGameBtn.remove();
        const imgDarth = document.getElementById("imgDarth");
        imgDarth.classList.add("active");
        const visibleDartVader = document.querySelector(".active");
        playPitch.appendChild(imgDarth);
        visibleDartVader.addEventListener("click", () => {
          console.log("Clicked!");

          playPitch.textContent = "LUKE.. I'M YOUR FATHER";
          imgDarth.classList.remove("active");
          const fatherSound = document.getElementById("father");
          fatherSound.play();
          setTimeout(function () {
            playPitch.style.display = "none";
            window.location.reload();
          }, 4000);
        });
      });
    });
  }
});
