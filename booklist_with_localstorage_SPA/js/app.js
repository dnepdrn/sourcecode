// Book Class
class Book {
    constructor(title, author, isbn) {
        Object.assign(this, {title, author, isbn})
    };
}

// UI Class
class UI {
    // 객체데이터 데모
    // static displayBooks() {
    //     const StoredBooks = [
    //         {
    //             title: 'Book one',
    //             author: 'John Doe',
    //             isbn: '343434'
    //         },
    //         {
    //             title: 'Book two',
    //             author: 'Jane Doe',
    //             isbn: '454545'
    //         }
    //     ];
    //     const books = StoredBooks;
    //     // UI.addBookToList(StoredBooks)
    //     books.forEach((book) => UI.addBookToList(book));
    // }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list')
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        // 3초뒤 메세지 삭제
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

// Store Class
class Store {
    static getBooks() {
        let books
        localStorage.getItem('books') ? books = JSON.parse(localStorage.getItem('books')) : books = []
        return books
    }
    static addBook(book) {
        const books = Store.getBooks();
        console.log(book, 'book')
        console.log(books, 'books')
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books))
    }
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            console.log(book, index)
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: 디스플레이
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: 책추가
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // submit 기능 비활성화
    e.preventDefault();
    // value 값
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    // 유효성 검사
    if(title === '' || author === '' || isbn === '') {
        // 실패 메세지
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        const book = new Book(title, author, isbn);
        // class UI에 추가
        UI.addBookToList(book);
        // class Store에 추가
        Store.addBook(book)
        // value 값 비우기
        UI.clearFields();
        // 성공알림
        UI.showAlert('Book Added', 'success');
    }
})

// Event: 책지우기
document.querySelector('#book-list').addEventListener('click',(e) => {
    // class UI 에서 제거
    UI.deleteBook(e.target)
    // class UI 에서 제거
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // 제거 메세지
    UI.showAlert('Book Removed', 'success')
})


