import logo from '../../logo.svg';
import './App.css';
import React from "react";
import { Routes, Route, useParams, BrowserRouter, Navigate } from "react-router-dom";
import {Component} from "react";
import Books from '../Books/BookList/books';
import Categories from '../Categories/categories';
import Authors from '../Authors/authors';
import BookAdd from '../Books/BookAdd/bookAdd';
import BooksService from "../../repository/booksRepository";
import Header from "../Header/header";
import BookEdit from "../Books/BookEdit/bookEdit";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            authors: [],
            selectedBook: {}
        }
    }
    render() {
        return(

            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/books/add" element={<BookAdd categories={this.state.categories}
                          authors={this.state.authors} onAddBook={this.addBook}/>} />
                    <Route path="/books/edit/:id" element={<BookEdit categories={this.state.categories}
                          authors={this.state.authors} onEditBook={this.editBook} book={this.state.selectedBook}/>} />
                    <Route path="/" element={<Books books={this.state.books} onDelete={this.deleteBook} onEdit={this.getBook}
                                                         mark={this.markBook} />} />
                    <Route path="/categories" element={<Categories categories={this.state.categories} />}/>
                    <Route path="/authors" element={<Authors authors={this.state.authors} />}/>
                    {/*<Navigate to={"/books"}/>*/}
                </Routes>
            </BrowserRouter>
        )
    }

    loadBooks = () =>{
        BooksService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            })
    }

    loadCategories = () => {
        BooksService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            })
    }

    loadAuthors = () => {
        BooksService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            })
    }

    deleteBook = (id) => {
        BooksService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            })
    }
    markBook = (id) => {
        BooksService.markBook(id)
            .then(() => {
                this.loadBooks();
            })
    }
    addBook = (name, category, author, availableCopies) => {
        BooksService.addBook(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    getBook = (id) => {
        debugger
        BooksService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    editBook = (id, name, category, author, availableCopies) => {
        BooksService.editBook(id, name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    componentDidMount() {
        this.loadBooks();
        this.loadCategories();
        this.loadAuthors();
    }
}

export default App;
