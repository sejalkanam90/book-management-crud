import axios from 'axios';
import React, { useState } from 'react';

const FormHandling = () => {

    const [bookData, setBookData] = useState({
        id: "",
        name: "",
        author: "",
        price: ""
    });

    function handleChange(e) {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:8080/book",
                bookData   
            );

            console.log(res.data); 
            alert("Book Added Successfully");

        } catch (error) {
            console.error("Error adding book:", error);
            alert("Failed to add book");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="id"
                    placeholder="Book ID"
                    value={bookData.id}
                    onChange={handleChange}
                />
                <br />

                <input
                    type="text"
                    name="name"
                    placeholder="Book Name"
                    value={bookData.name}
                    onChange={handleChange}
                />
                <br />

                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={bookData.author}
                    onChange={handleChange}
                />
                <br />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={bookData.price}
                    onChange={handleChange}
                />
                <br />

                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default FormHandling;