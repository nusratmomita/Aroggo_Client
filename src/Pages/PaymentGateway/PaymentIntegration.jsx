import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext } from 'react';
import PaymentCheckForm from './PaymentCheckForm';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Authentication/AuthContext';
import UseAxiosSecureAPI from '../../CustomHooks/UseAxiosSecureAPI';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_key);
// console.log(stripePromise)

const PaymentIntegration = () => {

    const {user} = useContext(AuthContext);

    // console.log(user);
    const axiosApi = UseAxiosSecureAPI();

    const { data: cartItems = [],isLoading } = useQuery({
        queryKey: ["cart", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosApi.get(`/myCart?email=${user.email}`);
            // console.log(res.data)
            return res.data;
        },
    });

    // console.log(cartItems)

    if (isLoading) return <p>Loading...</p>;

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    // console.log(total);

    return (
        <Elements stripe={stripePromise}>
            <PaymentCheckForm
                totalPrice = {total}
                user = {user}
                cartItems = {cartItems}
            ></PaymentCheckForm>
        </Elements>
    );
};

export default PaymentIntegration;