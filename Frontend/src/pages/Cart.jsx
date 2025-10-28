import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import { BsCartXFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true); // Added loading state for a better UX

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1000/api/v1/get-user-cart",
          { headers }
        );
        setCartItems(res.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false); // Stop loading in any case
      }
    };
    fetchCart();
  }, []);

  const deleteItem = async (bookid) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v1/remove-from-cart/${bookid}`,
        {},
        { headers }
      );
      const updatedCart = cartItems.filter((item) => item._id !== bookid);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(() => {
    if (cartItems) {
      let currentTotal = 0;
      cartItems.forEach((item) => {
        currentTotal += item.price;
      });
      setTotal(currentTotal);
    }
  }, [cartItems]);

  const placeOrder = async () => {
    try {
      await axios.post(
        `http://localhost:1000/api/v1/place-order`,
        { order: cartItems },
        { headers }
      );
      // 1. Shows alert and waits for the user to click "OK"
      alert("Your order has been placed successfully!");
      
      // 2. Navigates to the order history page only after the alert is closed
      setCartItems([]);
      navigate("/profile/orderHistory");
      
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Render Loader while fetching data
  if (loading) {
    return (
      <div className="bg-zinc-900 min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 px-4 md:px-12 min-h-screen py-8 text-white">
      {cartItems && cartItems.length === 0 && (
        <div className="min-h-[80vh] flex items-center justify-center flex-col text-center">
          <h1 className="text-4xl lg:text-5xl font-semibold text-zinc-300 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-zinc-400 mb-8">
            Looks like you haven't added anything yet. Let's get shopping!
          </p>
          <div className="mb-8">
            <BsCartXFill className="text-8xl text-zinc-500" />
          </div>
          <button 
            className="bg-blue-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-blue-700 transition-all duration-300"
            onClick={() => navigate("/")}
          >
            Shop Now
          </button>
        </div>
      )}

      {cartItems && cartItems.length > 0 && (
        <>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-8">Your Shopping Cart</h1>
          
          {/* Cart Items Container */}
          <div className="space-y-4">
            {cartItems.map((item, i) => (
              <div
                className="w-full rounded-lg flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center border-b border-zinc-700 last:border-b-0"
                key={item._id || i}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-36 w-24 md:h-28 md:w-20 object-cover rounded-md shadow-md"
                />
                <div className="w-full md:w-3/5 text-center md:text-left mt-4 md:mt-0 md:ml-6">
                  <h2 className="text-xl md:text-2xl text-white font-semibold">
                    {item.title}
                  </h2>
                  <p className="text-zinc-400 mt-1 hidden md:block">
                    {item.desc.slice(0, 100)}...
                  </p>
                  <p className="text-zinc-400 mt-1 md:hidden">
                    {item.author}
                  </p>
                </div>
                <div className="flex mt-4 md:mt-0 w-full md:w-auto items-center justify-between md:justify-start">
                  <h2 className="text-zinc-100 text-2xl md:text-3xl font-bold">
                    ₹ {item.price}
                  </h2>
                  <button
                    className="text-red-500 hover:text-white hover:bg-red-600 rounded-full p-3 ml-8 transition-all duration-300"
                    onClick={() => deleteItem(item._id)}
                  >
                    <AiFillDelete size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-12 flex justify-end">
            <div className="p-6 bg-zinc-800 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl text-zinc-100 font-semibold mb-4">
                Order Summary
              </h2>
              <div className="flex items-center justify-between text-lg text-zinc-300 border-b border-zinc-700 pb-2">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-semibold">₹ {total}</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-xl text-white font-bold">
                <span>Total Amount</span>
                <span>₹ {total}</span>
              </div>
              <div className="w-full mt-6">
                <button
                  className="bg-blue-600 text-white font-bold rounded-lg py-3 w-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                  onClick={placeOrder}
                >
                  Place Your Order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;