import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useNavigate, useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
    const { id } = useParams();
    const [Data, setData] = useState(null); // Initialize state as null
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:1000/api/v1/get-book-by-id/${id}`
                );
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };
        fetchData();
    }, [id]);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const handleFavourite = async () => {
        try {
            const response = await axios.put(
                "http://localhost:1000/api/v1/add-book-to-favourite",
                {},
                { headers }
            );
            alert(response.data.message);
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };

    const handleCart = async () => {
        try {
            const response = await axios.put(
                "http://localhost:1000/api/v1/add-to-cart",
                {},
                { headers }
            );
            alert(response.data.message);
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };

    const deleteBook = async () => {
        try {
            const response = await axios.delete(
                "http://localhost:1000/api/v1/delete-book",
                { headers }
            );
            alert(response.data.message);
            navigate("/all-books");
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };

    // Show loader if Data is not yet fetched
    if (!Data) {
        return (
            <div className="h-screen bg-zinc-900 flex items-center justify-center">
                <Loader />
            </div>
        );
    }
    
    return (
        <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 min-h-screen'>
            <div className='w-full lg:w-3/6 h-[50vh] md:h-[88vh] bg-zinc-800 rounded flex items-center justify-center'>
                <div className="flex items-center justify-center h-full w-full relative p-4">
                    <img src={Data.url} alt={Data.title} className="max-h-full max-w-full object-contain" />

                    <div className="absolute top-4 right-4 md:top-auto md:right-auto md:relative md:ml-4 flex md:flex-col gap-4">
                        {isLoggedIn && role === "user" && (
                            <>
                                <button className="bg-white rounded-full text-2xl p-3 text-red-500 hover:bg-gray-200 transition-all" onClick={handleFavourite}>
                                    <FaHeart />
                                </button>
                                <button className="bg-white rounded-full text-2xl p-3 text-blue-500 hover:bg-gray-200 transition-all" onClick={handleCart}>
                                    <FaShoppingCart />
                                </button>
                            </>
                        )}
                        {isLoggedIn && role === "admin" && (
                            <>
                                {/*<button
                                    className="bg-white rounded-full text-2xl p-3 text-green-500 hover:bg-gray-200 transition-all"
                                    onClick={() => navigate(`/update-book/${id}`)} // This is the fix
                                >
                                    <FaEdit />
                                </button>*/}
                                <button className="bg-white rounded-full text-2xl p-3 text-red-500 hover:bg-gray-200 transition-all" onClick={deleteBook}>
                                    <MdOutlineDelete />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className='w-full lg:w-3/6 p-4 text-zinc-300'>
                <h1 className="text-3xl md:text-4xl font-semibold">{Data.title}</h1>
                <p className="text-zinc-400 mt-1">by {Data.author}</p>
                <p className="text-zinc-500 mt-4 text-lg">{Data.desc}</p>
                <p className="flex mt-4 items-center">
                    <GrLanguage className="mr-3" /> {Data.language}
                </p>
                <p className="mt-4 text-3xl font-semibold">
                    Price: ₹ {Data.price}
                </p>
            </div>
        </div>
    );
};

export default ViewBookDetails;