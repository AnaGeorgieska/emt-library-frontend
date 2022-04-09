import React from "react";
import {useNavigate} from 'react-router-dom';

const BookAdd = (props) => {

    const history = useNavigate();
    const [formData, updateFormData] = React.useState({
        name: "",
        category: "NOVEL",
        author: 1,
        availableCopies: 0
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name;
        const category = formData.category;
        const author = formData.author;
        const availableCopies = formData.availableCopies;

        props.onAddBook(name, category, author, availableCopies);
        window.location.href = "/"
    }

    return (
        <div className="container mm-4 mt-5">
            <div className="row mt-5">
                <div className="col-md-5">
                    <form onSubmit={onFormSubmit}>
                        <div className="form-group mt-2">
                            <label htmlFor="name">Book name</label>
                            <input type="text"
                                   className="form-control"
                                   id="name"
                                   name="name"
                                   required
                                   placeholder="Enter book name"
                                   onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label>Category</label>
                            <select name="category" className="form-control" onChange={handleChange}>
                                {props.categories.map((term) =>
                                    <option value={term}>{term}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group mt-2">
                            <label>Author</label>
                            <select name="author" className="form-control" onChange={handleChange}>
                                {props.authors.map((term) =>
                                    <option value={term.id}>{term.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="availableCopies">Available copies</label>
                            <input type="text"
                                   className="form-control"
                                   id="availableCopies"
                                   name="availableCopies"
                                   placeholder="Available copies"
                                   required
                                   onChange={handleChange}
                            />
                        </div>
                        <button id="submit" type="submit" className="btn btn-primary mt-2">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BookAdd;