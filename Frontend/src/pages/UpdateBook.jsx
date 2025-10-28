import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBook = () => {
    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const getHeaders = () => ({
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:1000/api/v1/get-book/${id}`,
                    { headers: getHeaders() }
                );
                // Assuming the book data is directly in response.data
                setData(response.data); 
            } catch (error) {
                console.error("Error fetching book data:", error);
            }
        };
        fetchBook();
    }, [id]);

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            if (!Data.url || !Data.title || !Data.author || !Data.price || !Data.desc || !Data.language) {
                alert("All fields are required");
                return;
            }
            const response = await axios.put(
                `http://localhost:1000/api/v1/update-book/${id}`,
                Data,
                { headers: getHeaders() }
            );
            alert(response.data.message);
            navigate(`/view-book-details/${id}`);
        } catch (error) {
            alert(error.response?.data?.message || "An unexpected error occurred.");
        }
    };

    return (
        <div className="h-full bg-zinc-900 p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
                Update Book
            </h1>
            <div className="p-6 bg-zinc-800 rounded">
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label htmlFor="url" className="text-zinc-400">Image URL</label>
                        <input type="text" id="url" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none" placeholder="URL of image" name="url" required value={Data.url} onChange={change} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="text-zinc-400">Title of book</label>
                        <input type="text" id="title" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none" placeholder="Title of book" name="title" required value={Data.title} onChange={change} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="author" className="text-zinc-400">Author of book</label>
                        <input type="text" id="author" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none" placeholder="Author of book" name="author" required value={Data.author} onChange={change} />
                    </div>
                    <div className="mb-4 flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/2">
                            <label htmlFor="language" className="text-zinc-400">Language</label>
                            <input type="text" id="language" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none" placeholder="Language of book" name="language" required value={Data.language} onChange={change} />
                        </div>
                        <div className="w-full md:w-1/2">
                            <label htmlFor="price" className="text-zinc-400">Price</label>
                            <input type="number" id="price" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none" placeholder="Price of book" name="price" required value={Data.price} onChange={change} />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="desc" className="text-zinc-400">Description of book</label>
                        <textarea id="desc" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none" rows="5" placeholder="Description of book" name="desc" required value={Data.desc} onChange={change} />
                    </div>
                    <div>
                        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-all duration-300">
                            Update Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateBook;