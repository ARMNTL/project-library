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
    readCheckbox.setAttribute("id", "book-read");
    readCheckbox.setAttribute("type", "checkbox");
    card.appendChild(readCheckbox);

    const readLabel = document.createElement("label");
    readLabel.setAttribute("for", "book-read");
    readLabel.textContent = "Not Read Yet";
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
