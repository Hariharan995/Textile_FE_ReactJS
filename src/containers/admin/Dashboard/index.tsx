import moment from "moment";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { showNotification, STATUS } from "../../../common/constant";
import ActionButton from "../../../components/ActionButton";
import DialogBox from "../../../components/DialogBox";
import DropDown from "../../../components/DropDown";
import { Pagination } from "../../../components/Pagination";
import { SortingIcons } from "../../../components/SortingArrows";
import { AdminService } from "../../../services/admin.service";
import "./styles.scss";

export const DashboardPage: React.FC = () => {
    const [fliterDate, setFliterDate] = useState<string>("Today");
    const [startDate, setStartDate] = useState<string>(moment().format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState<string>(moment().add(1, "days").format("YYYY-MM-DD"));
    const [saleList, setSaleList] = useState<any>([]);
    const [revenueDetails, setRevenueDetails] = useState<any>();
    const [totalCount, setTotalCount] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [sort, setSort] = useState<string>("DESC");
    const [sortField, setSortField] = useState<string>("createdAt");
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);
    const [deletePopup, setDeletePopup] = useState<boolean>(false);
    const [saleId, setSaleId] = useState<any>();
    const [ordeRemove, setOrdeRemove] = useState<number>(0);

    const navigate = useNavigate();
    const adminService = new AdminService();

    const saleDetails = ["Created Date", "OrderNo", "Buyer Name", "Payment Type", "Credit Point Amount", "Discount Amount", "SubTotal", "Total Amount", "Action"]

 
    const getsaleList = async (filterObj: any, sortObj: any, page: any, limit: any) => {
        try {
            const saleResponse = await adminService.getAllSales({ filterObj: filterObj, sortObj: sortObj, page: page, limit: limit });
            setSaleList(saleResponse.data);
            setTotalPage(saleResponse.count < 5 ? 1 : Math.round(saleResponse.count / 10))
            setTotalCount(saleResponse.count)
        } catch (error) {
            showNotification(STATUS.FAILURE, "Something went wrong");
        }
    };

    const getDashboardDetails = async () => {
        try {
            const saleResponse = await adminService.getDashboardDetails({ startDate: startDate, endDate: endDate });
            setRevenueDetails(saleResponse.data);
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
    const handleOnDate = (date: string) => {
        dateFilter(date)
        setFliterDate(date);
    };

    const dateFilter = (value: any) => {
        switch (value) {
            case "Today":
                setStartDate(moment().format("YYYY-MM-DD"))
                setEndDate(moment().add(1, "days").format("YYYY-MM-DD"))
                break;
            case "Last 7 days":
                setStartDate(moment().subtract(7, "day").format("YYYY-MM-DD"));
                setEndDate(moment().add(1, "days").format("YYYY-MM-DD"));
                break;
            case "Last 30 days":
                setStartDate(moment().subtract(30, "day").format("YYYY-MM-DD"))
                setEndDate(moment().add(1, "days").format("YYYY-MM-DD"))
                break;
            case "This Month":
                setStartDate(moment().set('date', 1).format("YYYY-MM-DD"))
                setEndDate(moment().add(1, "days").format("YYYY-MM-DD"))
                break;
            case "This year":
                setStartDate(moment().set('date', 1).set('month', 0).format("YYYY-MM-DD"))
                setEndDate(moment().add(1, "days").format("YYYY-MM-DD"))
                break;
            case "Last year":
                setStartDate(moment().set('date', 1).set('month', 0).subtract(1, 'year').format("YYYY-MM-DD"))
                setEndDate(moment().set('date', 31).set('month', 11).subtract(1, 'year').format("YYYY-MM-DD"))
                break;
            case "All time":
                setStartDate("");
                setEndDate("");
                break;
            default:
                setStartDate(moment().format("YYYY-MM-DD"))
                setEndDate(moment().add(1, "days").format("YYYY-MM-DD"))
                break;
        }
    }

    useEffect(() => {
        let filter: any = {}
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
    }, [startDate, endDate, sort, sortField, page, limit]);

    useEffect(() => {
        getDashboardDetails();
    }, [startDate, endDate]);

    return (
        <div className="dashboard">
            <div className="filterDate">
                <p>Stats overview for</p>
                <DropDown
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnDate(e.target.value)}
                    value={fliterDate}
                    text="date"
                    dropdown={["Today", "Last 7 days", "Last 30 days", "This Month", "This year", "Last year", "All time",]}
                />
            </div >
            <div className="sale">
                <div className="item">
                    <p> Orders</p>
                    <p> {revenueDetails?.orderCount.toFixed(2) || 0}</p>
                </div>
                <div className="item" >
                    <p> Sales</p>
                    <p>₹ {revenueDetails?.saleRevenue.toFixed(2) || 0}</p>
                </div>
                <div className="item" >
                    <p> Discount Amount Applied</p>
                    <p>₹ {revenueDetails?.discountRevenue.toFixed(2) || 0}</p>
                </div>
                <div className="item">
                    <p> Credit Amount Applied</p>
                    <p>₹ {revenueDetails?.creditRevenue.toFixed(2) || 0}</p>
                </div>
            </div>

            <div className="table-scrolls">
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
                    {saleList?.map((sale: any, index: number) => {
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
            </div >
        </div >
    )
}