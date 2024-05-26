import React, { useState, useEffect } from 'react';
import useProfile from '../Profile/useProfile';
import './profile.css';

const ProfileComponent = () => {
    const { profile, isLoading, error, updateProfile } = useProfile();
    const[ isEditing,setIsEditing] = useState(false);
    const[localProfile,setLocalProfile] = useState(profile);
    const [inputError,setInputError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

   useEffect(()=>
    {
        setLocalProfile(profile);
        },[profile])

    const handleInputChange = (e)=>
        {
            const{name,value} = e.target;
            setLocalProfile({...localProfile,[name]:value});
        };
        const handleSave = (e) => {
            e.preventDefault();
            updateProfile(localProfile)
              .then(() => {
                setSuccessMessage('Profile updated successfully!');
                setInputError('');
                setIsEditing(false);
              })
              .catch(setInputError);
          }
          return (
            <div className="container">
                <h1>Profile</h1>
                {successMessage && <p className="text-success">{successMessage}</p>}
                {error && <p className="text-danger">{error}</p>}
                {isLoading ? (
                    <p>Loading...</p>
                ) : isEditing ? (
                    <form onSubmit={handleSave}>
                        <div>
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={localProfile.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={localProfile.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={localProfile.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleInputChange}
                                placeholder="Enter new password if you want to change it"
                            />
                        </div>
                        <div className="form-buttons">
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                        {inputError && <span className="text-danger">{inputError}</span>}
                    </form>
                ) : (
                    <div className="profile-info">
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Username:</strong> {profile.username}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </div>
                )}
            </div>
        );
    };
export default ProfileComponent
