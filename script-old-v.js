//WITH PROPER HOMEWORK -- COPY FINISHED CODE HERE!!!
//DEADLINE 12/06

const BASE_URL = "https://swapi.dev/api/";
//stan apki
let page = 1;
let startingID = 1;
let tableData = "";
let category = "";
let url = "";

// let indexID = "";
// let numberIndex = Number(indexID + 1);

//fetch ogolnego linku z API:
const getData = async () => {
  const response = await fetch(`${BASE_URL}`);
  const data = await response.json();
  return data;
};
//funkcja do siegniecia glebiej:
const getCategory = async (category, page) => {
  const response = await fetch(`${BASE_URL}/${category}/?page=${page}`);
  const data = await response.json();
  const results = data.results;
  return results;
};
//get count of all objects in the category and pagination of the table
// const categoryPagination = async () => {
//   const response = await fetch(`${BASE_URL}/${category}`);
//   const data = await response.json();
//   let allItemsInCategory = data.count;
//   console.log(allItemsInCategory);
//   console.log(typeof allItemsInCategory);

//   const fetchCategory = await getCategory(category, page); // ??
//   let itemsPerPage = Math.floor(fetchCategory.length);
//   console.log("items per Page", itemsPerPage);

//   let pagesTotal = parseInt(Math.ceil(allItemsInCategory / itemsPerPage), 10);
//   console.log(typeof pagesTotal); //number
//   console.log("pages total", pagesTotal);
//   //next
//   const next = document.querySelector(".nextButton");
//   next.addEventListener("click", function () {
//     console.log("works?");
//     if (page < pagesTotal) {
//       page++;
//       createTable();
//     } else {
//       next.disabled = true;
//     }
//   });
// };

// deklaracja podstawowych obiektow
const buttons = document.getElementById("buttons"); //container na buttony
const titleButton = document.getElementsByClassName("titleButton");
const table = document.getElementById("chart");
const prev = document.querySelector(".prevButton");

