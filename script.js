// Elements retrieved

const mainContainer = document.getElementById("main-container");
const headerContainer = document.getElementById("header-container");
const resultsContainer = document.getElementById("results-container");
const content = document.getElementById("content");
const addBookBtn = document.getElementsByClassName("btn")[0];
const bookBoxHTML = document.getElementById("bookbox");
const searchContainer = document.getElementById("search-container");

// Elements created

const searchBtnsContainer = document.createElement("div");
const searchForm = document.createElement("form");
const titleInput = document.createElement("input");
const authorInput = document.createElement("input");
const titleResults = document.createElement("h2");
const labelInputTitle = document.createElement("label");
const labelInputAuthor = document.createElement("label");
const searchBtn = document.createElement("button");
const cancelBtn = document.createElement("button");

searchForm.setAttribute("class", "form-group");
titleInput.setAttribute("type", "text");
titleInput.setAttribute("class", "block-search__inputbox");
titleInput.setAttribute("id", "titleInput");
labelInputTitle.setAttribute("for", "titleInput");
authorInput.setAttribute("type", "text");
authorInput.setAttribute("class", "block-search__inputbox");
authorInput.setAttribute("id", "authorInput");
labelInputAuthor.setAttribute("for", "authorInput");
searchBtnsContainer.setAttribute("class", "block-search-buttons");
searchBtn.setAttribute("class", "block-search__btn");
cancelBtn.setAttribute("class", "block-search__btn red");

// InnerHTML

titleResults.innerHTML = "Search Results";
labelInputAuthor.innerHTML = "Author";
labelInputTitle.innerHTML = "Title";
searchBtn.innerHTML = "Search";
cancelBtn.innerHTML = "Cancel";

//Event Listeners

const pageBtnsDiv = document.createElement("div");
pageBtnsDiv.classList.add("page-btns-container");
const nextBtn = document.createElement("button");
nextBtn.class = "page-btn";
nextBtn.innerHTML = "next >>";
const prevBtn = document.createElement("button");
prevBtn.class = "page-btn";
prevBtn.innerHTML = "<< back";
pageBtnsDiv.appendChild(prevBtn);
pageBtnsDiv.appendChild(nextBtn);

const URLbooks =
  "https://www.googleapis.com/books/v1/volumes?q=__title__+inauthor:__author__&startIndex=__start__&maxResults=15&langResrict=en&key=__apiKey__";
const URLauth =
  "https://www.googleapis.com/books/v1/volumes?q=+inauthor:__author__&startIndex=__start__&maxResults=15&langResrict=en&key=__apiKey__";
const apiKey = "AIzaSyCc7mtocCRRD4toqVJrcV0AnVPPD6ca_Rw";

const textbookBoxHTML = document.getElementById("txtSection");
const imgbookBoxHTML = document.getElementById("imgSection");
const authorsHTML = document.getElementsByClassName("s-author");

let title;
let author;

function displayResults(books) {
  for (const book of books) {
    const imageLinks = book.volumeInfo.imageLinks;

    resultsContainer.innerHTML += `
    <div class="card" id="bookbox">
    <section class="textResults" id="txtSection">
  <p class="info"> <span class="leftspan"> Title :</span> <span class="text s-title rightspan"> ${
    book.volumeInfo.title
  }</span> </p>
  <p class="info"><span class="leftspan">ID :</span> <span class="text s-bookid rightspan"> ${
    book.id
  }</span> </p> 
    <p class="info"><span class="leftspan">Authors :</span> <span class="text s-author rightspan"> ${
      book.volumeInfo.authors
    }</span> </p>
    <p class="info"><span class="leftspan">Description :</span> <span class="text s-desc rightspan"> ${
      book.volumeInfo.description
    }</span> </p> 
    </section>
    <section class="imgResults" id="imgSection">
    <img src="${imageLinks ? imageLinks.thumbnail : "img/defaultbook.jpeg"}" />
    </section>
    </div>`;
  }
}

function loadData(title, author, start) {
  fetch(
    URLbooks.replace("__title__", title)
      .replace("__author__", author)
      .replace("__start__", start)
      .replace("__apiKey__", apiKey)
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayResults(data.items);

      for (let i = 0; i <= authorsHTML.length - 1; i++) {
        authorsHTML[i].addEventListener("click", (e) => {
          console.log(e.target.innerText);
          fetch(
            URLbooks.replace("__author__", e.target.innerText)
              .replace("__title__", "")
              .replace("__start__", 0)
              .replace("__apiKey__", apiKey)
          )
            .then((response) => response.json())
            .then((data) => {
              resultsContainer.innerHTML = "";
              displayResults(data.items);
            });
        });
      }
    });
}

addBookBtn.addEventListener("click", () => {
  addBookBtn.classList.add("hidden");
  mainContainer.insertBefore(searchContainer, resultsContainer);
  mainContainer.removeChild(content);
  searchContainer.appendChild(searchForm);
  searchContainer.appendChild(searchBtnsContainer);
  searchForm.appendChild(labelInputTitle);
  searchForm.appendChild(titleInput);
  searchForm.appendChild(labelInputAuthor);
  searchForm.appendChild(authorInput);
  searchBtnsContainer.appendChild(searchBtn);
  searchBtnsContainer.appendChild(cancelBtn);
});

searchBtn.addEventListener("click", () => {
  resultsContainer.innerHTML = "";
  title = titleInput.value;
  author = authorInput.value;
  loadData(title, author, 0);
});

cancelBtn.addEventListener("click", () => {
  addBookBtn.classList.remove("hidden");
  mainContainer.insertBefore(content, resultsContainer);
  mainContainer.removeChild(searchContainer);
  resultsContainer.innerHTML = "";
});

nextBtn.addEventListener("click", (e) => {
  resultsContainer.innerHTML = "";
  offset += 15;
  console.log(e.target.innerText);
  loadData(title, author, offset);
});

prevBtn.addEventListener("click", (e) => {
  resultsContainer.innerHTML = "";
  offset -= 15;
  console.log(e.target.innerText);
  loadData(title, author, offset);
});
