import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader"; // Assuming you have a Loader component

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-favourite-books",
          { headers }
        );
        setFavouriteBooks(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch favourites:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };
    fetch();
  }, [favouriteBooks]);

  if (loading) {
    return (
      <div className="h-screen bg-zinc-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 bg-zinc-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">Your Favourites</h1>

      {favouriteBooks.length === 0 && (
        <p className="text-zinc-400">You have no favourite books yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {favouriteBooks.map((book) => (
          <BookCard
            key={book._id}
            data={book}
            favourite={true} // The crucial prop is now added
          />
        ))}
      </div>
    </div>
  );
};

export default Favourites;