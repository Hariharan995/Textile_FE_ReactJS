import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

type Tprops = {
    slide: "up" | "down" | "left" | "right",
    open: boolean,
    onClose: (open: boolean) => void
    title: string
    result: any
}

const AddToAll: React.FC<Tprops> = ({ open, onClose, title, slide, result }) => {


    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>,
    ) {
        return <Slide direction={slide} ref={ref} {...props} />;
    });

    const JSONToCSVConvertor = (JSONData: any, ReportTitle: string) => {

        const arrData = typeof JSONData !== "object" ? JSON.parse(JSONData) : JSONData;
        const heading = ["Warehouse", "Product", "Reason"];
        let CSV = "";
        let row = "";

        for (const index in heading) {
            row += heading[index] + ",";
        }
        row = row.slice(0, -1);
        CSV += row + "\r\n";


        for (let i = 0; i < arrData.length; i++) {
            let row = "";

            for (const index in heading) {
                row += arrData[i][heading[index]] ? ("\"" + arrData[i][heading[index]].replace(/["]/g, "\"\"") + "\",") : ",";
            }
            row.slice(0, row.length - 1);
            CSV += row + "\r\n";
        }

        if (CSV === "") {
            alert("Invalid data");

            return;
        }

        let fileName = "Failed_";
        fileName += ReportTitle.replace(/ /g, "_");
        const uri = "data:text/csv;charset=utf-8," + escape(CSV);
        const link = document.createElement("a");
        link.href = uri;
        link.download = fileName + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="dialog" >
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => onClose(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{ color: "#ff8e33" }} >{title}</DialogTitle>
                <DialogContent style={{ width: "200px" }}>
                    <DialogContentText id="alert-dialog-slide-description" style={{ color: "#090a0c" }}>
                        Success : {result?.success}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-slide-description" style={{ color: "#090a0c" }}>
                        Failed : {result?.failure}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {result?.failure > 0 && <Button onClick={() => JSONToCSVConvertor(result?.failureReport, "Report")} >View Report</Button>}
                    <Button onClick={() => onClose(false)}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default AddToAll;