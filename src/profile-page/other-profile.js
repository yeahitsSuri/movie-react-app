// this is used to render other people's profile page
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USERS_URL = `${SERVER_API_URL}/api/users`;

const OtherProfile = () => {
    const { id } = useParams();
    let responseJson = null;

    useEffect(() => {
        const fetchUserDetails = async () => {
            const url = `${USERS_URL}/${id}`;
            const response = await fetch(url);
            responseJson = await response.json();
            console.log(responseJson);
            console.log(responseJson.username);
        };

        fetchUserDetails();
    }, [id]);

    if (responseJson === null) {
        alert("This user doesn't exist!");
    } else {
        return (
            <div className={"container"}>
                <div className="row mt-3">
                    <div className="col-3">
                        <label>Username</label>
                    </div>
                    <div className="col">
                        <input className="form-control" type="text" value={responseJson.username} disabled/>
                    </div>
                </div>
            </div>
        )
    }
}

export default OtherProfile;