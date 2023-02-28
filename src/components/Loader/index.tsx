import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";



type LoaderProps = {
    open: boolean,
}

export const Loader: React.FC<LoaderProps> = ({ open }) => {

    return (
        <div>
            <Backdrop
                sx={{ color: "#ff8e33", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <div>
                    {/* <img src={CentralInventory} draggable="false" width={"50px"} /> */}
                    <CircularProgress color="inherit" />
                </div>
            </Backdrop>
        </div>
    );
};
