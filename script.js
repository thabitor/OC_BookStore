// Elements retrieved
const body = document.getElementsByTagName('body')[0];
const myBooks = document.getElementById('myBooks');
const content = document.getElementById('content');
const addBookBtn = document.getElementById('addbook');

// Elements created
const searchContainer = document.createElement('div');
const searchBtnContainer = document.createElement('div');
const searchForm = document.createElement('form');
const titleInput = document.createElement('input');
const authorInput = document.createElement('input');
const searchResultsBlock = document.createElement('div');
const titleResults = document.createElement('h2');
titleResults.innerHTML = "Search Results";

searchContainer.setAttribute('class', 'container');
searchForm.setAttribute('class', 'form-group');

// // Buttons
const searchBtn = document.createElement('button');
const cancelBtn = document.createElement('button');
searchBtn.innerHTML = "Search"
cancelBtn.innerHTML = "Cancel"

addBookBtn.addEventListener('click', ()=> {

    myBooks.removeChild(content);
    body.appendChild(searchContainer);
    searchContainer.appendChild(searchForm);
    searchForm.appendChild(titleInput);
    searchForm.appendChild(authorInput);
    searchForm.appendChild(searchBtnContainer);
    searchBtnContainer.appendChild(searchBtn);
    searchBtnContainer.appendChild(cancelBtn);

});

searchBtn.addEventListener('click', () => {
    
    myBooks.removeChild(content);
    body.appendChild(searchResultsBlock);
    searchResultsBlock.appendChild(titleResults);

});