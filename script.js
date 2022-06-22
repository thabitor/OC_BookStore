const template = `<hr>
<section class="textResults" id="txtSection">
          <h3>Title :</h3>
          <span class="s-title"> __title__</span>
          <h4>ID :</h4>
          <span class="s-bookid"> __bookid__</span>
          <h3>Authors :</h3>
          <span class="s-author"> __author__</span>
          <h3>Description :</h3>
          <span class="s-desc"> __description__</span>
        </section>
        <section class="imgResults" id="imgSection">
          <img src="__src__" />
        </section>
         </div>
      </div>`;

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
// const resultsContainer = document.createElement("div");

// Attributes setting

searchForm.setAttribute("class", "form-group");
// searchContainer.setAttribute("class", "block-search");
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
// resultsContainer.setAttribute("class", "block-search-results");

// InnerHTML

titleResults.innerHTML = "Search Results";
labelInputAuthor.innerHTML = "Author";
labelInputTitle.innerHTML = "Title";
searchBtn.innerHTML = "Search";
cancelBtn.innerHTML = "Cancel";

//Event Listeners

addBookBtn.addEventListener("click", () => {
  mainContainer.removeChild(content);
  // mainContainer.appendChild(searchContainer);
  searchContainer.appendChild(searchForm);
  searchContainer.appendChild(searchBtnsContainer);
  searchForm.appendChild(labelInputTitle);
  searchForm.appendChild(titleInput);
  searchForm.appendChild(labelInputAuthor);
  searchForm.appendChild(authorInput);
  searchBtnsContainer.appendChild(searchBtn);
  searchBtnsContainer.appendChild(cancelBtn);
});

// searchBtn.addEventListener("click", () => {
//   mainContainer.appendChild(resultsContainer);
//   resultsContainer.appendChild(titleResults);
//   resultsContainer.appendChild(bookBoxHTML);
// });

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

/////////....NEW CODE....//////////

const URLbooks =
  "https://www.googleapis.com/books/v1/volumes?q=__title__+inauthor:__author__&startIndex=__start__&maxResults=15&langResrict=en&key=__apiKey__";
const URLauth =
  "https://www.googleapis.com/books/v1/volumes?q=+inauthor:__author__&startIndex=__start__&maxResults=15&langResrict=en&key=__apiKey__";
const apiKey = "AIzaSyCc7mtocCRRD4toqVJrcV0AnVPPD6ca_Rw";

// const titleInputHTML = document.getElementById("titleInput");
// const authorInputHTML = document.getElementById("authorInput");
// const buttonHTML = document.getElementById("button");
// const loadingHTML = document.querySelector("h2");
const textbookBoxHTML = document.getElementById("txtSection");
const imgbookBoxHTML = document.getElementById("imgSection");
const authorsHTML = document.getElementsByClassName("s-author");
// const hrLineTop = document.createElement("hr");
// const authorPgHeading = document.createElement("h3");
// authorInputHTML.class = "new-author";
// hrLineTop.id = "above-author-line";

let title;
let author;

function displayResults(books) {
  for (const book of books) {
    const thumbnail = book.volumeInfo.imageLinks;

    if (thumbnail) {
      bookBoxHTML.innerHTML += template
        .replace("__title__", book.volumeInfo.title)
        .replace("__author__", book.volumeInfo.authors)
        .replace("__description__", book.volumeInfo.description)
        .replace("__src__", book.volumeInfo.imageLinks.thumbnail);
    } else {
      bookBoxHTML.innerHTML += template
        .replace("__title__", book.volumeInfo.title)
        .replace("__author__", book.volumeInfo.authors)
        .replace("__description__", book.volumeInfo.description)
        .replace("__src__", "img/defaultbook.jpg");
    }
  }
}

// ////....////

function loadData(title, author, start) {
  fetch(
    URLbooks.replace("__title__", title)
      .replace("__author__", author)
      .replace("__start__", start)
      .replace("__apiKey__", apiKey)
  )
    .then((response) => response.json())
    .then((data) => {
      // loadingHTML.classList.add("hidden");
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
              // loadingHTML.classList.add("hidden");
              // authorPgHeading.classList.remove("hidden");
              // hrLineTop.classList.remove("hidden");
              // mainContainer.insertBefore(
              //   authorPgHeading,
              //   mainContainer.children[1]
              // );
              // mainContainer.insertBefore(hrLineTop, mainContainer.children[1]);
              bookBoxHTML.innerHTML = "";
              // authorPgHeading.innerHTML =
              //   "Listing by author:" + e.target.innerText;
              displayResults(data.items);
            });
        });
      }
      // mainContainer.appendChild(pageBtnsDiv);
    });
}

searchBtn.addEventListener("click", () => {
  resultsContainer.appendChild(bookBoxHTML);
  // resultsContainer.appendChild(titleResults);
  // resultsContainer.appendChild(bookBoxHTML
  // );
  bookBoxHTML.innerHTML = "";
  // loadingHTML.classList.remove("hidden");
  // authorPgHeading.classList.add("hidden");
  // hrLineTop.classList.add("hidden");
  title = titleInput.value;
  author = authorInput.value;
  loadData(title, author, 0);
});

nextBtn.addEventListener("click", (e) => {
  bookBoxHTML.innerHTML = "";
  offset += 15;
  console.log(e.target.innerText);
  loadData(title, author, offset);
});

prevBtn.addEventListener("click", (e) => {
  bookBoxHTML.innerHTML = "";
  offset -= 15;
  console.log(e.target.innerText);
  loadData(title, author, offset);
});
