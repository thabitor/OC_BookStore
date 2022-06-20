// Elements retrieved

const mainContainer = document.getElementById("main-container");
const headerContainer = document.getElementById("header-container");
const content = document.getElementById("content");
const addBookBtn = document.getElementsByClassName("btn")[0];

// Elements created

const searchContainer = document.createElement("div");
const searchBtnsContainer = document.createElement("div");
const searchForm = document.createElement("form");
const titleInput = document.createElement("input");
const authorInput = document.createElement("input");
const titleResults = document.createElement("h2");
const labelInputTitle = document.createElement("label");
const labelInputAuthor = document.createElement("label");
const searchBtn = document.createElement("button");
const cancelBtn = document.createElement("button");
const searchResultsBlock = document.createElement("div");

// Attributes setting

searchForm.setAttribute("class", "form-group");
searchContainer.setAttribute("class", "block-search");
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
searchResultsBlock.setAttribute("class", "block-search-results");

// InnerHTML

titleResults.innerHTML = "Search Results";
labelInputAuthor.innerHTML = "Author";
labelInputTitle.innerHTML = "Title";
searchBtn.innerHTML = "Search";
cancelBtn.innerHTML = "Cancel";

//Event Listeners

addBookBtn.addEventListener("click", () => {
  mainContainer.removeChild(content);
  mainContainer.appendChild(searchContainer);
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
  mainContainer.appendChild(searchResultsBlock);
  searchResultsBlock.appendChild(titleResults);
});
