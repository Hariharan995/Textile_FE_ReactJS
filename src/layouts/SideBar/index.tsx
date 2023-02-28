import React, { useState } from "react";
import SideMenuItem from "../../components/SideMenuItem";
import PoorvikaLogo from "../../assets/images/poorvika-sidebar-logo.svg";
import PoorvikaSmLogo from "../../assets/images/poorvika-sm-icon.svg";
import saleLogo from "../../assets/icon/sale.png";
import productLogo from "../../assets/icon/product.png";
import userLogo from "../../assets/icon/seller.png";
import buyerLogo from "../../assets/icon/buyer.png";
import "./styles.scss";


const SideBarLayout: React.FC = () => {
    const userRole = "seller"
    const [showLabel, setshowLabel] = useState(false);

    let timer: any = 0;
    const TIMEOUT = 180;

    function mouseEnter() {
        timer = setTimeout(() => {
            setshowLabel(true);
        }, TIMEOUT);
    }

    function mouseLeave() {
        setshowLabel(false);
        clearTimeout(timer);
    }

    return (
        <section className="app-sidebar" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <div className="menu-header">
                <img className="menu-logo" alt="logo" draggable="false" src={PoorvikaSmLogo} />
                <img className="menu-color-logo" alt="menu-logo" draggable="false" src={PoorvikaLogo} />
            </div>
            <div className="menu-body">
                <div className="menu-list">
                    <>
                        <SideMenuItem
                            coloricon={saleLogo}
                            icon={saleLogo}
                            label="Dashboard"
                            displayLabel={showLabel}
                            to="/main/dashboard"
                        />
                        <SideMenuItem
                            coloricon={saleLogo}
                            icon={saleLogo}
                            label="Sale List"
                            displayLabel={showLabel}
                            to="/main/sale-list"
                        />
                        <SideMenuItem
                            coloricon={buyerLogo}
                            icon={buyerLogo}
                            label="Buyer List"
                            displayLabel={showLabel}
                            to="/main/buyer-list"
                        />
                        {userRole === "seller" && <SideMenuItem
                            coloricon={productLogo}
                            icon={productLogo}
                            label="Products"
                            displayLabel={showLabel}
                            to="/main/product-list"
                        />}
                        {userRole === "seller" && <SideMenuItem
                            coloricon={productLogo}
                            icon={productLogo}
                            label="Credit Point"
                            displayLabel={showLabel}
                            to="/main/credit-point"
                        />}
                        {userRole === "seller" && <SideMenuItem
                            coloricon={userLogo}
                            icon={userLogo}
                            label="Seller List"
                            displayLabel={showLabel}
                            to="/main/seller-list"
                        />}
                        {userRole === "seller" && <SideMenuItem
                            coloricon={saleLogo}
                            icon={saleLogo}
                            label="Billing"
                            displayLabel={showLabel}
                            to="/main/billing"
                        />}
                    </>
                </div>
            </div>
        </section>
    );
};

export { SideBarLayout };