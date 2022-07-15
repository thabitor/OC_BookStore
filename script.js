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
const URLauth =
  "https://www.googleapis.com/books/v1/volumes?q=+inauthor:__author__&startIndex=__start__&maxResults=15&langResrict=en&key=__apiKey__";

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
    const imageLinks = book.volumeInfo.imageLinks;
    resultsContainer.innerHTML += `
    <div class="card" id="book${i}">
    <div class="card-icons" id="icon${i}">
    <i onclick="bookmarkFunction('book${i}', 'bookmark${i}')" class="fa-regular fa-bookmark" id="bookmark${i}">
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

const regularMark = "fa-regular fa-bookmark";
const solidMark = "fa-solid fa-bookmark";
const unmarkedStatus = "unmarked";
const markedStatus = "marked";
const DEFAULT_STATUS = unmarkedStatus;

const bookShelf = document.createElement("div");
bookShelf.className = "bookShelf";
const trashIcon = document.createElement("i");
trashIcon.className = "fa-regular fa-trash-can";
const bookShelfArray = [];
// const trashIconClone = trashIcon.cloneNode(true);

function isFound(array, bookId) {
  array.some((element) => {
    if (element.id === bookId) {
      return true;
    }
    return false;
  });
}

function bookmarkFunction(bookId, bookmarkId) {
  var storedStatus = storedStatusFunc(bookId);
  const markedBook = document.getElementById(bookId);
  const markedBookClone = markedBook.cloneNode(true);
  const cloneBookIconsDiv = markedBookClone.children[0];
  const cloneIcon = cloneBookIconsDiv.children[0];

  if (storedStatus === unmarkedStatus) {
    document.getElementById(`${bookmarkId}`).classList.remove("fa-regular");
    document.getElementById(`${bookmarkId}`).classList.add("fa-solid");

    if (!bookShelfArray.some((e) => e.id === bookId)) {
      bookShelfArray.push(markedBookClone);
      bookShelf.appendChild(markedBookClone);
      cloneBookIconsDiv.replaceChild(trashIcon.cloneNode(true), cloneIcon);
      markedBookClone.id = `${bookId}M`;
      markedBookClone.style.backgroundColor = "wheat";
      console.log(bookShelfArray);
    }

    storedStatus = markedStatus;
  } else if (storedStatus === markedStatus) {
    document.getElementById(`${bookmarkId}`).classList.add("fa-regular");
    document.getElementById(`${bookmarkId}`).classList.remove("fa-solid");
    const shelfedBook = document.getElementById(`${bookId}M`);
    bookShelf.removeChild(shelfedBook);
    storedStatus = unmarkedStatus;
    console.log(bookShelfArray);
  }

  mainContainer.appendChild(contentHTML);

  while (!contentHTML.children[1]) {
    contentHTML.appendChild(bookShelf);
    resultsContainer.style.height = "415px";
    contentHTML.style.height = "415px";
  }
  sessionStorage.setItem(`${bookId}`, `${storedStatus}`);
}

function storedStatusFunc(bookId) {
  let storedStatus = sessionStorage.getItem(`${bookId}`);
  if (!storedStatus) {
    storedStatus = DEFAULT_STATUS;
  }
  sessionStorage.setItem(`${bookId}`, `${storedStatus}`);
  return storedStatus;
}

//   document.getElementById(bookId).
//   // TODO save the book search results to session storage
//   // Add an argument that represents what they clicked - reference to the dom element
// }

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
  mainContainer.insertBefore(searchContainer, resultsContainer);
  mainContainer.removeChild(contentHTML);
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
