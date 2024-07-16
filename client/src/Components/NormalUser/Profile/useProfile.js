
import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosSetup";

const useProfile = (userId) => {
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //Fetching the profile data is the userId is not null
  useEffect(() => {
    if (userId !== null) {
      fetchProfile(userId);
    }
  }, [userId]);
  //Fetching the profile of the user
  const fetchProfile = (id) => {
    setIsLoading(true);
    axiosInstance
      .get(`/user/${id ? id : "profile"}`)
      .then((response) => {
        setProfile(response.data.user);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error fetching profile");
        setIsLoading(false);
      });
  };
  //Function to update the profile data of the user
  const updateProfile = (profileData) => {
    setIsLoading(true);
    return axiosInstance.put("/user/profile", profileData).then((response) => {
      setProfile(response.data.user);
      setError("");
      setIsLoading(false);
    });
  };
//  // Function to  delete the profile of the user
//   const deleteProfile = (id) => {
//     setIsLoading(true);
//     axiosInstance
//       .delete(`/user/${id}`)
//       .then(() => {
//         setProfile({});
//         setError("");
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         setError("Failed to delete  profile");
//         setIsLoading(false);
//       });
//   };
  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
    // deleteProfile,
  };
};
export default useProfile;
