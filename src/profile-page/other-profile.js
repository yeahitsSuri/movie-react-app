// this is used to render other people's profile page
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import MovieList from "../components/MovieList";
import {addToList} from "../search-page";
import {useDispatch, useSelector} from "react-redux";
import AddFavorites from "../components/AddFavorites";
import {removeFavoriteMovie} from "../home-page/HomePage";
import RemoveFavorites from "../components/RemoveFavorites";

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USERS_URL = `${SERVER_API_URL}/api/users`;

const OtherProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const {currentUser} = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const url = `${USERS_URL}/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            setUserData(data);
            setLoading(false);
        };

        fetchUserDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>This user doesn't exist!</div>;
    }

    const handleRemoveFavoritesClick = (movie) => {
        removeFavoriteMovie(movie, currentUser, dispatch);
    }

    const handleAddFavoritesClick = (movie) => {
        addToList(movie, currentUser, dispatch, navigate);
    }

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-3">
                    <label>Username</label>
                </div>
                <div className="col-9">
                    <input className="form-control" type="text" value={userData.username} disabled/>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-3">
                    <label>Role</label>
                </div>
                <div className="col">
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        <label className={`btn btn-secondary`}>
                            <input type="radio" name="roles" id="user"
                                   checked={userData.role === "user"} disabled/>
                            User
                        </label>
                        <label className={`btn btn-secondary`}>
                            <input type="radio" name="roles" id="admin"
                                   checked={userData.role === 'admin'} disabled/>
                            Admin
                        </label>
                    </div>
                </div>
            </div>

            {userData.showFirstName &&
             <div className="row mt-3">
                 <div className="col-3">
                     <label>First Name</label>
                 </div>
                 <div className="col-9">
                     <input className="form-control" type="text" value={userData.firstName}
                            disabled/>
                 </div>
             </div>}

            {userData.showLastName &&
             <div className="row mt-3">
                 <div className="col-3">
                     <label>Last Name</label>
                 </div>
                 <div className="col-9">
                     <input className="form-control" type="text" value={userData.lastName}
                            disabled/>
                 </div>
             </div>}

            {userData.showEmail &&
             <div className="row mt-3">
                 <div className="col-3">
                     <label>Email</label>
                 </div>
                 <div className="col-9">
                     <input className="form-control" type="text" value={userData.email} disabled/>
                 </div>
             </div>}

            {userData.showList &&
             <div className="row mt-3">
                 <h3>Their Favorites</h3>
                 <MovieList movies={userData.list}
                            handleAddFavoritesClick={handleAddFavoritesClick}
                            handleRemoveFavoriteClick={handleRemoveFavoritesClick}
                            addFavoriteIcon={AddFavorites}
                 removeFavoriteIcon={RemoveFavorites}/>
             </div>}
        </div>
    );
};

export default OtherProfile;