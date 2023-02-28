import moment from "moment";
import React, { useEffect, useState } from "react"
import { showNotification, STATUS } from "../../../common/constant";
import { Pagination } from "../../../components/Pagination";
import { SearchBox } from "../../../components/SearchBox";
import { SortingIcons } from "../../../components/SortingArrows";
import { AdminService } from "../../../services/admin.service";
import "./styles.scss";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ActionButton from "../../../components/ActionButton";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../../components/DialogBox";

export const ProductListPage: React.FC = () => {
    const [totalCount, setTotalCount] = useState<number>(0);
    const [productList, setProductList] = useState<any>([]);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [sort, setSort] = useState<string>("DESC");
    const [sortField, setSortField] = useState<string>("createdAt");
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);
    const [searchValue, setSearch] = useState<string>("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [productId, setProductId] = useState<string>("");
    const [productRemove, setProductRemove] = useState<number>(0);
    const [deletePopup, setDeletePopup] = useState<boolean>(false);

    const navigate = useNavigate();

    const adminService = new AdminService();
    const productDetails = ["Created Date", "BarcodeId", "ProductImage", "ProductName", "MRP", "Price", "TaxPercent", "Quantity", "SalesCount", "Action"]

    const getproductList = async (filterObj: any, sortObj: any, page: any, limit: any) => {

        try {
            const productResponse = await adminService.getAllProducts({ filterObj: filterObj, sortObj: sortObj, page: page, limit: limit });
            setProductList(productResponse.data);
            setTotalPage(productResponse.count < 5 ? 1 : Math.round(productResponse.count / 10))
            setTotalCount(productResponse.count)
        } catch (error) {
            showNotification(STATUS.FAILURE, "Something went wrong");
        }
    };
    const removeProduct = async () => {
        try {
            const response = await adminService.deleteProduct({
                productId: productId
            });
            if (response) {
                showNotification(
                    response.status,
                    response.message,
                );
                setProductRemove(1)
                setDeletePopup(false);
            }
        } catch (error) {
            showNotification(STATUS.FAILURE, "Something Went Wrong");
        }
    };

    const handleOnDelete = (productId: string) => {
        setProductId(productId);
        setDeletePopup(true);
    };
    const handleSearch = (searchValue: string) => {
        setSearch(searchValue);
    };

    const handleStartDateChange = (date: any) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: any) => {
        setEndDate(date);
    };

    useEffect(() => {
        let filter: any = {}
        if (searchValue) {
            filter.searchValue = searchValue
        }
        if (startDate) {
            filter.startDate = startDate
        }
        if (endDate) {
            filter.endDate = endDate
        }
        let sorts: any = {}
        let sortBy = sortField.replaceAll(" ", "")
        if (sortField === 'Created Date') {
            sortBy = "createdAt"
        }
        else {
            sortBy = sortBy.replace(/\w\S*/g, (m: any) => m.charAt(0).toLowerCase() + m.substr(1))
        }
        sorts[sortBy] = sort === 'DESC' ? -1 : 1
        getproductList(filter, sorts, page, limit);
    }, [searchValue, startDate, endDate, sort, sortField, page, limit, productRemove]);


    return (
        <div className="main">
            <div className="filter">
                <DatePicker
                    className="DatePicker"
                    placeholderText="StartDate"
                    selected={startDate}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                />
                <DatePicker
                    className="DatePicker"
                    placeholderText="EndDate"
                    selected={endDate}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                />
                <SearchBox
                    value={searchValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
                    placeholder="Search"
                />
                <div className="add-product">
                    <div className="totalCount">
                        <p> Total Products: {totalCount}</p>
                    </div>
                    <button className="add-prd-btn">Add Product</button>
                </div>
            </div>
            <table className="productTable">
                <thead>
                    <tr >
                        {productDetails?.map((col: any, index: number) => {
                            return <th key={index}>{col}<SortingIcons
                                setSort={(e) => setSort(e)}
                                fieldName={col}
                                setFieldName={(e) => { setSortField(e); }}
                            /></th>
                        })}
                    </tr>
                    {productList?.map((product: any, index: number) => {
                        return <tr key={index}>
                            <td>{moment(product?.createdAt).format("DD/MM/YYYY")}</td>
                            <td>{product?.barcodeId}</td>
                            <td> <img className="images" src={"data:image/jpeg;base64," + product.productImageData} alt="" /></td>
                            <td>{product?.productName}</td>
                            <td>{product?.mrp}</td>
                            <td>{product?.price}</td>
                            <td>{product?.taxPercent}</td>
                            <td>{product?.quantity}</td>
                            <td>{product?.salesCount}</td>
                            <td key={index}>
                                <div className="act-btn">
                                    <ActionButton
                                        label="edit"
                                        onClick={() => { navigate('/main/sale-view/' + product._id) }}
                                    /> <ActionButton
                                        label="delete"
                                        color="reject"
                                        onClick={() => handleOnDelete(product._id)}
                                    />
                                </div>
                            </td>
                        </tr>;
                    })}
                </thead>
            </table>
            <div>
                <Pagination count={totalPage} page={page} pageChange={(e, page) => setPage(page)} />
            </div>
            {
                deletePopup && (
                    <DialogBox
                        open={deletePopup}
                        onClose={setDeletePopup}
                        message="Are sure want to remove this product?"
                        title="Product Remove"
                        slide="down"
                        onClick={() => removeProduct()}
                    />
                )
            }
        </div >
    )
}