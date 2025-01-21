import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import './Checkoutform.css';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';

const CheckoutForm = ({ sessionPrice, bookedData }) => {
  const [clientSecret, setClientSecrete] = useState('');
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    getPaymentIntent();
  }, []);

  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post(
        `/payment-intent/${sessionPrice}`
      );
      setClientSecrete(data.clientSecret);
    } catch (error) {
      console.log(error);
    }
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }

    // payment confirm
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user.displayName,
        },
      },
    });
    if (paymentIntent.status === 'succeeded') {
      axios
        .post(`${import.meta.env.VITE_API_BASE_URL}/bookedSession`, bookedData)
        .then((res) => {
          console.log(res.data);
          toast.success('Your Session booked Successfully.😊');
        })
        .catch((error) => {
          console.log(error.response);
          toast.error(`${error.response.data.message}`);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe}
        className={`px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition ${
          !stripe ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
