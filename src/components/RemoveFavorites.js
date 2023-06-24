import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";

const RemoveFavorites = () => {
    const iconStyle = {
        marginLeft: "0.5rem", 
    };

    return (
        <>
            <span className="mr-2">Remove From Favorites</span>
            <span style={iconStyle}>
                <FontAwesomeIcon icon={faHeartCrack} />
            </span>
        </>
    )
}

export default RemoveFavorites;