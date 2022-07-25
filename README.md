# OC project 6 - Magic Feathers

The Magic Feathers library project utilises Google Books API to fetch books by allowing the user to search for a title, author or both. 
In this application, users can look up any book (restricted to English) and save it to their bookshelf for later reading.

**Adding and removing books**

The user can add any book from the search results section into their bookshelf by clicking on the bookmark icon. 
Unclicking the bookmark icon works as expected by removing the book from the bookshelf and changing the style of the book in question.

The user can also remove a book from the bookshelf by clicking on the trash icon that appears on each book inside the bookshelf. 

Should an author, image or description of a book be missing, this is stated clearly in the respective section.

**Session storage**

The bookmarked books remain in the bookshelf for the browser session only - once browser is closed, the session is reset. 
However, refreshing the page any number of times maintains the bookshelf state.

If a book is added to the bookshelf, it persists through searches within a session. Meaning if it appears in another search within the same session, it shows as already marked in the bookshelf. It can then also be removed from the new search session if needed.

**Using the application**

To use the application, please download the HTML, JavaScript and CSS files in this gitHub repository.

The application can be used by opening the HTML file with Google Chrome. Full functionality on other browsers cannot yet be guaranteed. 



