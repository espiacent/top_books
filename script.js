// GET SOME ELEMENT CONSTANTS
const addbtn = document.querySelector('.book-add');
const closebtn = document.querySelector('.modal-close-btn');
const popup = document.querySelector('.book-modal');

// BOOK CLASS
class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}
// APP CLASS
class Application {
    static addToLibrary() {
        const BookList = [{
            title: 'Thud!',
            author: 'Pterry',
            pages: '200',
            read: 'not yet read'
        },
        {
            title: 'Snuff!',
            author: 'Pterry',
            pages: '250',
            read: 'already read'
        }
        ];
        const books = BookList;

        books.forEach((book) => Application.addBook(book));
    }
    static addBook(book) {
        const library = document.querySelector('.library-container');
        const box = document.createElement('div');
        box.className = 'book-box';
        box.innerHTML = `
                <p>${book.title}</p>
                <p>${book.author}</p>
                <p>${book.pages}</p>
                <p>${book.read}</p>
                <button class="delete-book">Delete</button>
                `;
        library.appendChild(box);
    }
};

// EVENT LISTENERS

document.addEventListener('DOMContentLoaded', Application.addToLibrary)

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
