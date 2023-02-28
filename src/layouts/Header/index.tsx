import React from "react";
import User from "../../assets/icons/userSvg.svg";
import { IconButton, Popover } from "@mui/material";
import "./styles.scss";

export const HeaderLayout: React.FC = () => {
    const [anchorElProfile, setAnchorElProfile] = React.useState<HTMLButtonElement | null>(null);
    const openProfile = Boolean(anchorElProfile);
    const idProfile = openProfile ? "simple-popover" : undefined;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElProfile(null);
    };

     const handleOnLogout = () => {
        localStorage.clear();
        window.location.replace("/login")
    };

    return (
        <div className="headers">
            <IconButton className="profile" onClick={handleClick}>
                <img src={User} alt="logo" width="24px" />
            </IconButton>
            <Popover
                id={idProfile}
                open={openProfile}
                anchorEl={anchorElProfile}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <div className="btn-container" style={{ padding: "10px", cursor: "pointer" }}>
                    <span onClick={() => handleOnLogout()}>Logout</span>
                </div>
            </Popover>
        </div >
    );
};

