// ***** Getting Variables
const addBookBtn = document.getElementById("add-book");
const form = document.getElementById("book-details");
const formClose = document.getElementById("form-close");
const addBtn = document.getElementById("add");
const cancelBtn = document.getElementById("cancel");

const bookTitle = document.querySelector("#book-details #title");
const bookAuthor = document.querySelector("#book-details #author");
const numberPages = document.querySelector("#book-details #pages");
const isRead = document.querySelector("#book-details #read");

//  *** show error on wrong inputs
const showError = (el)=>{
  el.nextElementSibling.classList.add("show");
}


//  *** clear all errors even if it's one
const clearError = ()=> {
  const errors = document.querySelectorAll(".error-display");
  errors.forEach((err) => {
    err.classList.remove("show");
  });
}

// ...... Book CONSTRUCTOR function
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = () => {
    const info = `"${this.title} by ${this.author}, has ${this.pages} pages, `;
    return info.concat(
      this.read === false ? 'not read yet!"' : 'book has been read!"'
    );
  };
}

//  *** Add Book Function
function addBookToLibrary(book) {
  const library = document.querySelector("#book-display");
  const bookCard = document.createElement("div");
  
  const readStatus = book.read ? "READ" : "UNREAD";

  bookCard.classList.add("book");
  bookCard.innerHTML = `<div class="img-wrap">
    <img src="https://source.unsplash.com/collection/9973248/">
    </div>
    <div class="details">
    <p>${book.title}<span>${book.pages} PG</span></p>
    <p>By <span class="author">${book.author}<span>${readStatus}</p>`;

  library.appendChild(bookCard);
}

// *** Show Form And Hide add book btn
addBookBtn.onclick = () => {
  form.style.display = "block";
  addBookBtn.style.display = "none";
};

//  *** To Hide Form and show Add book btn
const hideForm = () => {
  form.reset();
  clearError();
  form.style.display = "none";
  addBookBtn.style.display = "inline-block";
};

formClose.onclick = hideForm;

cancelBtn.onclick = form.reset();

// Validate input function
const validateInput = () => {
  const titleValue = bookTitle.value.trim();
  const authorValue = bookAuthor.value.trim();
  const pagesValue = numberPages.value.trim();

  const pagesOnlyNumbers = /^\d+$/;

  if (!titleValue) {
    showError(bookTitle);
  } else if (!authorValue) {
    showError(bookAuthor);
  } else if (!pagesValue || !pagesOnlyNumbers.test(pagesValue)) {
    numberPages.value = "";
    showError(numberPages);
  } else {
    clearError();

    const book = new Book(titleValue, authorValue, pagesValue, isRead.checked);

    hideForm();
    addBookToLibrary(book);
  }
};


//  *** Adding new book EVENT
addBtn.onclick = (event) => {
  event.preventDefault();
  validateInput();
  // console.log(document.forms[0].innerHTML);
};
