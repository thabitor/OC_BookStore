// Elements retrieved

const myBooks = document.getElementById("myBooks");
const content = document.getElementById("content");
const addBookBtn = document.getElementById("addbook");

// Elements created
const searchContainer = document.createElement("div");
const searchBtnsContainer = document.createElement("div");
const searchForm = document.createElement("form");
const titleInput = document.createElement("input");
titleInput.setAttribute("type", "text");
const authorInput = document.createElement("input");
const titleResults = document.createElement("h2");
titleResults.innerHTML = "Search Results";
authorInput.setAttribute("type", "text");
searchContainer.setAttribute("class", "container");
searchForm.setAttribute("class", "form-group");

// // Buttons
const searchBtn = document.createElement("button");
const cancelBtn = document.createElement("button");
searchBtn.innerHTML = "Search";
cancelBtn.innerHTML = "Cancel";

addBookBtn.addEventListener("click", () => {
  console.log(myBooks.children);
  console.log(document.body.children);
  myBooks.removeChild(content);
  myBooks.appendChild(searchContainer);
  searchContainer.appendChild(searchForm);
  searchForm.appendChild(titleInput);
  searchForm.appendChild(authorInput);
  searchForm.appendChild(searchBtnsContainer);
  searchBtnsContainer.appendChild(searchBtn);
  searchBtnsContainer.appendChild(cancelBtn);
});

searchBtn.addEventListener("click", () => {
  const searchResultsBlock = document.createElement("div");

  //   myBooks.removeChild(content);
  document.body.appendChild(searchResultsBlock);
  searchResultsBlock.appendChild(titleResults);
});
