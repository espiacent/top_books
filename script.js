// GET SOME ELEMENT CONSTANTS
const addbtn = document.querySelector('.book-add');
const closebtn = document.querySelector('.modal-close-btn');
const popup = document.querySelector('.book-modal');
window.edit = false;
let counter = 0;


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
        box.className = `book-box-${counter}`;
        box.innerHTML = `
                <p class="title">${book.title}</p>
                <p class="author">${book.author}</p>
                <p class="pages">${book.pages}</p>
                <p class="read">${book.read}</p>
                <button class="edit-book">Edit</button>
                <button class="delete-book">Delete</button>
                `;
        library.appendChild(box);
        counter++
    }
    static removeBook(e) {
        if (e.classList.contains('delete-book')) {
            e.parentElement.remove();
            Application.showValidationAlert('REMOVED FROM LIBRARY', 'success');
        }
    }
    static editBook(e) {
        if (e.classList.contains('edit-book')) {
            // get form fields and fill with current values
            const form = document.querySelector('form');
            const titleField = form.querySelector('.title');
            titleField.value = `${e.parentElement.querySelector('.title').textContent}`;
            const authorField = form.querySelector('.author');
            authorField.value = `${e.parentElement.querySelector('.author').textContent}`;
            const pagesField = form.querySelector('.pages');
            pagesField.value = `${e.parentElement.querySelector('.pages').textContent}`;
            const readField = form.querySelector('.status');
            readField.value = `${e.parentElement.querySelector('.read').textContent}`;
            // const readField = form.querySelector(`.${ e.parentElement.querySelector('.read').textContent } `);
            // readField.setAttribute('selected', '');
            // on submit form, change changed values in box
            window.bookbox = e.parentElement.className;
            // on submit also close window and clear values
            window.edit = true;
            const header = document.querySelector('.modal-header');
            header.textContent = 'Edit Book';
            const button = document.getElementById('modal-btn');
            button.textContent = 'Save Changes';
            popup.classList.toggle('open');
        }
    }
    static updateBook(title, author, pages, status, bookbox) {
        const box = document.querySelector(`.${bookbox}`);
        box.innerHTML = `
                <p class="title">${title}</p>
                <p class="author">${author}</p>
                <p class="pages">${pages}</p>
                <p class="read">${status}</p>
                <button class="edit-book">Edit</button>
                <button class="delete-book">Delete</button>
            `;
    }
    static showValidationAlert(message, classname) {
        const alertbox = document.createElement('div');
        alertbox.className = `alertbox ${classname} `;
        alertbox.appendChild(document.createTextNode(message));
        const container = document.querySelector('.alert-container');
        const small = document.querySelector('small');
        container.insertBefore(alertbox, small);
        setTimeout(() => document.querySelector('.alertbox').remove(), 2000);
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

// open and close modal (to add book)
window.addEventListener('click', function (e) {
    if (e.target == popup) {
        const header = document.querySelector('.modal-header');
        header.textContent = 'New Book';
        const button = document.getElementById('modal-btn');
        button.textContent = 'Add Book';
        document.getElementById("form").reset();
        popup.classList.toggle('open');
    }
});

window.addEventListener('keyup', function (e) {
    if (e.key === 'Escape') {
        popup.classList.remove('open');
        const header = document.querySelector('.modal-header');
        header.textContent = 'New Book';
        const button = document.getElementById('modal-btn');
        button.textContent = 'Add Book';
        document.getElementById("form").reset();
    }
});

addbtn.addEventListener('mouseup', function () {
    popup.classList.toggle('open');
    document.querySelector(".title").focus();
});


closebtn.addEventListener('mouseup', function () {
    const header = document.querySelector('.modal-header');
    header.textContent = 'New Book';
    const button = document.getElementById('modal-btn');
    button.textContent = 'Add Book';
    document.getElementById("form").reset();
    popup.classList.toggle('open');
});

// edit and delete button in book box
document.querySelector('.library-container').addEventListener('click', (e) => {
    Application.editBook(e.target);
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
        Application.showValidationAlert('PLEASE FILL IN ALL FIELDS', 'error');
    } else {
        if (window.edit == false) {
            // Instantiate book and add it
            const book = new Book(title, author, pages, status);
            Application.addBook(book);
            SaveData.addBook(book);
            Application.showValidationAlert('ADDED TO LIBRARY', 'success');
            document.getElementById("form").reset();

            popup.classList.toggle('open');
        } if (window.edit == true) {
            const bookbox = window.bookbox;
            Application.updateBook(title, author, pages, status, bookbox);
            Application.showValidationAlert('CHANGES SAVED', 'success');
            document.getElementById("form").reset();
            window.edit = false;
            popup.classList.toggle('open');
            const header = document.querySelector('.modal-header');
            header.textContent = 'New Book';
            const button = document.getElementById('modal-btn');
            button.textContent = 'Add Book';
        }
    }
});

const delbtn = document.querySelector('.delete-storage');
delbtn.addEventListener('mouseup', clearAll);

function clearAll() {
    localStorage.clear();
    window.location.reload();
}
