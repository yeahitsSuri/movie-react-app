
import React from "react";

const SearchBar = (props) => {
    return (
        <div className= "col col-sm-4">
            <input className="form-control" 
            value = {props.value}
            onChange = { (event)=> props.setSearchKey(event.target.value)}
            placeholder="Search for..."></input>
        </div>
    )
}

export default SearchBar;