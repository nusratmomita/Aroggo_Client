import React, { useContext } from 'react';
import Slider from '../../Components/Slider/Slider';
import Categories from '../../Components/Categories/Categories';
import DiscountOffers from '../../Components/DiscountOffers/DiscountOffers';
import SuccessInNumber from '../../Components/SuccessInNumber/SuccessInNumber';
import CustomerReview from '../../Components/CustomerReview/CustomerReview';
import { ReTitleProvider } from 're-title';
import UseRoleQuery from '../../CustomHooks/UseRoleQuery';
import SellerHome from '../SellerPages/SellerHome/SellerHome';
import AdminHome from '../PagesForAdmin/AdminHome/AdminHome';
import { AuthContext } from '../../Authentication/AuthContext';

const Home = () => {
  const { role, roleLoading } = UseRoleQuery();

//   const {user} = useContext(AuthContext);
//   console.log(user)

    if (roleLoading) 
        return null;

    if (role === 'admin') {
        return (
            <ReTitleProvider defaultTitle="Home">
                <AdminHome />
                <Slider />
                <Categories />
                <DiscountOffers />
                <SuccessInNumber />
                <CustomerReview />
            </ReTitleProvider>
        );
    }

    if (role === 'seller') {
        return (
            <ReTitleProvider defaultTitle="Home">
                <SellerHome />
                <Slider />
                <Categories />
                <DiscountOffers />
                <SuccessInNumber />
                <CustomerReview />
            </ReTitleProvider>
        );
    }

    // if (role === 'user') {
    //     return (
    //         <ReTitleProvider defaultTitle="Home">
    //             {/* <SellerHome /> */}
    //             <Slider />
    //             <Categories />
    //             <DiscountOffers />
    //             <SuccessInNumber />
    //             <CustomerReview />
    //         </ReTitleProvider>
    //     );
    // }

    // default for new or unauthenticated users
    return (
        <ReTitleProvider defaultTitle="Home">
            {
                role === 'user' || role === 'undefined' && 
                <div>
                    <Slider />
                    <Categories />
                    <DiscountOffers />
                    <SuccessInNumber />
                    <CustomerReview />
                </div>
            }
            </ReTitleProvider>
            
    );
};

export default Home;
