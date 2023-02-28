import React from "react";
import { HeaderLayout } from "./Header";
import { SideBarLayout } from "./SideBar";
import "./styles.scss";
import { Route, Routes } from "react-router-dom";
import { DashboardPage } from "../containers/admin/Dashboard";
import { SaleListPage } from "../containers/admin/SaleList";
import { BuyerListPage } from "../containers/admin/BuyerList";
import { CreditPointPage } from "../containers/admin/CreditPoint";
import { ProductListPage } from "../containers/admin/ProductList";
import { SellerListPage } from "../containers/admin/SellerList";
import { SalesView } from "../containers/admin/SaleView";

export const Layout: React.FC = () => {
    // const userRole = useSelector<RootState>((state:any) => state.authData.authData.role);

    return (
        <div className="layout">
            <SideBarLayout />
            <div className="layout-header-wrapper">
                <HeaderLayout />
                <Routes>
                    <Route element={<DashboardPage />} path='/dashboard' />
                    <Route element={<SaleListPage />} path='/sale-list' />
                    <Route element={<SalesView />} path='/sale-view/:id' />
                    <Route element={<BuyerListPage />} path='/buyer-list' />
                    <Route element={<ProductListPage />} path='/product-list' />
                    <Route element={<CreditPointPage />} path='/credit-point' />
                    <Route element={<SellerListPage />} path='/seller-list' />
                </Routes>
            </div>
        </div>
    );
};