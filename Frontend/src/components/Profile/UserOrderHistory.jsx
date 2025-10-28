import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-order-history",
          { headers }
        );
        
        // THE FINAL FIX: Get the array from response.data.data
        setOrderHistory(response.data.data);

      } catch (error) {
        console.error("Error fetching order history:", error);
        setOrderHistory([]); 
      }
    };

    fetchHistory();
  }, []);

  // The rest of your JSX remains the same
  return (
    <div className="min-h-screen p-4 md:p-8 bg-zinc-900 text-white">
      {OrderHistory === null && (
        <div className="w-full flex items-center justify-center h-[80vh]">
          <Loader />
        </div>
      )}

      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-zinc-500 mb-8">
            No Order History
          </h1>
          <img
            src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
            alt="No orders found"
            className="h-[20vh] mb-8"
          />
        </div>
      )}

      {OrderHistory && OrderHistory.length > 0 && (
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-300 mb-8">
            Your Order History
          </h1>

          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 font-semibold hidden md:flex gap-2">
            <div className="w-[5%] text-center">Sr.</div>
            <div className="w-[30%]">Books</div>
            <div className="w-[30%]">Description</div>
            <div className="w-[10%]">Price</div>
            <div className="w-[15%]">Status</div>
            <div className="w-[10%]">Mode</div>
          </div>

          <div className="mt-4 space-y-4">
            {OrderHistory.map((items, i) => (
              <div
                key={i}
                className="bg-zinc-800 w-full rounded p-4 md:flex md:gap-2 md:items-center hover:bg-zinc-900 transition-all duration-300"
              >
                <div className="hidden md:flex w-full items-center gap-2">
                    <div className="w-[5%] text-center">
                        <h1 className="text-zinc-400">{i + 1}</h1>
                    </div>
                    <div className="w-[30%]">
                        <Link
                          to={`/view-book-details/${items.book?._id}`}
                          className="hover:text-blue-300"
                        >
                          {items.book?.title || "Book not available"}
                        </Link>
                    </div>
                    <div className="w-[30%]">
                        <h1 className="text-zinc-400">
                          {(items.book?.desc || "").slice(0, 40)}...
                        </h1>
                    </div>
                    <div className="w-[10%]">
                        <h1>₹ {items.book?.price}</h1>
                    </div>
                    <div className="w-[15%]">
                        <h1 className={`font-semibold ${
                            items.status === "Order placed" ? "text-green-500" :
                            items.status === "Canceled" ? "text-red-500" :
                            "text-yellow-500"
                        }`}>
                        {items.status}
                        </h1>
                    </div>
                    <div className="w-[10%]">
                        <h1 className="text-sm text-zinc-400">COD</h1>
                    </div>
                </div>

                <div className="md:hidden flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <h1 className="text-zinc-300 font-semibold">Order #{i + 1}</h1>
                    <h1 className={`font-semibold text-sm px-2 py-1 rounded ${
                        items.status === "Order placed" ? "bg-green-800 text-green-300" :
                        items.status === "Canceled" ? "bg-red-800 text-red-300" :
                        "bg-yellow-800 text-yellow-300"
                    }`}>
                      {items.status}
                    </h1>
                  </div>
                  <div className="mt-2 border-t border-zinc-700 pt-2">
                    <Link
                      to={`/view-book-details/${items.book?._id}`}
                      className="hover:text-blue-300 font-semibold text-lg"
                    >
                      {items.book?.title || "Book not available"}
                    </Link>
                    <p className="text-zinc-400 mt-1">
                      {(items.book?.desc || "").slice(0, 60)}...
                    </p>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <h2 className="text-xl font-bold">₹ {items.book?.price}</h2>
                    <p className="text-sm text-zinc-400">Mode: COD</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;