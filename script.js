// Elements retrieved

const mainContainer = document.getElementById("main-container");
const headerContainer = document.getElementById("header-container");
const resultsContainer = document.getElementById("results-container");
const contentHTML = document.querySelector("#content");
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
const hrLine = document.createElement("hr");
const resultsTitle = document.createElement("h3");

searchForm.setAttribute("class", "form-group");
titleInput.setAttribute("type", "text");
titleInput.setAttribute("class", "block-search__inputbox");
titleInput.setAttribute("id", "titleInput");
titleInput.class = "input";
labelInputTitle.setAttribute("for", "titleInput");
authorInput.setAttribute("type", "text");
authorInput.setAttribute("class", "block-search__inputbox");
authorInput.setAttribute("id", "authorInput");
authorInput.class = "input";
labelInputAuthor.setAttribute("for", "authorInput");
searchBtnsContainer.setAttribute("class", "block-search-buttons");
searchBtn.setAttribute("class", "block-search__btn green");
cancelBtn.setAttribute("class", "block-search__btn red");
searchContainer.class = "fixed-contentHTML";
headerContainer.class = "fixed-contentHTML";
searchBtn.id = "search-btn";
cancelBtn.id = "cancel-btn";

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

// cut down on URLs - u need only one.
// You can use templated strings

const URLbooks =
  "https://www.googleapis.com/books/v1/volumes?q=__title__+inauthor:__author__&startIndex=__start__&maxResults=15&langResrict=en&key=__apiKey__";

const apiKey = "AIzaSyCc7mtocCRRD4toqVJrcV0AnVPPD6ca_Rw";

const textbookBoxHTML = document.getElementById("txtSection");
const imgbookBoxHTML = document.getElementById("imgSection");
const authorsHTML = document.getElementsByClassName("s-author");
const cardHTML = document.getElementsByClassName("card");

let title;
let author;

function displayResults(books) {
  resultsTitle.class = "results-title";
  resultsTitle.innerHTML = `<h3>Search results for <i>${
    titleInput.value ? titleInput.value : authorInput.value
  }</i></h3>`;
  mainContainer.insertBefore(resultsTitle, resultsContainer);

  let i = 0;
  for (const book of books) {
    var storedStatus = checkBookStatus(book.id);
    const imageLinks = book.volumeInfo.imageLinks;
    resultsContainer.innerHTML += `
    <div class="card ${storedStatus}" id="${book.id}">
    <div class="card-icons" id="icon${i}">
    <i onclick="bookmarkFunction('${book.id}', 'BK-${book.id}')" class="${
      storedStatus === "marked" ? "fa-solid" : "fa-regular"
    } fa-bookmark" id="BK-${book.id}">
    </i>
    </div>
    <div class="results">
     <section class="imgResults" id="imgSection">
    <img class ="card-img" src="${
      imageLinks ? imageLinks.thumbnail : "img/unavailable.png"
    }" />
    </section>
    <section class="textResults" id="txtSection">
  <p class="info"> <span class="leftspan"> Title :</span> <span class="text s-title rightspan"> ${
    book.volumeInfo.title
  }</span> </p>
  <p class="info"><span class="leftspan">ID :</span> <span class="text s-bookid rightspan"> ${
    book.id
  }</span> </p> 
    <p class="info"><span class="leftspan">Authors :</span> <span class="text s-author rightspan"> ${
      book.volumeInfo.authors ? book.volumeInfo.authors[0] : "No authors found"
    }</span> </p>
    <p class="info"><span class="leftspan">Description :</span> <span class="text s-desc rightspan"> ${
      book.volumeInfo.description
        ? book.volumeInfo.description
        : "No description found"
    }</span> </p> 
    </section>
    </div>
    </div>`;
    i++;
  }
}

window.onload = setSessionContainer;

