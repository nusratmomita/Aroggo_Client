import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import UseAxiosSecureAPI from '../../CustomHooks/UseAxiosSecureAPI';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const PaymentCheckoutForm = ({ totalPrice, user, cartItems }) => {
  
  const stripe = useStripe();
  const elements = useElements();
  const axiosApi = UseAxiosSecureAPI();

  const navigate = useNavigate();

  const [paymentError, setPaymentError] = useState('');

  const totalInCents = Math.round(totalPrice * 100);

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // * step-1 get the card info and validate the card info
    const {error} = await stripe.createPaymentMethod({
        type: 'card',
        card
    });

    if (error) {
      setPaymentError(error.message);
      return;
    }

    setPaymentError('');

    // Create payment intent on server with totalInCents
    const res = await axiosApi.post('/create-payment-intent', {
      totalCostInCents: totalInCents,
    });

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });

    if (result.error) {
      setPaymentError(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        const cartItemIds = cartItems.map(item => item._id);

        const paymentData = {
            email: user?.email,// buyer email
            amount: totalInCents,
            cartItemIds: cartItemIds,
            transactionId: result.paymentIntent.id,
            paymentMethod: result.paymentIntent.payment_method_types
        }
        console.log(paymentData)


        const paymentRes = await axiosApi.post("/payment", paymentData)
        console.log(paymentRes)
        if(paymentRes.data.insertedId){
            await Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            html: `<strong>Transaction ID:</strong> <code>${result.paymentIntent.id}</code>`,
            confirmButtonText: 'Go to My Invoice Page',
        })
        navigate("/invoicePage");
        }
        // Optionally redirect or update cart/payment status here
      }
    }
  };

  return (
    <form
      onSubmit={handleCheckout}
      className="max-w-md mx-auto p-6 mt-40 bg-white rounded-lg shadow-xl space-y-4"
    >
      <h2 className="text-2xl font-extrabold text-center mb-4">
        Pay ৳{totalPrice.toFixed(2)}
      </h2>
      <CardElement className="p-3 border rounded" />
      <button
        type="submit"
        disabled={!stripe}
        className="btn bg-[#98A1BC] text-[#080c3b] w-full py-3 text-2xl rounded-xl font-bold mt-4 hover:bg-[#7f89a4]"
      >
        Pay Now
      </button>
      {paymentError && (
        <p className="text-red-600 text-center mt-2">{paymentError}</p>
      )}
    </form>
  );
};

export default PaymentCheckoutForm;
