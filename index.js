const libraryContainer = document.querySelector(".library-container");

// 1
function Book(title, author, pages, isRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
        isRead ? "already read" : "not read yet"
    }`;
};

// 2
let library = [];

function seedInitialBooks() {
    library.push(new Book("The Hobbit", "J. R. R. Tolkien", 310));
}

seedInitialBooks();
// console.table(library);

// 4, 5
function createCard(book, index = library.length /* 9 */) {
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
    readCheckbox.setAttribute("type", "checkbox");
    readCheckbox.setAttribute("name", "read-checkbox");
    readCheckbox.checked = book.isRead;

    // 10
    readCheckbox.setAttribute("id", `checkbox-id-${index}`);
    readCheckbox.addEventListener("click", (e) => {
        const id = parseInt(e.target.id.split("-")[2]);
        library[id].isRead = e.target.checked;
        const readLabel = document.querySelector(
            `label:has(#checkbox-id-${id})`
        );
        readLabel.textContent = e.target.checked
            ? " Already Read"
            : " Not Read Yet";
        readLabel.prepend(e.target);
    });

    const readLabel = document.createElement("label");
    readLabel.textContent = readCheckbox.checked
        ? " Already Read"
        : " Not Read Yet";
    readLabel.prepend(readCheckbox);
    card.appendChild(readLabel);

    // 9
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", `book-id-${index}`);
    deleteButton.textContent = "Delete";

    card.appendChild(deleteButton);

    deleteButton.addEventListener("click", (e) => {
        const id = parseInt(e.target.id.split("-")[2]);
        library.splice(id, 1);

        const books = document.querySelectorAll(".card-container");

        books.forEach((book) => {
            book.remove();
        });

        createLibrary(library);
    });

    libraryContainer.appendChild(card);
}

// 6
function createLibrary(library) {
    library.forEach((book, index) => {
        createCard(book, index);
    });
}

createLibrary(library);

// 8
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
    readLabel.textContent = "Not Read Yet";

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

        createCard(newBook);
        // bug fixed: needed to push after creating the card, not before!
        library.push(newBook);

        dialog.close();
    } else {
        alert(
            "Please enter any information about the new book. Can't create an empty book yet T.T"
        );
    }
});
