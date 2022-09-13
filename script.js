// GET SOME ELEMENT CONSTANTS
const booklist = [];
const addbtn = document.querySelector('.book-add');
const closebtn = document.querySelector('.modal-close-btn');
const popup = document.querySelector('.book-modal');
const library = document.querySelector('.library-container');

// BOOK CLASS
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
};

Book.prototype.getInfo = function () {
    return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, reading status: ' + this.read + '.'
};

// EVENT LISTENERS
window.addEventListener('click', function (e) {
    if (e.target == popup) {
        popup.classList.toggle('open');
    }
});

window.addEventListener('keyup', function (e) {
    if (e.key === 'Escape') {
        popup.classList.toggle('open');
    }
});

addbtn.addEventListener('mouseup', function () {
    popup.classList.toggle('open');
});

closebtn.addEventListener('mouseup', function () {
    popup.classList.toggle('open');
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let title = form.elements['title'].value;
    let author = form.elements['author'].value;
    let pages = form.elements['pages'].value;
    let status = form.elements['status'].value;
    booklist.push(new Book(title, author, pages, status));
    buildLibrary();
    document.getElementById("form").reset();
    popup.classList.toggle('open');
});

// MAIN FUNCTIONALITY

function buildLibrary() {
    booklist.forEach((element) => addBook(element));
}

function addBook(book) {
    const box = document.createElement('div');
    box.className = 'book-box';
    box.innerHTML = `
      <p>${book.title}</p>
      <p>${book.author}</p>
      <p>${book.pages}</p>
      <p>${book.read}</p>
    `;
    library.appendChild(box);
};
