import React from "react";
import {useNavigate} from 'react-router-dom';
import axios from "../../../custom-axios/axios";

const BookAdd = (props) => {

    const history = useNavigate();
    const [formData, updateFormData] = React.useState({
        name: "",
        category: "NOVEL",
        author: 1,
        availableCopies: 0
    })

    const {name, category, author, availableCopies} = formData;

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        await axios.post("/books/add", formData);
        window.location.href = "/";
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
                                   value={name}
                                   onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label>Category</label>
                            <select name="category" className="form-control" value={category} onChange={handleChange}>
                                {props.categories.map((term) =>
                                    <option value={term}>{term}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group mt-2">
                            <label>Author</label>
                            <select name="author" className="form-control" value={author} onChange={handleChange}>
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
                                   value={availableCopies}
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