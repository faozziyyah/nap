import React from 'react';
import { PaystackButton } from 'react-paystack';

interface PaystackPaymentProps {
  email: string;
  amount: number;
  reference: string;
  onSuccess: (reference: any) => void;
  onClose: () => void;
  loading: boolean;
}

const API_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

const PaystackPayment: React.FC<PaystackPaymentProps> = ({
  email,
  amount,
  reference,
  onSuccess,
  onClose,
}) => {
  if (!API_KEY) {
    console.error('Paystack API key is not defined');
    return null;
  }

  const componentProps = {
    email,
    amount: amount * 100,
    reference,
    publicKey: API_KEY,
    plan: 'PLN_70j3e95bsqcz99h',
    onSuccess: onSuccess,
    onClose: onClose,
    text: 'Get Started',
  };

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <PaystackButton
          {...componentProps}
          className="border block w-full !bg-primary text-white mb-5 p-3 rounded-lg"
          channels={['card', 'bank', 'ussd', 'bank_transfer']}
        />
      </div>
    </>
  );
};

export default PaystackPayment;
