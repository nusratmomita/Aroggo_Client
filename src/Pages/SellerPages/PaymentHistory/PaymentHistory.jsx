import React from 'react';
import { ReTitleProvider } from 're-title';


const PaymentHistory = () => {
    return (
        <ReTitleProvider defaultTitle='Payment History'>
            <div>
                PaymentHistory
            </div>
        </ReTitleProvider>
    );
};

export default PaymentHistory;