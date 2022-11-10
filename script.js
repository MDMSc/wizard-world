const baseUrl = "https://wizard-world-api.herokuapp.com";

// main container
const div_container = document.createElement("div");
div_container.setAttribute("class", "container div__container");
div_container.innerHTML = `
    <h1 class="text-center">Wizard World</h1>
    <h3 class="text-center">Select any <b>One(1)</b> of the following</h3>
`;

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

// select
const select = document.createElement("select");
setAttributes(select, {
  "class": "select__categories",
  "aria-label": "categories",
  "name": "category",
  "onchange": "getCategoryList()",
});
select.innerHTML = `
    <option value="0" disabled selected>Select a category</option>
    <option value="elixirs">Elixirs</option>
    <option value="houses">Houses</option>
    <option value="spells">Spells</option>
    <option value="wizards">Wizards</option>
`;

// result label
const h3_result = document.createElement("h3");
h3_result.innerText = "Results";

// results
const div_result = document.createElement("div");
div_result.setAttribute("class", "div__result");

// results - list
const div_view = document.createElement("div");
div_view.setAttribute("class", "div__view");

// results - list - ul
const ul = document.createElement("ul");
ul.setAttribute("class", "list-group list-group-flush");
ul.innerHTML = `<li class="list-group-item">Get a list of items from the selected category <b>HERE</b></li>`

// results - details
const div_view_details = document.createElement("div");
div_view_details.setAttribute("class", "div__view div__view_details");
div_view_details.innerHTML = `<span class="data__text">Get selected item details <b>HERE</b></span>`;

div_view.appendChild(ul);
div_result.append(div_view, div_view_details);
div_container.append(select, h3_result, div_result);

let data;
async function getCategoryList() {
  ul.innerHTML = "";
  div_view_details.innerHTML = "";
  try {
    const response = await fetch(
      `${baseUrl}/${select.selectedOptions[0].value}`
    );
    data = await response.json();
    switch (select.selectedOptions[0].value) {
      case "elixirs":
        data.map(
          (item, index) =>
            (ul.innerHTML += `<li class="list-group-item li__item" key="${item.id}" value="${item.name}" onclick="showElixir(${index})">${item.name}</li>`)
        );
        break;
      case "houses":
        data.map(
          (item, index) =>
            (ul.innerHTML += `<li class="list-group-item li__item" key="${item.id}" value="${item.name}" onclick="showHouse(${index})">${item.name}</li>`)
        );
        break;
      case "spells":
        data.map(
          (item, index) =>
            (ul.innerHTML += `<li class="list-group-item li__item" key="${item.id}" value="${item.name}" onclick="showSpell(${index})">${item.name}</li>`)
        );
        break;
      case "wizards":
        data.map(
          (item, index) =>
            (ul.innerHTML += `<li class="list-group-item li__item" key="${
              item.id
            }" value="${item.name}" onclick="showWizard(${index})">
            ${item.firstName !== null ? item.firstName : ""}
            ${item.lastName !== null ? item.lastName : ""}
            </li>`)
        );
        break;
      default:
        break;
    }
  } catch (error) {
    div_result.innerHTML = `<p class="error">${error.message}</p>`;
  }
}

function showElixir(index) {
  div_view_details.innerHTML = `
        <p class="title"><b>${data[index].name}</b></p>
        <p>Effect: <span class="data__text">${
          data[index].effect !== null ? data[index].effect : "NIL"
        }</span></p>
        <p>Side Effects: <span class="data__text">${
          data[index].sideEffects !== null ? data[index].sideEffects : "NIL"
        }</span></p>
        <p>Characteristics: <span class="data__text">${
          data[index].characteristics !== null
            ? data[index].characteristics
            : "NIL"
        }</span></p>
        <p>Difficulty: <span class="data__text">${
          data[index].difficulty !== null ? data[index].difficulty : "NIL"
        }</span></p>
        <p>Ingredients: <span class="data__text">${
          data[index].ingredients.length
            ? data[index].ingredients.map((ing) => '"' + ing.name + '"' + " ")
            : "NIL"
        }</span></p>
        <p>Inventors: <span class="data__text">${
          data[index].inventors.length
            ? data[index].inventors.map(
                (inv) =>
                  ` ${inv.firstName !== null ? inv.firstName : ""} ${
                    inv.lastName !== null ? inv.lastName : ""
                  }`
              )
            : "NIL"
        }</span></p>
        <p>Manufacturer: <span class="data__text">${
          data[index].manufacturer !== null ? data[index].manufacturer : "NIL"
        }</span></p>
    `;
}

function showHouse(index) {
  div_view_details.innerHTML = `
        <p class="title"><b>${data[index].name}</b></p>
        <p>House Colours: <span class="data__text">${
          data[index].houseColours !== null ? data[index].houseColours : "NIL"
        }</span></p>
        <p>Founder: <span class="data__text">${
          data[index].founder !== null ? data[index].founder : "NIL"
        }</span></p>
        <p>Animal: <span class="data__text">${
          data[index].animal !== null ? data[index].animal : "NIL"
        }</span></p>
        <p>Element: <span class="data__text">${
          data[index].element !== null ? data[index].element : "NIL"
        }</span></p>
        <p>Ghost: <span class="data__text">${
          data[index].ghost !== null ? data[index].ghost : "NIL"
        }</span></p>
        <p>Heads: <span class="data__text">${
          data[index].heads.length
            ? data[index].heads.map(
                (head) =>
                  ` ${head.firstName !== null ? head.firstName : ""} ${
                    head.lastName !== null ? head.lastName : ""
                  }`
              )
            : "NIL"
        }</span></p>
        <p>Traits: <span class="data__text">${
          data[index].traits.length
            ? data[index].traits.map((trait) => '"' + trait.name + '"' + " ")
            : "NIL"
        }</span></p>
        <p>Common Room: <span class="data__text">${
          data[index].commonRoom !== null ? data[index].commonRoom : "NIL"
        }</span></p>
    `;
}

function showSpell(index) {
  div_view_details.innerHTML = `
        <p class="title"><b>${data[index].name}</b></p>
        <p>Incantation: <span class="data__text">${
          data[index].incantation !== null ? data[index].incantation : "NIL"
        }</span></p>
        <p>Effect: <span class="data__text">${
          data[index].effect !== null ? data[index].effect : "NIL"
        }</span></p>
        <p>Type: <span class="data__text">${
          data[index].type !== null ? data[index].type : "NIL"
        }</span></p>
        <p>Light: <span class="data__text">${
          data[index].light !== null ? data[index].light : "NIL"
        }</span></p>
        <p>Creator: <span class="data__text">${
          data[index].creator !== null ? data[index].creator : "NIL"
        }</span></p>
    `;
}

function showWizard(index) {
  div_view_details.innerHTML = `
        <p class="title"><b>${
          data[index].firstName !== null ? data[index].firstName : ""
        } ${data[index].lastName !== null ? data[index].lastName : ""}</b></p>
        <p>Elixirs: <span class="data__text">${
          data[index].elixirs.length
            ? data[index].elixirs.map((elixir) => '"' + elixir.name + '"' + " ")
            : "NIL"
        }</span></p>
    `;
}

document.body.append(div_container);
