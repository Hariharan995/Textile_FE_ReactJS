import moment from "moment";
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { showNotification, STATUS } from "../../../common/constant";
import { AdminService } from "../../../services/admin.service";
import "./styles.scss";


export const SalesView: React.FC = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [saleDetails, setSaleDetails] = useState<any>();
    const getsellerList = async (saleId: any) => {
        const adminService = new AdminService();
        try {
            const saleResponse = await adminService.getSaleById({ saleId: saleId });
            setSaleDetails(saleResponse.data);
        } catch (error) {
            showNotification(STATUS.FAILURE, "Something went wrong");
        }
    };

    useEffect(() => {
        getsellerList(id)
    }, [id]);

    return (
        <div className="main-content">
            <div className="heads">
                <div className="title">
                    <h4> Ordered on </h4>
                    <p> {moment(saleDetails?.createdAt).format("DD/MM/YYYY")}</p>
                    <h4> Order </h4>
                    <p>#{saleDetails?.orderNo}</p>
                </div>
                <div >
                    <button className="sub-btn" onClick={() => { navigate(-1) }}>Back</button>
                </div>
            </div>

            <div className="payment">
                <div>
                    <p>Buyer Details</p>
                    <p>{saleDetails?.buyerDetails?.name}</p>
                    <p>{saleDetails?.buyerDetails?.mobile}</p>
                </div>
                <div>
                    <p>Payment Method</p>
                    <p>{saleDetails?.paymentType}</p>
                </div>
                <div>
                    <p>Order Summary</p>
                    {saleDetails?.discountAmount ? <div className="summay" >
                        <p className="sub-summary">Discount Amount:</p>
                        <p>₹ {saleDetails?.discountAmount}</p>
                    </div> : ""}

                    {saleDetails?.creditAmount ? <div className="summay" >
                        <p className="sub-summary">Credit Amount:</p>
                        <p>₹ {saleDetails?.creditAmount}</p>
                    </div> : ""}
                    <div className="summay">
                        <p className="sub-summary">Item(s) Total:</p>
                        <p>₹ {saleDetails?.subTotal}</p>
                    </div>
                    <div className="summay">
                        <p className="sub-summary">Grand Total:</p>
                        <p>₹ {saleDetails?.totalAmount}</p>
                    </div>
                </div >
            </div >
            <div className="product-items">
                {saleDetails?.productList?.map((product: any, index: number) => {
                    return <div key={index} >
                        <div className="product">
                            <div className="img">
                                <img className="images" src={"data:image/jpeg;base64," + product.productImageData} alt="" />
                            </div>
                            <div className="item-details">
                                <p>{product?.productName}</p>
                                <p>Quantity: {product?.quantity}</p>
                                <p className="brand">{product.brandName}</p>
                                <p className="price">₹ {(product.price * product?.quantity).toFixed(2)} </p>
                            </div>
                        </div>
                    </div >
                })}
            </div>
        </div>

    )

}