import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/SideBar";
import { Outlet } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

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
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-auto py-8 gap-4 text-white">
      {!profileData ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="w-1/6">
            <Sidebar data={profileData} />
            
          </div>
          <div className="w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;