import * as React from "react";
import { default as MuiPagination } from "@mui/material/Pagination";
import "./styles.scss";

type Pprops = {
    count: number
    page?:number
    onClickPage?: () => void
    pageChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export const Pagination: React.FC<Pprops> = ({ count, onClickPage, pageChange,page }) => {
    return (
        <div className='pagination-container'>
            <div className='pagination'>
                <MuiPagination count={count} page={page} color="primary" onClick={onClickPage} onChange={pageChange} />
            </div>
        </div>
    );
};

