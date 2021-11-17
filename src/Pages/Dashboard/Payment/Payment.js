import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51HXLxpBbrWkTQBnZBxBlEHdX7LaulFhdFDlDbZdwwkUcM3EZ2Wel5E5RKmV3aX4kBzrZ78PwX9rCqtRv8evj6fLn00LnOCMBg9');

const Payment = () => {
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data))
    }, [appointmentId])
    return (
        <div>
            <h2>Please Pay For: {appointment.patientName} for {appointment.serviceName}</h2>
            <h4>Price: $ {appointment.price}</h4>
            {appointment?.price && <Elements stripe={stripePromise}>
                <CheckoutForm appointment={appointment} />
            </Elements>}
        </div>
    );
};

export default Payment;