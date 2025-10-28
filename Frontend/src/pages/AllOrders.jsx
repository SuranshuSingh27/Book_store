import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { FaUserLarge, FaCheck } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";

const AllOrders = () => {
    const [orders, setOrders] = useState(null);
    const [optionsIndex, setOptionsIndex] = useState(-1);
    const [userDiv, setUserDiv] = useState(null);
    const [userDivData, setUserDivData] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    // In your AllOrders.js component

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:1000/api/v1/get-all-orders",
                    { headers }
                );

                // Add this filter to the frontend
                const allOrders = response.data.data;
                const validOrders = allOrders.filter(order => order.book !== null);
                setOrders(validOrders);

            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

    const handleOptionsToggle = (i, currentStatus) => {
        setOptionsIndex(i === optionsIndex ? -1 : i);
        setNewStatus(currentStatus);
    };

    const handleStatusUpdate = async (orderId) => {
        try {
            await axios.put(
                `http://localhost:1000/api/v1/update-status/${orderId}`,
                { status: newStatus },
                { headers }
            );
            alert("Status updated successfully!");
            setOptionsIndex(-1);
            fetchOrders(); // Refresh the orders list to show the change
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status.");
        }
    };

    return (
        <>
            {!orders && (
                <div className="h-screen flex items-center justify-center bg-zinc-900">
                    <Loader />
                </div>
            )}

            {/* User Details Popup */}
            {userDiv && userDivData && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-20">
                    <div className="bg-zinc-800 p-6 rounded text-white w-full max-w-md">
                        <h2 className="text-2xl font-semibold mb-4">User Details</h2>
                        {/* IMPORTANT: Check your console to confirm the correct property names here */}
                        <p><strong>Name:</strong> {userDivData?.name || "N/A"}</p>
                        <p><strong>Email:</strong> {userDivData?.email || "N/A"}</p>
                        <p><strong>Address:</strong> {userDivData?.address || "N/A"}</p>
                        <button onClick={() => setUserDiv(null)} className="mt-4 bg-red-500 px-4 py-2 rounded">Close</button>
                    </div>
                </div>
            )}

            {orders && (
                <div className="p-4 md:p-8 text-zinc-100 min-h-screen bg-zinc-900">
                    <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
                        All Orders
                    </h1>

                    {/* Table Header */}
                    <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 hidden md:flex gap-2 font-semibold">
                        <div className="w-[3%] text-center">Sr.</div>
                        <div className="w-[22%]">Books</div>
                        <div className="w-[45%]">Description</div>
                        <div className="w-[9%]">Price</div>
                        <div className="w-[16%]">Status</div>
                        <div className="w-[5%] text-center">User</div>
                    </div>

                    {/* Orders List */}
                    <div className="mt-4 space-y-4">
                        {orders.map((items, i) => (
                            <div key={i} className="bg-zinc-800 w-full rounded p-4 md:flex md:gap-2 items-start hover:bg-zinc-700 transition-all duration-300">
                                <div className="w-[3%] text-center pt-2">{i + 1}</div>
                                <div className="w-[22%] pt-2">
                                    <Link
                                        to={`/view-book-details/${items.book?._id}`}
                                        className="hover:text-blue-300 font-semibold"
                                    >
                                        {items.book?.title || "Book Not Available"}
                                    </Link>
                                </div>
                                <div className="w-[45%] text-zinc-400 pt-2">
                                    {(items.book?.desc || "").slice(0, 50)}...
                                </div>
                                <div className="w-[9%] pt-2">₹ {items.book?.price}</div>
                                <div className="w-[16%]">
                                    <div className="font-semibold">
                                        <button
                                            className="hover:scale-105 transition-all duration-300 text-left"
                                            onClick={() => handleOptionsToggle(i, items.status)}
                                        >
                                            {items.status === "Order placed" ? (
                                                <div className="text-yellow-500">{items.status}</div>
                                            ) : items.status === "Canceled" ? (
                                                <div className="text-red-500">{items.status}</div>
                                            ) : (
                                                <div className="text-green-500">{items.status}</div>
                                            )}
                                        </button>
                                    </div>
                                    {optionsIndex === i && (
                                        <div className="flex mt-2">
                                            <select
                                                name="status"
                                                className="bg-zinc-900 rounded px-2 py-1"
                                                value={newStatus}
                                                onChange={(e) => setNewStatus(e.target.value)}
                                            >
                                                {["Order placed", "Out for delivery", "Delivered", "Canceled"]
                                                    .map((statusOption, index) => (
                                                        <option value={statusOption} key={index}>
                                                            {statusOption}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                            <button
                                                className="text-green-500 hover:text-pink-600 mx-2 text-2xl"
                                                onClick={() => handleStatusUpdate(items._id)}
                                            >
                                                <FaCheck />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="w-[5%] text-center pt-2">
                                    <button
                                        className="text-xl hover:text-orange-500"
                                        onClick={() => {
                                            setUserDiv("fixed");
                                            setUserDivData(items.user);
                                        }}
                                    >
                                        <IoOpenOutline />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default AllOrders;