const booklist = [];
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
};

Book.prototype.getInfo = function () {
    return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, reading status: ' + this.read + '.'
};

const Book1 = new Book('Thud', 'Terry Pratchett', '312', 'currently reading');
const Book2 = new Book('Going Postal', 'Terry Pratchett', '410', 'read');

const addbtn = document.querySelector('.book-add');
const closebtn = document.querySelector('.modal-close-btn');
const popup = document.querySelector('.book-modal');

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
    document.getElementById("form").reset();
    popup.classList.toggle('open');
});