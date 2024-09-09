'use client';
import React from 'react';
import { Card, Button, Avatar } from 'antd';
import { useRouter } from 'next/navigation';
import { useProfile } from './useProfile';

export const UpgradeToPremiumCard = () => {
  const router = useRouter();
  const handleUpgradeClick = () => {
    router.push('/upgrade');
  };

  const { profile } = useProfile();
  return (
    <div className="p-4">
      <Card className="w-full text-center text-white bg-primary">
        <Avatar className="bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#5E60CE"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
              clipRule="evenodd"
            />
          </svg>
        </Avatar>
        <h3 className="mb-2 text-white" style={{ color: 'white' }}>
          {profile?.user_profile?.premiumuser
            ? `Downgrade your account`
            : `Upgrade your account`}
        </h3>
        <p className="mb-4 text-white" style={{ color: 'white' }}>
          {profile?.user_profile?.premiumuser
            ? `Use Basic Features`
            : `Unlock premium features`}
        </p>
        <Button
          type="primary"
          className="bg-white text-black"
          size="large"
          onClick={handleUpgradeClick}
        >
          {profile?.user_profile?.premiumuser
            ? `Downgrade to Free`
            : `Upgrade to Premium`}
        </Button>
      </Card>
    </div>
  );
};
