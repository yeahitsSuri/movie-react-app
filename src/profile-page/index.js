import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logoutThunk, profileThunk, updateUserThunk} from "../services/auth-thunks";

/*
import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
                                                  username: String,
                                                  password: String,
                                                  role: String,
                                                  firstName: String,
                                                  lastName: String,
                                                  email: String,
    list: Array // for normal users, it's an array of favorite movies
    // for admin users, it's an array of movies to recommend on home page
    // this array contains id of movies
                                              }, {collection: "users"});

export default UsersSchema;
 */

function ProfilePage() {
    const {currentUser} = useSelector((state) => state.user);
    console.log(currentUser);
    const [profile, setProfile] = useState(currentUser);
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const save = async () => {
        await dispatch(updateUserThunk({userId: currentUser._id, user: profile}));
    };

    useEffect(() => {
        setProfile(currentUser);
    }, [currentUser]);

    useEffect(() => {
        async function fetchData() {
            const {payload} = await dispatch(profileThunk());
            console.log(payload);
            setProfile(payload);
        }

        fetchData();
    }, [dispatch]);

    return (
        <div>
            <h1>Profile Screen</h1><br/>
            {profile ? (
                         <div className="container">
                             {/* username */}
                             <div className="row mt-3">
                                 <div className="col-3">
                                     <label>Username</label>
                                 </div>
                                 <div className="col">
                                     <input className="form-control" type="text" value={profile.username}
                                            onChange={(event) => {
                                                const newProfile = {
                                                    ...profile, username: event.target.value,
                                                };
                                                setProfile(newProfile);
                                            }}
                                            disabled/>
                                     <span className="hint-text">Username cannot be changed.</span>
                                 </div>
                             </div>


                             {/* password */}
                             <div className="row mt-3">
                                 <div className="col-3">
                                     <label>Password</label>
                                 </div>
                                 <div className="col">
                                     <input
                                         className="form-control"
                                         // showPassword is false by default
                                         type={showPassword ? 'text' : 'password'}
                                         value={profile.password}
                                         onChange={(event) => {
                                             const newProfile = {
                                                 ...profile,
                                                 password: event.target.value,
                                             };
                                             setProfile(newProfile);
                                         }}
                                     />
                                     <div className="form-check">
                                         <input
                                             className="form-check-input"
                                             type="checkbox"
                                             checked={showPassword}
                                             onChange={(event) => setShowPassword(!showPassword)}
                                             id="showPasswordToggle"
                                         />
                                         <label className="form-check-label" htmlFor="showPasswordToggle">
                                             Show password
                                         </label>
                                     </div>
                                 </div>
                             </div>


                             {/* role */}
                             <div className="row mt-3">
                                 <div className="col-3">
                                     <label>Role</label>
                                 </div>
                                 <div className="col">
                                     <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                         <label className={`btn btn-secondary ${profile.role === 'User'
                                                                                ? 'active' : ''}`}>
                                             <input type="radio" name="roles" id="user"
                                                    checked={profile.role === "user"} disabled/>
                                             User
                                         </label>
                                         <label className={`btn btn-secondary ${profile.role === 'Admin'
                                                                                ? 'active' : ''}`}>
                                             <input type="radio" name="roles" id="admin"
                                                    checked={profile.role === 'admin'} disabled/>
                                             Admin
                                         </label>
                                     </div>
                                 </div>
                                 <span className="hint-text">Role cannot be changed.</span>
                             </div>

                             {/* first name */}
                             <div className="row mt-3">
                                 <div className="col-3">
                                     <label>First Name</label>
                                 </div>
                                 <div className="col">
                                     <input className="form-control" type="text" value={profile.firstName}
                                            onChange={(event) => {
                                                const newProfile = {
                                                    ...profile, firstName: event.target.value,
                                                };
                                                setProfile(newProfile);
                                            }}/>
                                     <div className="form-check">
                                         <input
                                             className="form-check-input"
                                             type="checkbox"
                                             checked={profile.showFirstName}
                                             onChange={(event) => {
                                                 const newProfile = {
                                                     ...profile,
                                                     showFirstName: event.target.checked
                                                 };
                                                 setProfile(newProfile);
                                             }}
                                             id="showFirstNameToggle"
                                         />
                                         <label className="form-check-label" htmlFor="showFirstNameToggle">
                                             Show first name in public
                                         </label>
                                     </div>
                                 </div>
                             </div>

                             {/* last name */}
                             <div className="row mt-3">
                                 <div className="col-3">
                                     <label>Last Name</label>
                                 </div>
                                 <div className="col">
                                     <input className="form-control" type="text" value={profile.lastName}
                                            onChange={(event) => {
                                                const newProfile = {
                                                    ...profile, lastName: event.target.value,
                                                };
                                                setProfile(newProfile);
                                            }}/>
                                     <div className="form-check">
                                         <input
                                             className="form-check-input"
                                             type="checkbox"
                                             checked={profile.showLastName}
                                             onChange={(event) => {
                                                 const newProfile = {
                                                     ...profile,
                                                     showLastName: event.target.checked
                                                 };
                                                 setProfile(newProfile);
                                             }}
                                             id="showLastNameToggle"
                                         />
                                         <label className="form-check-label" htmlFor="showLastNameToggle">
                                             Show last name in public
                                         </label>
                                     </div>
                                 </div>
                             </div>

                             {/* email */}
                             <div className="row mt-3">
                                 <div className="col-3">
                                     <label>Email</label>
                                 </div>
                                 <div className="col">
                                     <input className="form-control" type="text" value={profile.email}
                                            onChange={(event) => {
                                                const newProfile = {
                                                    ...profile, email: event.target.value,
                                                };
                                                setProfile(newProfile);
                                            }}/>
                                     <div className="form-check">
                                         <input
                                             className="form-check-input"
                                             type="checkbox"
                                             checked={profile.showEmail}
                                             onChange={(event) => {
                                                 const newProfile = {
                                                     ...profile,
                                                     showEmail: event.target.checked
                                                 };
                                                 setProfile(newProfile);
                                             }}
                                             id="showEmailToggle"
                                         />
                                         <label className="form-check-label" htmlFor="showEmailToggle">
                                             Show email in public
                                         </label>
                                     </div>
                                 </div>
                             </div>

                             {/* Log out button */}
                             <div className="row mt-3">
                                 <div className="col">
                                     <button className="btn btn-danger" onClick={() => {
                                         dispatch(logoutThunk());
                                         localStorage.setItem("last-search", "");
                                         navigate("/login");
                                     }}>
                                         Logout
                                     </button>
                                 </div>
                             </div>

                             {/* Save button */}
                             <div className="row mt-3">
                                 <div className="col">
                                     <button className="btn btn-primary" onClick={save}>Save</button>
                                 </div>
                             </div>
                         </div>
                     ) :
             <div>
                 <h3>You have not Login or Register.</h3>
             </div>
            }
        </div>
    );
}

export default ProfilePage;