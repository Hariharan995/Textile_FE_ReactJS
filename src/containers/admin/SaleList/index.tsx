import moment from "moment";
import React, { useEffect, useState } from "react"
import { showNotification, STATUS } from "../../../common/constant";
import DropDown from "../../../components/DropDown";
import { Pagination } from "../../../components/Pagination";
import { SortingIcons } from "../../../components/SortingArrows";
import { AdminService } from "../../../services/admin.service";
import "./styles.scss";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SearchBox } from "../../../components/SearchBox";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../components/ActionButton";
import DialogBox from "../../../components/DialogBox";

export const SaleListPage: React.FC = () => {
    const [totalCount, setTotalCount] = useState<number>(0);
    const [sellerList, setSellerList] = useState<any>([]);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [sort, setSort] = useState<string>("DESC");
    const [sortField, setSortField] = useState<string>("createdAt");
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);
    const [searchValue, setSearch] = useState<string>("");
    const [paymentType, setPaymentType] = useState<string>("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [deletePopup, setDeletePopup] = useState<boolean>(false);
    const [saleId, setSaleId] = useState<any>();
    const [ordeRemove, setOrdeRemove] = useState<number>(0);

    const navigate = useNavigate();
    const adminService = new AdminService();

    const saleDetails = ["Created Date", "OrderNo", "Buyer Name", "Payment Type", "Credit Point Amount", "Discount Amount", "SubTotal", "Total Amount", "Action"]

    const getsaleList = async (filterObj: any, sortObj: any, page: any, limit: any) => {

        try {
            const saleResponse = await adminService.getAllSales({ filterObj: filterObj, sortObj: sortObj, page: page, limit: limit });
            setSellerList(saleResponse.data);
            setTotalPage(saleResponse.count < 5 ? 1 : Math.round(saleResponse.count / 10))
            setTotalCount(saleResponse.count)
        } catch (error) {
            showNotification(STATUS.FAILURE, "Something went wrong");
        }
    };
    const removeOrder = async () => {
        try {
            const response = await adminService.deleteSale({
                orderId: saleId
            });
            if (response) {
                showNotification(
                    response.status,
                    response.message,
                );
                setOrdeRemove(1)
                setDeletePopup(false);
            }
        } catch (error) {
            showNotification(STATUS.FAILURE, "Something Went Wrong");
        }
    };

    const handleOnDelete = (saleId: string) => {
        setSaleId(saleId);
        setDeletePopup(true);
    };

    const handleSearch = (searchValue: string) => {
        setSearch(searchValue);
    };

    const handleUserRole = (paymentType: string) => {
        setPaymentType(paymentType);
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
        if (paymentType && paymentType !== "ALL") {
            filter.paymentType = paymentType
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
        getsaleList(filter, sorts, page, limit);
    }, [searchValue, paymentType, startDate, endDate, sort, sortField, page, limit, ordeRemove]);

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

                <DropDown
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUserRole(e.target.value)}
                    value={paymentType}
                    text="PaymentType"
                    dropdown={["ALL", "ONLINEPAYMENT", "COD"]}
                />
                <SearchBox
                    value={searchValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
                    placeholder="Search"
                />
                <div className="totalCount">
                    <p>Total Sales: {totalCount}</p>
                </div>
            </div>
            <table className="saleTable">
                <thead>
                    <tr>
                        {saleDetails?.map((col: any, index: number) => {
                            return <th key={index}>{col}<SortingIcons
                                setSort={(e) => setSort(e)}
                                fieldName={col}
                                setFieldName={(e) => { setSortField(e); }}
                            /></th>
                        })}
                    </tr>
                    {sellerList?.map((sale: any, index: number) => {
                        return <tr key={index}>
                            <td>{moment(sale?.createdAt).format("DD/MM/YYYY")}</td>
                            <td>{sale?.orderNo}</td>
                            <td>{sale?.buyerDetails.name}</td>
                            <td>{sale?.paymentType}</td>
                            <td>{sale?.creditAmount}</td>
                            <td>{sale?.discountAmount}</td>
                            <td>{sale?.subTotal}</td>
                            <td>{sale?.totalAmount}</td>
                            <td key={index}>
                                <div className="act-btn">
                                     <ActionButton
                                        label="view"
                                        onClick={() => { navigate('/main/sale-view/' + sale._id) }}
                                    /> <ActionButton
                                        label="delete"
                                        color="reject"
                                        onClick={() => handleOnDelete(sale._id)}
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
                        message="Are sure want to remove this order?"
                        title="Order Remove"
                        slide="down"
                        onClick={() => removeOrder()}
                    />
                )
            }
        </div>
    )
}