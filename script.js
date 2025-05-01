const myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function () {
    if (this.readStatus === "Read") {
        this.readStatus = "Not Read";
    } else if (this.readStatus === "Not Read") {
        this.readStatus = "Reading";
    } else {
        this.readStatus = "Read";
    }
};

function addBookToLibrary(title, author, pages, readStatus) {
    const newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
    displayBooks();
}

document.getElementById("addBookBtn").addEventListener("click", () => {
    document.getElementById("bookFormContainer").classList.remove("hidden");
});

document.getElementById("cancelBook").addEventListener("click", () => {
    document.getElementById("bookFormContainer").classList.add("hidden");
});

const form = document.getElementById("bookForm");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const statusInput = document.getElementById("readStatus");

document.getElementById("submitBook").addEventListener("click", function (e) {
    titleInput.setCustomValidity("");
    authorInput.setCustomValidity("");
    pagesInput.setCustomValidity("");
    statusInput.setCustomValidity("");

    if (titleInput.value.trim() === "") {
        titleInput.setCustomValidity("Please enter the book title.");
    }

    if (authorInput.value.trim() === "") {
        authorInput.setCustomValidity("Please enter the author's name.");
    }

    if (pagesInput.value === "" || Number(pagesInput.value) <= 0) {
        pagesInput.setCustomValidity("Please enter a valid number of pages.");
    }

    if (statusInput.value === "") {
        statusInput.setCustomValidity("Please select the read status.");
    }

    if (!form.checkValidity()) {
        form.reportValidity();
        e.preventDefault();
        return;
    }

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const pages = pagesInput.value;
    const readStatus = statusInput.value;

    addBookToLibrary(title, author, pages, readStatus);
    form.reset();
    document.getElementById("bookFormContainer").classList.add("hidden");
});

function displayBooks() {
    const libraryContainer = document.getElementById("library");
    libraryContainer.innerHTML = "";

    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.innerHTML = `
        <h3>Title: "${book.title}"</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Status: ${book.readStatus}</p>
        <div class="button-group">
        <button onclick="toggleReadStatus('${book.id}')">Toggle Read Status</button>
        <button onclick="removeBook('${book.id}')">Remove Book</button>
        </div>
        `;
        libraryContainer.appendChild(bookCard);
    });
}

function toggleReadStatus(id) {
    const book = myLibrary.find(book => book.id === id);
    if (book) {
        book.toggleReadStatus();
        displayBooks();
    }
}

function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id == id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}
