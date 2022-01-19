class Books {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    dispayBooks(book) {
        let row = document.createElement('tr');
        row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td><a href="#" class="delete">X</td>
    `
        bookList.appendChild(row)
    }
    deleteBooks(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove()
        }
    }
}

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static showBooks() {
        const books = Store.getBooks();
        books.forEach(book => {
            const ui = new UI();
            ui.dispayBooks(book)
        });
    }
    static addBooks(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBooks(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        });
        localStorage.setItem('books', JSON.stringify(books));

    }
}
document.addEventListener('DOMContentLoaded', Store.showBooks)
let form = document.querySelector('.form');
let bookList = document.querySelector('.Book-list');
form.addEventListener('submit', (e) => {
    let title = document.getElementById('Title').value;
    let author = document.getElementById('Author').value;
    let isbn = document.getElementById('ISBN').value;
    let book = new Books(title, author, isbn);
    const ui = new UI();
   
    if ( title&&isbn&&author) {
        ui.dispayBooks(book);
        Store.addBooks(book)
    } else {
    alert('Please enter Valid data')        
    }
    e.preventDefault();
   
})

bookList.addEventListener('click', (e) => {
    let target = e.target;
    const ui = new UI();
    Store.removeBooks(target.parentElement.previousElementSibling.textContent)
    ui.deleteBooks(target);
    e.preventDefault();
})