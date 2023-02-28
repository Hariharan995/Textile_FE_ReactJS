import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

type Tprops = {
  slide?: "up" | "down" | "left" | "right",
  open: boolean,
  message: string
  title: string
  onClick?: () => void;
  btnName: string;
  severity?: string
}

const AlertBox: React.FC<Tprops> = ({ open, message, title, slide, onClick, btnName, severity }) => {

    const status = severity ? severity : "error";

    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
      children: React.ReactElement;
    },
        ref: React.Ref<unknown>,
    ) {
        return <Slide direction={slide ? slide : "up"} ref={ref} {...props} />;
    });



    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={status === "success" ? { color: "#18b964" } : { color: "#ff0000" }}>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" style={{ color: "#090a0c" }}>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClick}>{btnName}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default AlertBox;