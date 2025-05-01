const myLibrary = [];

function Book(title, author, pages, readStatus) {
    // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = crypto.randomUUID();
}

// Prototype function to toggle read status
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
    // take params, create a book then store it in the array
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

document.getElementById("submitBook").addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const readStatus = document.getElementById("readStatus").value;

    // if (title && author && pages) {
    addBookToLibrary(title, author, pages, readStatus);
    document.getElementById("bookFormContainer").classList.add("hidden");

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    // }
    // else {
    //     alert("Please fill out all details");
    // }

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