//stworzenie przyciskow z tytulami kategorii:
const fetchButtons = async () => {
  const data = await getData();
  const titles = Object.keys(data); //nazwy kategorii

  titles.forEach((title) => {
    const $btn = document.createElement("button");
    $btn.innerHTML = title;
    buttons.appendChild($btn);

    //reakcja na klikniecie each $btn - stworzenie tabelki:
    // const createTable = async () => { //zamkniecie od 74 w kolejnej funkcji sprawilo ze inne titles nie dzialaly (tylko 'people')
    $btn.addEventListener("click", async () => {
      page = 1;

      tableData = "";

      const fetchCategory = await getCategory(title, page);
      console.log(fetchCategory);

      // wstrzykniecie naglowkow za pomoca html-a
      if (title == "people") {
        tableData = `<tr>
        <th>ID</th>
        <th>Name</th>
        <th>Skin color</th>
        <th>Birth year</th>
        <th>Created:</th>
      </tr>`;
      } else if (title == "planets") {
        tableData = `<tr>
        <th>ID</th>
        <th>Name</th>
        <th>Climate</th>
        <th>Gravity</th>
        <th>Created:</th>
      </tr>`;
      } else if (title == "films") {
        tableData = `<tr>
        <th>ID</th>
        <th>Title</th>
        <th>Director</th>
        <th>Release date</th>
        <th>Created:</th>
      </tr>`;
      } else if (title == "species") {
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
      table.innerHTML = ""; //"hide"
      table.innerHTML += tableData;

      //wywolanie reszty tabelki:
      fetchCategory.map((values, index) => {
        if (title == "people") {
          const person = new People(
            index + 1,
            values.name,
            values.skin_color,
            values.birth_year,
            values.created
          );

          person.addToState();
          tableData = person.addToTable();
        } else if (title == "planets") {
          const planet = new Planets(
            index + 1,
            values.name,
            values.climate,
            values.gravity,
            values.created
          );
          planet.addToState();

          tableData = planet.addToTable();
        } else if (title == "films") {
          const film = new Films(
            index + 1,
            values.title,
            values.director,
            values.release_date,
            values.created
          );
          film.addToState();
          tableData = film.addToTable();
        } else if (title == "species") {
          const species = new Species(
            index + 1,
            values.name,
            values.classification,
            values.language,
            values.created
          );
          species.addToState();
          tableData = species.addToTable();
        } else {
          const vehicle = new Vroom(
            index + 1,
            values.name,
            values.manufacturer,
            values.cost_in_credits,
            values.created
          );
          vehicle.addToState();
          tableData = vehicle.addToTable();
        }
        table.innerHTML += tableData;
      });

      //get count of all objects in the category and pagination of the table
      const categoryPagination = async (title) => {
        const response = await fetch(`${BASE_URL}/${category}/?page=${page}`); //!!!added a line of code HERE IN CASE STOPPED WORKING!!!
        const data = await response.json();
        let allItemsInCategory = Math.floor(data.count);

        const fetchCategory = await getCategory(category, page); // ??
        let itemsPerPage = Math.floor(fetchCategory.length);

        let pagesTotal = parseInt(
          Math.ceil(allItemsInCategory / itemsPerPage),
          10
        );
        //console.log("pages total", pagesTotal);

        const next = document.querySelector(".nextButton");
        next.addEventListener("click", async function () {
          page = Math.ceil(page + 1);
          tableData = "";
          const fetchCategory = await getCategory(title, page);
          console.log(fetchCategory);

          // wstrzykniecie naglowkow za pomoca html-a
          if (title == "people") {
            tableData = `<tr>
        <th>ID</th>
        <th>Name</th>
        <th>Skin color</th>
        <th>Birth year</th>
        <th>Created:</th>
      </tr>`;
          } else if (title == "planets") {
            tableData = `<tr>
        <th>ID</th>
        <th>Name</th>
        <th>Climate</th>
        <th>Gravity</th>
        <th>Created:</th>
      </tr>`;
          } else if (title == "films") {
            tableData = `<tr>
        <th>ID</th>
        <th>Title</th>
        <th>Director</th>
        <th>Release date</th>
        <th>Created:</th>
      </tr>`;
          } else if (title == "species") {
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
          table.innerHTML = ""; //"hide"
          table.innerHTML += tableData;
          if (page == pagesTotal) {
            next.disabled = true;
          }

          //wywolanie reszty tabelki:
          fetchCategory.map((values, index) => {
            if (title == "people" || page < pagesTotal) {
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
            } else if (title == "planets" || page < pagesTotal) {
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
            } else if (title == "films" || page < pagesTotal) {
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
            } else if (title == "species" || page < pagesTotal) {
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
            } else if{
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
            }
            table.innerHTML += tableData;
          });
        });
      };
      categoryPagination(title);
    });
  });
  // };

  // createTable();
};
fetchButtons();

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
    //idContainer = event.target.closest("row");
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
chartPagination.appendChild(prevButton);
chartPagination.appendChild(clearButton);
chartPagination.appendChild(nextButton);
clearButton.addEventListener("click", function clearTable() {
  const table = document.getElementById("chart");
  table.innerHTML = "";
  const imgDarth = document.getElementById("imgDarth");
  imgDarth.classList.add("active");
  const visibleDartVader = document.querySelector(".active");
  setTimeout(function () {
    imgDarth.classList.remove("active");
  }, 6000);
  // visibleDartVader.addEventListener("click", function burnAndRemove() {
  //   console.log("WORKS");
  // });
});

//paginacja
nextButton.addEventListener("click", async () => {
  page++;
  //dopisac reszte kodu jak uporam sie z details
});

// // classes

// let allItems = "";
// const pagesTotal = Math.ceil(totalItems / pageSize);

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

document.addEventListener("DOMContentLoaded", () => {
  console.log("TEST");
}); //test
const elements = document.querySelectorAll(":contains('NaN-NaN-NaN')");

// Loop through each element and replace the string with '?'
elements.forEach((element) => {
  element.innerHTML = element.innerHTML.replace(/NaN-NaN-NaN/g, "?");
});