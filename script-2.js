const template = `<div class="book-container" id="bookbox">
<section class="imgResults" id="imgSection">
    <img src="__src__">
</section>
<section class="textResults" id="txtSection">
    <h3>Title :</h3> 
    <span class="s-title"> __title__</span>
    <h3>Authors :</h3> 
    <span class="s-author"> __author__</span>
    <h3>Description :</h3> 
    <span class="s-desc"> __description__</span>
</section>
</div>
<hr>`;

const URLbooks =
  "https://www.googleapis.com/books/v1/volumes?q=__title__+inauthor:__author__&startIndex=__start__&maxResults=15&langResrict=en&key=__apiKey__";
const URLauth =
  "https://www.googleapis.com/books/v1/volumes?q=+inauthor:__author__&startIndex=__start__&maxResults=15&langResrict=en&key=__apiKey__";
const apiKey = "AIzaSyCc7mtocCRRD4toqVJrcV0AnVPPD6ca_Rw";

const titleInputHTML = document.getElementById("titleInput");
const authorInputHTML = document.getElementById("authorInput");
const buttonHTML = document.getElementById("button");
const resultsHTML = document.getElementById("resultbox");
const textResultsHTML = document.getElementById("txtSection");
const imgResultsHTML = document.getElementById("imgSection");
const loadingHTML = document.querySelector("h2");
const mainContainer = document.getElementById("main");
const authorsHTML = document.getElementsByClassName("s-author");
const authorPgHeading = document.createElement("h3");
authorInputHTML.class = "new-author";
const hrLineTop = document.createElement("hr");
hrLineTop.id = "above-author-line";

// Generate next and prev button
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

let title;
let author;

function displayResults(books) {
  for (const livre of books) {
    const thumbnail = livre.volumeInfo.imageLinks;

    if (thumbnail) {
      resultsHTML.innerHTML += template
        .replace("__title__", livre.volumeInfo.title)
        .replace("__author__", livre.volumeInfo.authors)
        .replace("__description__", livre.volumeInfo.description)
        .replace("__src__", livre.volumeInfo.imageLinks.thumbnail);
    } else {
      resultsHTML.innerHTML += template
        .replace("__title__", livre.volumeInfo.title)
        .replace("__author__", livre.volumeInfo.authors)
        .replace("__description__", livre.volumeInfo.description)
        .replace("__src__", "img/defaultbook.jpg");
    }
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
      loadingHTML.classList.add("hidden");
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
              loadingHTML.classList.add("hidden");
              authorPgHeading.classList.remove("hidden");
              hrLineTop.classList.remove("hidden");
              mainContainer.insertBefore(
                authorPgHeading,
                mainContainer.children[1]
              );
              mainContainer.insertBefore(hrLineTop, mainContainer.children[1]);
              resultsHTML.innerHTML = "";
              authorPgHeading.innerHTML =
                "Listing by author:" + e.target.innerText;
              displayResults(data.items);
            });
        });
      }
      mainContainer.appendChild(pageBtnsDiv);
    });
}

buttonHTML.addEventListener("click", () => {
  resultsHTML.innerHTML = "";
  loadingHTML.classList.remove("hidden");
  authorPgHeading.classList.add("hidden");
  hrLineTop.classList.add("hidden");
  title = titleInputHTML.value;
  author = authorInputHTML.value;
  loadData(title, author, 0);
});

nextBtn.addEventListener("click", (e) => {
  resultsHTML.innerHTML = "";
  offset += 15;
  console.log(e.target.innerText);
  loadData(title, author, offset);
});

prevBtn.addEventListener("click", (e) => {
  resultsHTML.innerHTML = "";
  offset -= 15;
  console.log(e.target.innerText);
  loadData(title, author, offset);
});
