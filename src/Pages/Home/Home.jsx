import React from 'react';
import Header from '../../Components/Header/Header';
import DiscountOffers from '../../Components/DiscountOffers/DiscountOffers';
import Slider from '../../Components/Slider/Slider';
import Categories from '../../Components/Categories/Categories';
import SuccessInNumber from '../../Components/SuccessInNumber/SuccessInNumber';
import CustomerReview from '../../Components/CustomerReview/CustomerReview';
import Footer from '../../Components/Footer/Footer';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Categories></Categories>
            <DiscountOffers></DiscountOffers>
            <SuccessInNumber></SuccessInNumber>
            <CustomerReview></CustomerReview>
            <Footer></Footer>
        </div>
    );
};

export default Home;