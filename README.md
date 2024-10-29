# The Odin Project: Library

## Credits

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
