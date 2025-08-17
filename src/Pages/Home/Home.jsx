import React from 'react';
import Slider from '../../Components/Slider/Slider';
import Categories from '../../Components/Categories/Categories';
import DiscountOffers from '../../Components/DiscountOffers/DiscountOffers';
import SuccessInNumber from '../../Components/SuccessInNumber/SuccessInNumber';
import CustomerReview from '../../Components/CustomerReview/CustomerReview';
import { ReTitleProvider } from 're-title';
import UseRoleQuery from '../../CustomHooks/UseRoleQuery';
import SellerHome from '../SellerPages/SellerHome/SellerHome';
import AdminHome from '../PagesForAdmin/AdminHome/AdminHome';
import SharedCompanies from '../../Components/SharedCompanies/SharedCompanies';

const Home = () => {
    const { role, roleLoading } = UseRoleQuery();

    const commonComponents = (
        <>
            <Slider />
            <Categories />
            <DiscountOffers />
            <SharedCompanies></SharedCompanies>
            <SuccessInNumber />
            <CustomerReview />
        </>
    );

    return (
        <ReTitleProvider defaultTitle="Home">
            {roleLoading && commonComponents}

            {!roleLoading && role === 'admin' && (
                <>
                    {/* <AdminHome /> */}
                    {commonComponents}
                </>
            )}

            {!roleLoading && role === 'seller' && (
                <>
                    {/* <SellerHome /> */}
                    {commonComponents}
                </>
            )}

            {!roleLoading && role === 'user' && commonComponents}
        </ReTitleProvider>
    );
};

export default Home;
