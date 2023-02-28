import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { showNotification, STATUS } from "../../../common/constant";
import ActionButton from "../../../components/ActionButton";
import { AdminService } from "../../../services/admin.service";
import "./styles.scss";

export const CreditPointPage: React.FC = () => {
    const [creditList, setCreditList] = useState<any>([]);
    const saleDetails = ["Points", "Amount", "Apply Percent", "Action"]
    const navigate = useNavigate();
    const getcreditList = async () => {
        const adminService = new AdminService();

        try {
            const saleResponse = await adminService.getCreditPoints();
            setCreditList(saleResponse.data);
        } catch (error) {
            showNotification(STATUS.FAILURE, "Something went wrong");
        }
    };

    useEffect(() => {
        getcreditList();
    }, []);

    return (
        <div className="main">
            <table className="saleTable">
                <thead>
                    <tr>
                        {saleDetails?.map((col: any, index: number) => {
                            return <th key={index}>{col}</th>
                        })}
                    </tr>
                    {creditList?.map((sale: any, index: number) => {
                        return <tr key={index}>
                            <td>{sale?.point}</td>
                            <td>{sale?.amount}</td>
                            <td>{sale?.applyPercent}</td>
                            <td key={index}>
                                <div className="act-btn">
                                    <ActionButton
                                        label="update"
                                        onClick={() => { navigate('/main/sale-view/' + sale._id) }}
                                    />
                                </div>
                            </td>
                        </tr>;
                    })}
                </thead>
            </table>
        </div>
    )
}