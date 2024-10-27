/* eslint-disable @typescript-eslint/no-unused-vars */
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { message, Modal, Switch, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import DeleteModalContent from './delete/deleteContent';
import { useDeleteUserAccount } from '@/app/api/settings';
import { useProfile } from '@/utils/useProfile';
import VAModalContent from './voice-assistant/vaContent';
import ProfileContent from './profile/profileContent';
import ChangePassword from './password/passwordContent';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import ChangeFavourite from './favourite/favouriteContent';

const { Text } = Typography;

interface SettingsProps {
  settingsModal: boolean;
  setSettingsModal: (settingsModal: boolean) => void;
}

export const SettingsModal = ({
  settingsModal,
  setSettingsModal,
}: SettingsProps) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [assistantModal, setAssistantModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [favouriteModal, setFavouriteModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [password, setPassword] = useState('');
  const { isLoading: deleteLoading, mutateAsync: deleteUserAccount } =
    useDeleteUserAccount();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const { profile } = useProfile();
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const router = useRouter();

  const nextStep = () => setCurrentStep(currentStep + 1);
  const previousStep = () => setCurrentStep(currentStep - 1);
  const inputPassword = (e: any) => setPassword(e.target.value);

  const handleDeleteAccount = () => {
    if (profile?.User_ID) {
      deleteUserAccount(profile.User_ID);
    } else {
      message.error('User ID is not available');
    }
  };

  const handleCancelAssistant = () => {
    setSelectedGender('');
    setCurrentStep(0);
    setAssistantModal(false);
  };

  const handleAnalytics = () => {
    router.push('/analytics');
    setSettingsModal(false);
  };

  useEffect(() => {
    if (assistantModal) {
      setCurrentStep(0);
      setSelectedGender('');
      setCountry('');
    }
  }, [assistantModal]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <>
      <Modal
        open={settingsModal}
        footer={null}
        onCancel={() => setSettingsModal(false)}
        closeIcon={<CloseCircleOutlined />}
        width="90%"
        className="custom-modal max-w-screen-sm"
      >
        <div className="flex flex-col justify-center items-center space-y-8 p-10  md:p-20 modal-content">
          <div className="flex items-center w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 mr-2"
            >
              <path d="M14.438 10.148c.19-.425-.321-.787-.748-.601A5.5 5.5 0 0 1 6.453 2.31c.186-.427-.176-.938-.6-.748a6.501 6.501 0 1 0 8.585 8.586Z" />
            </svg>

            <div className="flex justify-between w-full">
              <Text>Dark Theme</Text>
              <Switch onChange={handleTheme} />
            </div>
          </div>

          <div
            className="flex items-center w-full"
            onClick={() => setProfileModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <Text>Profile Settings</Text>
          </div>

          <div
            className="flex items-center w-full"
            onClick={() => setAssistantModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path d="M7.557 2.066A.75.75 0 0 1 8 2.75v10.5a.75.75 0 0 1-1.248.56L3.59 11H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.59l3.162-2.81a.75.75 0 0 1 .805-.124ZM12.95 3.05a.75.75 0 1 0-1.06 1.06 5.5 5.5 0 0 1 0 7.78.75.75 0 1 0 1.06 1.06 7 7 0 0 0 0-9.9Z" />
              <path d="M10.828 5.172a.75.75 0 1 0-1.06 1.06 2.5 2.5 0 0 1 0 3.536.75.75 0 1 0 1.06 1.06 4 4 0 0 0 0-5.656Z" />
            </svg>
            <div className="flex justify-between w-full">
              <Text>Voice Assistant</Text>
              <RightOutlined />
            </div>
          </div>

          <div className="flex items-center w-full" onClick={handleAnalytics}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path d="M12 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-1ZM6.5 6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V6ZM2 9a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9Z" />
            </svg>
            <Text>Analytics</Text>
          </div>

          <div
            className="flex items-center w-full"
            onClick={() => setPasswordModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z"
                clipRule="evenodd"
              />
            </svg>
            <Text>Change Password</Text>
          </div>

          <div
            className="flex items-center w-full"
            onClick={() => setFavouriteModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z"
                clipRule="evenodd"
              />
            </svg>
            <Text>Change Favourite</Text>
          </div>

          <div
            className="flex items-center w-full"
            onClick={() => setDeleteModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 text-red-500 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                clipRule="evenodd"
              />
            </svg>
            <Text className="text-red-500">Delete Account</Text>
          </div>
        </div>
      </Modal>

      <Modal
        open={deleteModal}
        footer={null}
        width={500}
        onClose={() => setDeleteModal(false)}
      >
        <DeleteModalContent
          handleCancel={() => setDeleteModal(false)}
          handleNextStep={nextStep}
          handleDelete={handleDeleteAccount}
          handlePassword={inputPassword}
          modalStep={currentStep}
          password=""
          loading={deleteLoading}
          profile={profile}
        />
      </Modal>
      <Modal
        open={assistantModal}
        footer={null}
        width={500}
        closeIcon={<CloseCircleOutlined />}
        onCancel={handleCancelAssistant}
      >
        <VAModalContent
          handleCancel={() => setAssistantModal(false)}
          handleNextStep={nextStep}
          handlePreviousStep={previousStep}
          modalStep={currentStep}
          loading={deleteLoading}
          profile={profile}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          country={country}
          setCountry={setCountry}
        />
      </Modal>
      <Modal
        open={profileModal}
        footer={null}
        width={500}
        closeIcon={<CloseCircleOutlined />}
        onCancel={() => setProfileModal(false)}
      >
        <ProfileContent
          modalStep={currentStep}
          loading={deleteLoading}
          profile={profile}
        />
      </Modal>
      <Modal
        open={passwordModal}
        footer={null}
        width={500}
        closeIcon={<CloseCircleOutlined />}
        onCancel={() => setPasswordModal(false)}
      >
        <ChangePassword modalStep={currentStep} profile={profile} />
      </Modal>
      <Modal
        open={favouriteModal}
        footer={null}
        width={500}
        closeIcon={<CloseCircleOutlined />}
        onCancel={() => setFavouriteModal(false)}
      >
        <ChangeFavourite modalStep={currentStep} profile={profile} />
      </Modal>
    </>
  );
};
