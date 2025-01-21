import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../Cards/CheckoutForm';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const location = useLocation();
  const { sessionPrice, bookedData } = location.state || {};

  return (
    <div>
      <h1 className="font-heading text-center text-xl my-4 py-4 text-green-500">
        Payment Section
      </h1>

      <Elements stripe={stripePromise}>
        <CheckoutForm
          sessionPrice={sessionPrice}
          bookedData={bookedData}
        ></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
