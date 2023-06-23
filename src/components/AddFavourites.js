import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const AddFavourites = () => {
    const heartIconStyle = {
        marginLeft: "0.5rem", 
    };

    return (
        <>
            <span className="mr-2">Add to Favorites</span>
            <span style={heartIconStyle}>
                <FontAwesomeIcon icon={faHeart} />
            </span>
        </>
    )
}

export default AddFavourites;