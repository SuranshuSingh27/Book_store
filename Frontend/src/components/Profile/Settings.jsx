import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.address || "" }); // Ensure address is not undefined
      } catch (error) {
        console.error("Failed to fetch user information:", error);
      }
    };
    fetch();
  }, []);

  const submitAddress = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/update-address",
        Value,
        { headers }
      );
      console.log(response);
      alert("Address updated successfully!"); // Or use a more sophisticated notification
    } catch (error) {
      console.error("Failed to update address:", error);
      alert("Failed to update address."); // Or use a more sophisticated notification
    }
  };

  return (
    <>
      {!ProfileData ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-full p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Username Section */}
            <div className="flex-1">
              <label htmlFor="username">Username</label>
              <p
                id="username"
                className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              >
                {ProfileData.username}
              </p>
            </div>

            {/* Email Section */}
            <div className="flex-1">
              <label htmlFor="email">Email</label>
              <p
                id="email"
                className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              >
                {ProfileData.email}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows="5"
              placeholder="Your address"
              name="address"
              value={Value.address}
              onChange={(e) => setValue({ ...Value, address: e.target.value })}
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              className="bg-yellow-500 text-zinc-900 font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition-all duration-300"
              onClick={submitAddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;

