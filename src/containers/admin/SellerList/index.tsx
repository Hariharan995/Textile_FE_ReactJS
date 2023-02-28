import moment from "moment";
import React, { useEffect, useState } from "react"
import { showNotification, STATUS } from "../../../common/constant";
import DropDown from "../../../components/DropDown";
import { Pagination } from "../../../components/Pagination";
import { SearchBox } from "../../../components/SearchBox";
import { SortingIcons } from "../../../components/SortingArrows";
import { AdminService } from "../../../services/admin.service";
import "./styles.scss";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DialogBox from "../../../components/DialogBox";
import ActionButton from "../../../components/ActionButton";


export const SellerListPage: React.FC = () => {
    const [totalCount, setTotalCount] = useState<number>(0);
    const [sellerList, setSellerList] = useState<any>([]);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [sort, setSort] = useState<string>("DESC");
    const [sortField, setSortField] = useState<string>("createdAt");
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);
    const [searchValue, setSearch] = useState<string>("");
    const [userRole, setUserRole] = useState<string>("");
    const [userStatus, setUserStatus] = useState<string>("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [approvePopup, setApprovePopup] = useState<boolean>(false);
    const [rejectPopup, setRejectPopup] = useState<boolean>(false);
    const [userId, setUserId] = useState<any>();
    const [approval, setApproval] = useState<number>(0);

    const adminService = new AdminService();

    const buyerDetails = ["Created Date", "Name", "Mobile", "UserRole", "UserStatus", "Action"]

    const getsellerList = async (filterObj: any, sortObj: any, page: any, limit: any) => {
        try {
            const sellerResponse = await adminService.getAllUsers({ filterObj: filterObj, sortObj: sortObj, page: page, limit: limit });
            setSellerList(sellerResponse.data);
            setTotalPage(sellerResponse.count < 5 ? 1 : Math.round(sellerResponse.count / 10))
            setTotalCount(sellerResponse.count)
        } catch (error) {
            showNotification(STATUS.FAILURE, "Something went wrong");
        }
    };

    const handleSearch = (searchValue: string) => {
        setSearch(searchValue);
    };

    const handleUserRole = (userRole: string) => {
        setUserRole(userRole);
    };
    const handleUserStatus = (userStatus: string) => {
        setUserStatus(userStatus);
    };

    const handleStartDateChange = (date: any) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: any) => {
        setEndDate(date);
    };

    const approveUser = async () => {
        try {
            const response = await adminService.userApproval({
                userId: userId,
                userStatus: 'APPROVED'
            });
            if (response) {
                setApproval(1)
                showNotification(
                    response.status,
                    response.message,
                );
                setApprovePopup(false);
            }
        } catch (error) {
            showNotification(STATUS.FAILURE, "Something Went Wrong");
        }
    };

    const rejectUser = async () => {
        try {
            const response = await adminService.userApproval({
                userId: userId,
                userStatus: 'REJECTED'
            });
            if (response) {
                setApproval(-1)
                showNotification(
                    response.status,
                    response.message,
                );
                setRejectPopup(false);
            }
        } catch (error) {
            showNotification(STATUS.FAILURE, "Something Went Wrong");
        }
    };

    const handleOnApprove = (userId: string) => {
        setUserId(userId);
        setApprovePopup(true);
    };

    const handleOnReject = (userId: string) => {
        setUserId(userId);
        setRejectPopup(true);
    };

    useEffect(() => {
        let filter: any = {}
        if (searchValue) {
            filter.searchValue = searchValue
        }
        if (userRole && userRole !== "ALL") {
            filter.userRole = userRole
        }
        if (userStatus && userStatus !== "ALL") {
            filter.userStatus = userStatus
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
        getsellerList(filter, sorts, page, limit);
    }, [searchValue, userRole, userStatus, startDate, endDate, sort, sortField, page, limit, approval]);

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
                    value={userRole}
                    text="UserRole"
                    dropdown={["ALL", "ADMIN", "SELLER"]}
                />

                <DropDown
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUserStatus(e.target.value)}
                    value={userStatus}
                    text="UserStatus"
                    dropdown={["ALL", "UNAPPROVED", "APPROVED", "REJECTED"]}
                />

                <SearchBox
                    value={searchValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
                    placeholder="Search"
                />

                <div className="totalCount">
                    <p>Total Sellers: {totalCount}</p>
                </div>
            </div>
            <table className="sellerTable">
                <thead>
                    <tr>
                        {buyerDetails?.map((col: any, index: number) => {
                            return <th key={index}>{col}<SortingIcons
                                setSort={(e) => setSort(e)}
                                fieldName={col}
                                setFieldName={(e) => { setSortField(e); }}
                            /></th>
                        })}
                    </tr>
                    {sellerList?.map((seller: any, index: number) => {
                        return <tr key={index}>
                            <td>{moment(seller?.createdAt).format("DD/MM/YYYY")}</td>
                            <td>{seller?.name}</td>
                            <td>{seller?.mobile}</td>
                            <td>{seller?.userRole[0]}</td>
                            <td>{seller?.userStatus}</td>
                            <td key={index}>
                                <div className="act-btn">
                                    {seller?.userStatus !== "APPROVED" ? <ActionButton
                                        label="approve"
                                        onClick={() => handleOnApprove(seller._id)}
                                    /> : ""}
                                    {seller?.userStatus !== "REJECTED" ? <ActionButton
                                        label="reject"
                                        color="reject"
                                        onClick={() => handleOnReject(seller._id)}
                                    /> : ""}
                                </div>
                            </td >
                        </tr >
                    })}
                </thead >
            </table >
            <div>
                <Pagination count={totalPage} page={page} pageChange={(e, page) => setPage(page)} />
            </div>
            {
                approvePopup && (
                    <DialogBox
                        open={approvePopup}
                        onClose={setApprovePopup}
                        message="Are sure want to approve this user?"
                        title="User Approve"
                        slide="down"
                        onClick={() => approveUser()}
                    />
                )
            }
            {
                rejectPopup && (
                    <DialogBox
                        open={rejectPopup}
                        onClose={setRejectPopup}
                        message="Are sure want to reject this user?"
                        title="User Reject"
                        slide="down"
                        onClick={() => rejectUser()}
                    />
                )
            }
        </div >
    )
}