import React from 'react';
import Header from '../../Components/Header/Header';
import DiscountOffers from '../../Components/DiscountOffers/DiscountOffers';
import Slider from '../../Components/Slider/Slider';
import Categories from '../../Components/Categories/Categories';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Categories></Categories>
            <DiscountOffers></DiscountOffers>
        </div>
    );
};

export default Home;