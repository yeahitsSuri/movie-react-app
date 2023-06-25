import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileThunk, logoutThunk, updateUserThunk }
  from "../services/auth-thunks";

function ProfilePage() {
 const { currentUser } = useSelector((state) => state.user);
 const [profile, setProfile] = useState(currentUser);

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
},[dispatch]);

 return ( 
  <div>
    <h1>Profile Screen</h1><br/>
    {profile ? (
        <div className="container">
            <div className="row mt-3">
                <div className="col-3">
                    <label>First Name</label>
                </div>
                <div className="col">
                    <input className="form-control" type="text" value={profile.firstName} onChange={(event) => {
                        const newProfile = {
                            ...profile, firstName: event.target.value,
                        };
                        setProfile(newProfile);
                    }}/>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-3">
                    <label>Last Name</label>
                </div>
                <div className="col">
                    <input className="form-control" type="text" value={profile.lastName} onChange={(event) => {
                        const newProfile = {
                            ...profile, lastName: event.target.value,
                        };
                        setProfile(newProfile);
                    }}/>
                </div>
            </div>
            <div className="row mt-3">
            <div className="col">
                <button className="btn btn-danger" onClick={() => {
                    dispatch(logoutThunk());
                    navigate("/tuiter/login");
                }}>                   
                    Logout
                </button>
            </div>
            </div>
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
};
export default ProfilePage;