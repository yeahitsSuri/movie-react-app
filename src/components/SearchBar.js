
import React from "react";
import {useNavigate} from "react-router-dom";

const SearchBar = (props) => {
    const navigate = useNavigate();

    const handleSearch = (event) => {
        const searchKey = event.target.value;
        props.setSearchKey(searchKey); // Update the search key
        if (searchKey === "") {
            localStorage.setItem("last-search", "");
            navigate(`/search`);
        } else {
            localStorage.setItem("last-search", searchKey);
            navigate(`/search?searchKey=${searchKey}`); // Update the path with the updated search key
        }
    };

    return (
        <div className= "col col-sm-4">
            <input className="form-control" 
            value = {props.searchKey}
            onChange = { (event)=> {
                props.setSearchKey(event.target.value);
                handleSearch(event);
            }}
            placeholder="Search for..."></input>
        </div>
    )
}

export default SearchBar;