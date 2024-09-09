// SettingsModalContent.tsx
import React from 'react';
import { Typography, Input, Button } from 'antd';

const { Title, Text } = Typography;

interface SettingsModalContentProps {
  modalStep: number;
  password: string;
  handleNextStep: () => void;
  handleCancel: () => void;
  handlePassword: (e: any) => void;
  handleDelete: () => void;
  loading: boolean;
  profile: any;
}

const DeleteModalContent: React.FC<SettingsModalContentProps> = ({
  modalStep,
  handleNextStep,
  handleCancel,
  handlePassword,
  handleDelete,
  loading,
  profile,
}) => {
  const renderContent = () => {
    switch (modalStep) {
      case 0:
        return (
          <div className="flex flex-col items-center justify-center text-center mt-10 mb-5">
            <Title level={4}>
              Are you sure you want to delete your account?
            </Title>
            <div className="mt-4">
              <Button
                size="large"
                type="primary"
                className="bg-red-500"
                onClick={handleNextStep}
              >
                Yes
              </Button>
              <Button
                size="large"
                type="primary"
                className="ml-2"
                onClick={handleCancel}
              >
                No
              </Button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col space-y-2 justify-center">
            <Title level={4} className="text-center">
              Delete Account
            </Title>
            <Text className="text-center">
              To confirm your identity, please verify your password
            </Text>
            <Input.Password
              placeholder="Enter your password"
              onChange={handlePassword}
              size="large"
            />
            <div className="mt-4">
              <Button
                block
                size="large"
                className="w-full"
                type="primary"
                onClick={handleNextStep}
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col space-y-2 justify-center">
            <Title level={4} className="text-center">
              Delete Account
            </Title>
            <Text className="text-center">
              You are about to delete your Nap account. Are you absolutely
              positive?. There is no option to undo.
            </Text>
            <div className="mt-4 space-y-4">
              <Button
                block
                type="primary"
                size="large"
                className="bg-red-500"
                danger
                onClick={handleDelete}
                loading={loading}
              >
                Delete {profile?.user_profile?.full_name}'s Account
              </Button>
              <Button block type="primary" size="large" onClick={handleCancel}>
                No
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default DeleteModalContent;
