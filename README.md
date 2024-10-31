# The Odin Project: Library

## Questions

-   For some reason the `required` property in the `input` fields is not working as expected when using a `form` inside a `dialog`.
-   In the delete book button, I don't like how it's removing all books and recreating the library. This will be a problem with scalability.

## Steps I made

1. Creating the Book object constructor.

```js
function Book(title, author, pages, isRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
        isRead ? "Already Read" : "Not Read Yet"
    }`;
};
```

2. Seeding initial books.

```js
let library = [];

function seedInitialBooks() {
    library.push(new Book("The Hobbit", "J. R. R. Tolkien", 310));
    library.push(new Book("NIV Study Bible", "God", 2198));
}

seedInitialBooks();
console.log(library);
```

3. Creating a sample book card.

```html
<div class="card-container">
    <p>The Hobbit</p>
    <p>by J. R. R. Tolkien</p>
    <p>310 pages</p>
    <label for="book-read">
        <input id="book-read" type="checkbox" />Not Read Yet
    </label>
</div>
```

```css
.library-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
    gap: 1rem;
}

.card-container {
    border: 1px solid brown;
}
```

4. Creating the book card in js.

```js
const card = document.createElement("div");
card.setAttribute("class", "card-container");

const title = document.createElement("p");
title.textContent = "NIV Study Bible";
card.appendChild(title);

const author = document.createElement("p");
author.textContent = "God";
card.appendChild(author);

const pages = document.createElement("p");
pages.textContent = "2198 pages";
card.appendChild(pages);

const readCheckbox = document.createElement("input");
readCheckbox.setAttribute("id", "book-read");
readCheckbox.setAttribute("type", "checkbox");
card.appendChild(readCheckbox);

const readLabel = document.createElement("label");
readLabel.setAttribute("for", "book-read");
readLabel.textContent = "Not Read Yet";
card.appendChild(readLabel);

libraryContainer.appendChild(card);
```

5. Making it a function to create a card.

```js
function createCard(book) {
    const card = document.createElement("div");
    card.setAttribute("class", "card-container");

    const title = document.createElement("p");
    title.textContent = book.title;
    card.appendChild(title);

    const author = document.createElement("p");
    author.textContent = `by ${book.author}`;
    card.appendChild(author);

    const pages = document.createElement("p");
    pages.textContent = `${book.pages} pages`;
    card.appendChild(pages);

    const readCheckbox = document.createElement("input");
    readCheckbox.setAttribute("id", "book-read");
    readCheckbox.setAttribute("type", "checkbox");
    card.appendChild(readCheckbox);

    const readLabel = document.createElement("label");
    readLabel.setAttribute("for", "book-read");
    readLabel.textContent = "Not Read Yet";
    card.appendChild(readLabel);

    libraryContainer.appendChild(card);
}

createCard(new Book("The Hobbit", "J. R. R. Tolkien", 310));
```

6. Creating a function to make cards from the library.

```js
function createLibrary(library) {
    library.forEach((book) => {
        createCard(book);
    });
}

createLibrary(library);
```

7. Creating a dialog box that includes the form for new books.

```html
<dialog>
    <p>Add new book</p>
    <form>
        <p>
            <label for="book-title">Title: </label>
            <input id="book-title" name="book-title" type="text" required />
        </p>

        <p>
            <label for="book-author">Author: </label>
            <input id="book-author" name="book-author" type="text" required />
        </p>

        <p>
            <label for="book-pages">Number of pages: </label>
            <input id="book-pages" name="book-pages" type="number" required />
        </p>

        <p>
            <input id="book-read" name="book-read" type="checkbox" />
            <label for="book-read">Not Read Yet</label>
        </p>
        <button
            class="finish-dialog-button"
            value="finished"
            formmethod="dialog"
            autofocus
            formnovalidate
        >
            Cancel
        </button>
        <button type="submit" class="add-book-dialog-button" value="default">
            Add Book
        </button>
    </form>
</dialog>
```

8. Coding the logic for creating new books.

```js
const dialog = document.querySelector("dialog");
const newBookButton = document.querySelector(".new-book-button");
const finishDialogButton = document.querySelector(".finish-dialog-button");
const addBookDialogButton = document.querySelector(".add-book-dialog-button");

