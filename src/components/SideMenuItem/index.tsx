import React from "react";
import { NavLink, useLocation } from "react-router-dom";

type SidenavbarProps = {
    label: string;
    to: string,
    icon?: any
    coloricon?: any
    disabled?: boolean
    onClick?: () => void
    displayLabel: boolean
    admin?: boolean
}


const SideMenuItem: React.FC<SidenavbarProps> = ({ displayLabel, icon, admin, coloricon, to, label, disabled, onClick }) => {
    const { pathname } = useLocation();
    const isActive = (pathname === to) ? true : false;

    return (
        <div className={admin ? "admin-side-menu-item" : "side-menu-item"} >
            <NavLink className={disabled ? "menu-link disabled-link" : "menu-link"} style={isActive ? { color: "#ff8e33" } : { color: "#fff" }} to={to} onClick={onClick}>
                <div className='menu-ic'>
                    <img className='menu-img' alt="logo" src={icon} />
                    <img className='menu-color-img'  alt="logo" src={coloricon} />
                </div>
                <div className={displayLabel ? "menu-title" : "menu-title-none"}>
                    {label}
                </div>
            </NavLink>
        </div>
    );
};

export default SideMenuItem;