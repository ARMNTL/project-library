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
        isRead ? "Already Read" : "Not Read Yet"
    }`;
};

// 2
let library = [];

function seedInitialBooks() {
    library.push(new Book("The Hobbit", "J. R. R. Tolkien", 310));
    library.push(new Book("NIV Study Bible", "God", 2198));
}

seedInitialBooks();
// console.table(library);

// 4, 5
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
    readCheckbox.setAttribute("type", "checkbox");
    readCheckbox.setAttribute("name", "read-checkbox");
    readCheckbox.checked = book.isRead;

    const readLabel = document.createElement("label");
    readLabel.textContent = " Not Yet Read";
    readLabel.prepend(readCheckbox);

    card.appendChild(readLabel);

    libraryContainer.appendChild(card);
}

// 6
function createLibrary(library) {
    library.forEach((book) => {
        createCard(book);
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
        createCard(newBook);

        dialog.close();
    } else {
        alert(
            "Please enter any information about the new book. Can't create an empty book yet T.T"
        );
    }
});