const unmarkedStatus = "unmarked";
const markedStatus = "marked";
const DEFAULT_STATUS = unmarkedStatus;
const trashIcon = document.createElement("i");
trashIcon.className = "fa-regular fa-trash-can";
sessionStorage.getItem("sessionBooks");
const sessionContainer = sessionStorage.getItem("sessionContainer");
const sessionBooks = sessionStorage.getItem("sessionBooks");
const bookShelfHTML = document.createElement("div");
bookShelfHTML.className = "bookShelf";
bookShelfHTML.id = "bookshelfId";
const bookShelfHTMLArray = [];

function setSessionContainer() {
  if (sessionBooks === null) {
    sessionStorage.setItem("sessionContainer", contentHTML.innerHTML);
    sessionStorage.setItem("sessionBooks", bookShelfHTML.innerHTML);
    sessionStorage.setItem("Session", "new");
    contentHTML.appendChild(bookShelfHTML);
  } else {
    contentHTML.innerHTML = sessionContainer;
    sessionStorage.setItem("Session", "active");
  }
}

function bookmarkFunction(bookId, bookmarkId) {
  if (sessionStorage.getItem("Session") === "new") {
    sessionStorage.setItem("Session", "active");
  }

  var storedStatus = checkBookStatus(bookId);
  const markedBook = document.getElementById(bookId);
  var markedBookClone = markedBook.cloneNode(true);
  var shelfedBook = document.getElementById(`${bookId}00M`);
  const cloneBookIconsDiv = markedBookClone.children[0];
  const cloneIcon = cloneBookIconsDiv.children[0];

  if (storedStatus === unmarkedStatus) {
    document
      .getElementById(`${bookmarkId}`)
      .classList.replace("fa-regular", "fa-solid");
    if (!bookShelfHTMLArray.some((e) => e.id === bookId)) {
      bookShelfHTMLArray.push(markedBookClone);
      document.getElementById("bookshelfId").appendChild(markedBookClone);
      cloneBookIconsDiv.replaceChild(trashIcon.cloneNode(true), cloneIcon);
      markedBook.classList.replace("unmarked", "marked");
      markedBookClone.classList.replace("unmarked", "marked");
      markedBookClone.id = `${bookId}00M`;
    }
    storedStatus = markedStatus;
  } else if (storedStatus === markedStatus) {
    document
      .getElementById(`${bookmarkId}`)
      .classList.replace("fa-solid", "fa-regular");
    document.getElementById("bookshelfId").removeChild(shelfedBook);
    markedBook.classList.replace("marked", "unmarked");
    storedStatus = unmarkedStatus;
  }

  console.log(bookShelfHTMLArray);
  sessionStorage.setItem(`${bookId}`, `${storedStatus}`);
  sessionStorage.setItem("sessionBooks", bookShelfHTML.innerHTML);
  sessionStorage.setItem("sessionContainer", contentHTML.innerHTML);
}

function checkBookStatus(bookId) {
  let storedStatus = sessionStorage.getItem(`${bookId}`);
  if (!storedStatus) {
    storedStatus = DEFAULT_STATUS;
  }
  sessionStorage.setItem(`${bookId}`, `${storedStatus}`);
  return storedStatus;
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
  resultsContainer.classList.add("hidden");
  resultsContainer.classList.add("hidden");
  addBookBtn.classList.add("hidden");
  mainContainer.insertBefore(searchContainer, contentHTML);
  mainContainer.insertBefore(resultsContainer, contentHTML);
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
  resultsTitle.classList.remove("hidden");
  resultsContainer.classList.remove("hidden");
  resultsContainer.innerHTML = "";
  title = titleInput.value;
  author = authorInput.value;
  loadData(title, author, 0);
});

cancelBtn.addEventListener("click", () => {
  resultsTitle.classList.add("hidden");
  resultsContainer.classList.add("hidden");
  addBookBtn.classList.remove("hidden");
  mainContainer.insertBefore(contentHTML, resultsContainer);
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
