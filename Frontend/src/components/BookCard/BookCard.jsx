import React from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios if you plan to make an API call

const BookCard = ({ data, favourite }) => {
  // Add a guard clause for safety, in case data is not yet available
  if (!data) {
    return null;
  }

  // Define the handleRemoveBook function
  const handleRemoveBook = async () => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
      bookid: data._id, // Pass the book ID in headers
    };

    // In a real app, you would make an API call here
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/remove-book-from-favourite",
        {},
        { headers }
      );
      alert(response.data.message);
      // You might want to refresh the parent component's list after removal
    } catch (error) {
      console.error("Failed to remove book:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-zinc-800 rounded-lg p-4 flex flex-col justify-between text-white shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* The Link now only wraps the clickable content area */}
      <Link to={`/view-book-details/${data._id}`}>
        <div className="w-full h-56 flex items-center justify-center bg-zinc-900 rounded">
          <img
            src={data.url}
            alt={data.title}
            className="max-w-full max-h-full object-contain rounded"
          />
        </div>
        <h2 className="text-xl font-semibold mt-4 truncate" title={data.title}>
          {data.title}
        </h2>
        <p className="text-zinc-400 mt-1">by {data.author}</p>
        <p className="text-2xl font-bold mt-2">₹ {data.price}</p>
      </Link>

      {/* The button is now outside the Link and only renders if 'favourite' is true */}
      {favourite && (
        <button
          className="bg-yellow-50 text-yellow-600 px-4 py-2 rounded border border-yellow-500 mt-4 w-full hover:bg-yellow-100 font-semibold transition-all duration-300"
          onClick={handleRemoveBook}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;