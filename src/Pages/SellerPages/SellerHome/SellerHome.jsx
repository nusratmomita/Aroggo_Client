import React from 'react';
import { ReTitleProvider } from 're-title';


const SellerHome = () => {
    return (
        <ReTitleProvider defaultTitle='Seller Home Page'>
            <div>
                SellerHome
            </div>
        </ReTitleProvider>
    );
};

export default SellerHome;