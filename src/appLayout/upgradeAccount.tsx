import { Button, Typography } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import React from 'react';
import { useDowngradeUser, useUpgradeUser } from '@/app/api/settings';
import { useProfile } from '@/utils/useProfile';
import PaystackPayment from '@/app/modules/dashboard/component/paystack-payment';

const { Text, Title } = Typography;

interface UpgradeAccountProps {
  isDrawerVisible: boolean;
  setIsDrawerVisible: (isDrawerVisible: boolean) => void;
}

export function UpgradeAccount({}: UpgradeAccountProps) {
  const { mutateAsync: upgrade, isLoading: isLoadingUpgrade } =
    useUpgradeUser();
  const { mutateAsync: downgrade, isLoading: isLoadingDowngrade } =
    useDowngradeUser();
  const { profile } = useProfile();

  const generatePaymentReference = () => {
    return `ref-${new Date().getTime()}-${Math.floor(Math.random() * 10000)}`;
  };

  const handleUpgrade = async () => {
    const reference = generatePaymentReference();

    await upgrade({
      amount: '2000',
      user_id: profile?.User_ID,
      user_email: profile?.user_profile?.email,
      user_fullname: profile?.user_profile?.full_name,
      payment_ref_id: reference,
    });
  };

  const handleDowngrade = async () => {
    await downgrade(profile?.User_ID);
  };

  const onSuccess = () => {
    handleUpgrade();
  };

  const onClose = () => {
    console.log('Payment closed');
  };

  const paymentReference = generatePaymentReference();

  return (
    <>
      <div className="pt-32 mt-10 lg:mt-0">
        <Title level={3} className="ml-4 mt-5 mb-5">
          Upgrade your plan
        </Title>
        <div className="flex flex-col lg:flex-row justify-center gap-10 pt-10">
          <div
            className="border border-primary border-solid bg-white p-5 rounded-lg w-full h-full flex-1 mb-10"
            style={{ borderRadius: '12px' }}
          >
            <Text className="text-lg">Free Plan</Text>
            <Title level={3}>₦0/month</Title>
            <Button
              size="large"
              className="border-2 block w-full !border-primary text-primary hover:bg-primary hover:text-white mb-5"
              style={{ borderRadius: '12px', borderColor: '#5E60CE' }}
              onClick={handleDowngrade}
              loading={isLoadingDowngrade}
            >
              Continue with Free Plan
            </Button>
            <div className="flex flex-col gap-10 space-y-10 mb-10">
              <div className="flex items-center space-x-2 mt-7">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>Generate 5 articles per day</Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>Generate 5 Summaries</Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>Translate (English, Yoruba, Igbo, Hausa)</Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>Transcribe 5 videos to text</Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>Convert 5 Text to audio feature (English)</Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>5 Video Uploads (2 mins long)</Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>
                  Voice assistant (Ng male, Ng female, US male, US female)
                </Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>5 images to audio and text descriptions</Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>5 videos to closed captioning</Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>Report 5 articles</Text>
              </div>
            </div>
          </div>

          <div
            className="border border-primary bg-white border-solid p-5 rounded-lg flex-1 w-full h-full"
            style={{ borderRadius: '12px' }}
          >
            <Text className="text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path
                  fillRule="evenodd"
                  d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
                  clipRule="evenodd"
                />
              </svg>
              Premium Plan
            </Text>
            <Title level={3}>₦2,000/month</Title>
            <PaystackPayment
              email={profile?.user_profile?.email || ''}
              amount={2000}
              reference={paymentReference}
              onSuccess={onSuccess}
              onClose={onClose}
              loading={isLoadingUpgrade}
            />
            <div className="flex flex-col gap-10 space-y-10">
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>Generate Unlimited articles</Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>
                  YouTube link to text and closed captioning Unlimited
                </Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>Image to text & audio description unlimited</Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>YouTube link to closed captioning Unlimited</Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>Generate summaries unlimited</Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>Report articles unlimited</Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>
                  Translate (English, Yoruba, Igbo, Hausa, Pidgin, Twi)
                </Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>Transcribe videos to text unlimited</Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>
                  Text to audio feature (English, Yoruba, Igbo, Hausa, Pidgin)
                </Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>Upload videos unlimited (5 mins long)</Text>
              </div>
              <div className="flex items-center">
                <CheckCircleFilled
                  className="text-primary mr-2"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
                <Text>Voice assistant (Male, Female) (Ng, US)</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
