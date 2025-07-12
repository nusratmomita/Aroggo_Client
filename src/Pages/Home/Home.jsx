import React from 'react';
import Header from '../../Components/Header/Header';
import DiscountOffers from '../../Components/DiscountOffers/DiscountOffers';
import Slider from '../../Components/Slider/Slider';
import Categories from '../../Components/Categories/Categories';
import SuccessInNumber from '../../Components/SuccessInNumber/SuccessInNumber';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Categories></Categories>
            <DiscountOffers></DiscountOffers>
            <SuccessInNumber></SuccessInNumber>
        </div>
    );
};

export default Home;