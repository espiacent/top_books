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
        const books = SaveData.getBooklist();
        books.forEach((book) => Application.addBook(book));
    }
    static addBook(book) {
        const library = document.querySelector('.library-container');
        const box = document.createElement('div');
        box.className = 'book-box';
        box.innerHTML = `
                <p class="title">${book.title}</p>
                <p class="author">${book.author}</p>
                <p class="pages">${book.pages}</p>
                <p class="read">${book.read}</p>
                <button class="delete-book">Delete</button>
                `;
        library.appendChild(box);
    }
    static removeBook(e) {
        if (e.classList.contains('delete-book')) {
            e.parentElement.remove();
            Application.showValidationAlert('Item removed from list.', 'success');
        }
    }
    static showValidationAlert(message, classname) {
        const alertbox = document.createElement('div');
        alertbox.className = `alertbox ${classname}`;
        alertbox.appendChild(document.createTextNode(message));
        const container = document.querySelector('.alert-container');
        const small = document.querySelector('small');
        container.insertBefore(alertbox, small);
        setTimeout(() => document.querySelector('.alertbox').remove(), 1800);
    }
};

class SaveData {
    static getBooklist() {
        let Booklist;
        if (localStorage.getItem('Booklist') === null) {
            Booklist = [];
        } else {
            Booklist = JSON.parse(localStorage.getItem('Booklist'));
        }
        return Booklist;
    }
    static addBook(book) {
        const Booklist = SaveData.getBooklist();
        Booklist.push(book);
        localStorage.setItem('Booklist', JSON.stringify(Booklist));
    }
    static removeBook(title) {
        const Booklist = SaveData.getBooklist();
        Booklist.forEach((book, index) => {
            if (book.title === title) {
                Booklist.splice(index, 1);
            }
        });
        localStorage.setItem('Booklist', JSON.stringify(Booklist));
    }
}

// EVENT LISTENERS

// load list on page open
document.addEventListener('DOMContentLoaded', Application.addToLibrary);

// open modal (to add book)
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
    document.querySelector(".title").focus();
});


closebtn.addEventListener('mouseup', function () {
    popup.classList.toggle('open');
});

document.querySelector('.library-container').addEventListener('click', (e) => {
    Application.removeBook(e.target);
    SaveData.removeBook(e.target.parentElement.querySelector('.title').textContent);
});

// form submit (add new book)
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = form.elements['title'].value;
    const author = form.elements['author'].value;
    const pages = form.elements['pages'].value;
    const status = form.elements['status'].value;
    // Validation
    if (title === '' || author === '' || pages === '') {
        Application.showValidationAlert('Please fill in all fields.', 'error');
    } else {
        // Instantiate book and add it
        const book = new Book(title, author, pages, status);
        Application.addBook(book);
        SaveData.addBook(book);
        Application.showValidationAlert(`(${book.title} by ${book.author}) added to list.`, 'success');
        document.getElementById("form").reset();
        popup.classList.toggle('open');
    }
});

const delbtn = document.querySelector('.delete-storage');
delbtn.addEventListener('mouseup', clearAll);

function clearAll() {
    localStorage.clear();
    window.location.reload();
}
