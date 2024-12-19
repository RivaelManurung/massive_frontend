import React, { useState, useEffect } from 'react';
import imgprofile from "../assets/images-1.jpg"; // Placeholder image
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams

function Profile() {
  const { userId } = useParams(); // Get userId from the URL parameters
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    gender: '',
    birthDate: '',
    address: '',
    profilePicture: null,
  });

  const [isEditable, setIsEditable] = useState(false); // Track edit mode
  const [loading, setLoading] = useState(true); // Track loading state

  // Simulating fetching user profile data from API
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token"); // Get the token

      // Check if userId is valid before making the request
      if (!userId) {
        console.error("User ID is undefined or invalid");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data; // Assuming API returns the profile data
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]); // Re-run when userId changes

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({ ...profileData, profilePicture: file });
    }
  };

  // Handle Edit button click
  const handleEditClick = () => {
    setIsEditable(true);
  };

  // Handle Save button click
  const handleSaveClick = async () => {
    const formData = new FormData();
    formData.append("name", profileData.name);
    formData.append("email", profileData.email);
    if (profileData.profilePicture) {
      formData.append("profilePicture", profileData.profilePicture);
    }

    try {
      const response = await axios.put(`http://localhost:4000/api/updateProfile/${userId}`, formData); // Corrected the API method

      if (response.status === 200) {
        const data = response.data;
        console.log('Profile updated successfully', data);
        setProfileData(data); // Update profile data after successful update
        setIsEditable(false);
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading state while fetching data
  }

  return (
    <div className="max-w-4xl mx-auto my-6 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="flex items-center gap-6">
        {/* Profile Picture */}
        <div className="avatar">
          <div className="w-24 h-24 ring ring-primary ring-offset-2">
            <img
              src={profileData.profilePicture ? URL.createObjectURL(profileData.profilePicture) : imgprofile}
              alt="Profile"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col space-y-4 w-full">
          <div className="flex items-center gap-4">
            <label className="text-lg w-1/3">Nama</label>
            <input
              type="text"
              className="input input-bordered w-2/3"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              disabled={!isEditable}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="text-lg w-1/3">Email</label>
            <input
              type="email"
              className="input input-bordered w-2/3"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              disabled={!isEditable}
            />
          </div>

          {/* Profile Picture Upload */}
          <div className="flex items-center gap-4">
            <label className="text-lg w-1/3">Profile Picture</label>
            <input
              type="file"
              className="input input-bordered w-2/3"
              onChange={handleFileChange}
              disabled={!isEditable}
            />
          </div>
          
          {/* Edit and Save Buttons */}
          <div className="flex gap-4 mt-4">
            {isEditable ? (
              <button onClick={handleSaveClick} className="btn btn-primary">
                Save
              </button>
            ) : (
              <button onClick={handleEditClick} className="btn btn-secondary">
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