// grab all input elements
const titleInput = document.querySelector("#book-title");
const authorInput = document.querySelector("#book-author");
const pagesInput = document.querySelector("#book-pages");
const readInput = document.querySelector("#book-read");
const readLabel = document.querySelector("label[for='book-read']");

readInput.addEventListener("click", (e) => {
    readLabel.textContent = e.target.checked ? "Already Read" : "Not Read Yet";
});

newBookButton.addEventListener("click", () => {
    // reset all input values
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;

    dialog.showModal();
});

addBookDialogButton.addEventListener("click", (e) => {
    e.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const isRead = readInput.checked;

    if (title || author || pages) {
        const newBook = new Book(
            title || "Unknown - No Title",
            author || "Unknown",
            pages || "Unknown number of",
            isRead
        );

        library.push(newBook);

        createCard(newBook);

        dialog.close();
    } else {
        alert(
            "Please enter any information about the new book. Can't create an empty book yet T.T"
        );
    }
});
```

9. New feature, delete a book. First, adding a button and an ID to the card.

```js
function createCard(book, index = library.length /* 9 */) {
    ...
    // 9
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", `book-id-${index}`);
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (e) => {
        const id = parseInt(e.target.id.split("-")[2]);
        library.splice(id, 1);

        const books = document.querySelectorAll(".card-container");

        books.forEach((book) => {
            book.remove();
        });

        createLibrary(library);
    });

    card.appendChild(deleteButton);

    libraryContainer.appendChild(card);
}
```

10. Adding the logic to update the read checkbox into the data.

```js
readCheckbox.setAttribute("id", `checkbox-id-${index}`);
readCheckbox.addEventListener("click", (e) => {
    const id = parseInt(e.target.id.split("-")[2]);
    library[id].isRead = e.target.checked;
});
```

11. Right now, it's ugly, css to the rescue! First the font.

```css
body {
    font-family: "Noto Sans", sans-serif, system-ui;
    height: 100vh;
    padding: 1rem;
}
```

12. Styling the book cards.

```css
.card-container {
    /* 12 */
    border: 1px solid lightslategray;
    border-radius: 8px;
    border-left: 10px solid darkgoldenrod;
    box-shadow: 1px 5px 10px grey;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.card-container:hover {
    background-color: lightgrey;
}

.card-container :first-child {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
}
```

13. Styling the New Book button.

```css
.new-book-button {
    height: 300px;
    border: 1px solid lightslategray;
    border-radius: 8px;
    border-left: 10px solid darkcyan;
    box-shadow: 1px 5px 10px grey;
    font-size: 1.5rem;
}

.new-book-button:hover {
    background-color: lightgrey;
    cursor: pointer;
}
```

14. Styling the delete buttons.

```css
.card-container button {
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    border-radius: 8px;
    background-color: lightpink;
    border: none;
}

.card-container button:hover {
    background-color: darkred;
    color: white;
    cursor: pointer;
}
```

15. Lastly, styling the dialog!

```css
dialog {
    width: 30%;
    height: auto;
    margin: 20vh auto;
    border: 1px solid darkcyan;
    border-radius: 8px;
    border-left: 10px solid darkcyan;
    box-shadow: 1px 5px 5px darkcyan;
    padding: 1rem 1.5rem 1rem 1rem;
}

dialog > p {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

dialog input[type="text"],
dialog input[type="number"] {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    display: block;
    width: 100%;
}

dialog p:has(label[for="book-read"]) {
    margin: 2rem 0;
}

dialog button {
    font-size: 1rem;
    padding: 1rem;
    border-radius: 8px;
    background-color: white;
}

#add-button {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    border: 1px solid teal;
    color: darkcyan;
}

#add-button:hover {
    background-color: lightcyan;
}

#cancel-button {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    border: 1px solid pink;
    color: darkred;
}

#cancel-button:hover {
    background-color: mistyrose;
}
```

16. One more thing, I want to make things unselectable, specially the label of the checkbox.

```css
.prevent-select {
    -webkit-user-select: none;
    /* Safari */
    -ms-user-select: none;
    /* IE 10 and IE 11 */
    user-select: none;
    /* Standard syntax */
}
```
