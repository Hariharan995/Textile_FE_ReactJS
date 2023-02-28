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

export const BuyerListPage: React.FC = () => {
    const [totalCount, setTotalCount] = useState<number>(0);
    const [buyerList, setBuyerList] = useState<any>([]);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [sort, setSort] = useState<string>("DESC");
    const [sortField, setSortField] = useState<string>("createdAt");
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);
    const [searchValue, setSearch] = useState<string>("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const buyerDetails = ["Created Date", "Name", "Mobile", "Credit Points", "Buy Count", "Buy Amount"]

    const getbuyerList = async (filterObj: any, sortObj: any, page: any, limit: any) => {
        const adminService = new AdminService();

        try {
            const saleResponse = await adminService.getAllBuyers({ filterObj: filterObj, sortObj: sortObj, page: page, limit: limit });
            setBuyerList(saleResponse.data);
            setTotalPage(saleResponse.count < 5 ? 1 : Math.round(saleResponse.count / 10))
            setTotalCount(saleResponse.count)
        } catch (error) {
            showNotification(STATUS.FAILURE, "Something went wrong");
        }
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
        getbuyerList(filter, sorts, page, limit);
    }, [searchValue, startDate, endDate, sort, sortField, page, limit]);

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
                <div className="totalCount">
                    <p>Total Buyers: {totalCount}</p>
                </div>
            </div>
            <table className="saleTable">
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
                    {buyerList?.map((sale: any, index: number) => {
                        return <tr key={index}>
                            <td>{moment(sale?.createdAt).format("DD/MM/YYYY")}</td>
                            <td>{sale?.name}</td>
                            <td>{sale?.mobile}</td>
                            <td>{sale?.creditPoints.toFixed(2)}</td>
                            <td>{sale?.buyCount}</td>
                            <td>{sale?.buyAmount.toFixed(2)}</td>
                        </tr>
                    })}
                </thead>
            </table>
            <div>
                <Pagination count={totalPage} page={page} pageChange={(e, page) => setPage(page)} />
            </div>
        </div>
    )
}