// GET SOME ELEMENT CONSTANTS
const addbtn = document.querySelector('.book-add');
const closebtn = document.querySelector('.modal-close-btn');
const popup = document.querySelector('.book-modal');
window.edit = false;
window.bookselection = '';
let counter = 0;


// BOOK CLASS
class Book {
    constructor(title, author, pages, status) {
        this.title = title
        this.author = author
        this.pages = pages
        this.status = status
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
            <table><tr>
            <td class="left-field">Title:</td>
            <td class="displayed-values-title">${book.title}</td>
            </tr><tr>
            <td class="left-field">Author:</td>
            <td class="displayed-values-author">${book.author}</td>
            </tr><tr>
            <td class="left-field">Pages:</td>
            <td class="displayed-values-pages">${book.pages}</td>
            </tr><tr>
            <td class="left-field">status?</td>
            <td class="displayed-values-status">${book.status}</td>
            </tr></table>
            <div class="divider"></div>
            <button class="edit-book">Edit</button>
            <button class="delete-book">Delete</button>
            </div>
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
            titleField.value = `${e.parentElement.querySelector('.displayed-values-title').textContent}`;
            const authorField = form.querySelector('.author');
            authorField.value = `${e.parentElement.querySelector('.displayed-values-author').textContent}`;
            const pagesField = form.querySelector('.pages');
            pagesField.value = `${e.parentElement.querySelector('.displayed-values-pages').textContent}`;
            const statusField = form.querySelector('.status');
            statusField.value = `${e.parentElement.querySelector('.displayed-values-status').textContent}`;
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
            <table><tr>
            <td class="left-field">Title:</td>
            <td class="displayed-values-title">${title}</td>
            </tr><tr>
            <td class="left-field">Author:</td>
            <td class="displayed-values-author">${author}</td>
            </tr><tr>
            <td class="left-field">Pages:</td>
            <td class="displayed-values-pages">${pages}</td>
            </tr><tr>
            <td class="left-field">status?</td>
            <td class="displayed-values-status">${status}</td>
            </tr></table>
            <div class="divider"></div>
            <button class="edit-book">Edit</button>
            <button class="delete-book">Delete</button>
            </div>
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
    window.bookselection = e.target.parentElement.querySelector('.displayed-values-title').textContent;
    SaveData.removeBook(e.target.parentElement.querySelector('.displayed-values-title').textContent);
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
            SaveData.removeBook(window.bookselection);
            const book = new Book(title, author, pages, status);
            SaveData.addBook(book);
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
