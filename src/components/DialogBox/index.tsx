import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

type Tprops = {
  slide: "up" | "down" | "left" | "right",
  open: boolean,
  onClose: (open: boolean) => void
  message: string
  title: string
  onClick?: () => void;
}

const DialogBox: React.FC<Tprops> = ({ open, onClose, message, title, slide, onClick }) => {


    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
      children: React.ReactElement;
    },
        ref: React.Ref<unknown>,
    ) {
        return <Slide direction={slide} ref={ref} {...props} />;
    });


    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => onClose(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{ color: "#ff0000" }}>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" style={{ color: "#090a0c" }}>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose(false)}>No</Button>
                    <Button onClick={onClick}>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default DialogBox;