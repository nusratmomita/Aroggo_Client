import React from 'react';
import Slider from '../../Components/Slider/Slider';
import Categories from '../../Components/Categories/Categories';
import DiscountOffers from '../../Components/DiscountOffers/DiscountOffers';
import SuccessInNumber from '../../Components/SuccessInNumber/SuccessInNumber';
import CustomerReview from '../../Components/CustomerReview/CustomerReview';
import { ReTitleProvider } from 're-title';
import SharedCompanies from '../../Components/SharedCompanies/SharedCompanies';
import TopSellingProducts from '../../Components/TopSellingProducts/TopSellingProducts';
import CategoryPromotion from '../../Components/CategoryPromotion/CategoryPromotion';

const Home = () => {

    return (
        <ReTitleProvider defaultTitle="Home">
                <Slider></Slider>
            <div className='w-full max-w-7xl mx-auto'>
                <Categories />
                <DiscountOffers />
                <SharedCompanies></SharedCompanies>
                <TopSellingProducts></TopSellingProducts>
                <CategoryPromotion></CategoryPromotion>
                <SuccessInNumber />
                <CustomerReview />
            </div>
        </ReTitleProvider>
    );
};

export default Home;
