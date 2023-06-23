import React from "react";

const MovieListHeader = (props) =>{
    return (
        <div className="col">
            <h1>{props.header}</h1>
        </div>
    )
}

export default MovieListHeader;