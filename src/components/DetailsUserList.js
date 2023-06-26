import React from "react";
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";

const DetailsUserList = ({users}) => {
    const {currentUser} = useSelector((state) => state.user);

    if (users.length === 0) {
        return (
            <div className={"d-flex justify-content-center align-items-center bg-secondary rounded p-3"}>
                <p className={"text-white"}>Be the first one to add this movie to your favorites!</p>
            </div>
        )
    }
    return (
        <div>
            <ul className="list-group">
                {users.map((user, index) => (
                    <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
                        <div>
                            {user.username}{' '}
                            <span className="badge bg-secondary text-white">{user.role}</span>
                        </div>
                        <Link to={currentUser._id === user._id ? `/profile` : `/profile/${user._id}`} className="btn btn-primary btn-sm">
                            Profile
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DetailsUserList;

