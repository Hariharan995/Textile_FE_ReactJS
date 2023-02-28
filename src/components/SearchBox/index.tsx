import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./styles.scss";

type Tprops = React.InputHTMLAttributes<HTMLInputElement>

export const SearchBox: React.FC<Tprops> = ({...props}) => {
    return (
        <div className="search-box">
            <SearchIcon />
            <input type="text" {...props}/>
        </div>
    );
};