/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Typography, Button, Radio, Space } from 'antd';
import { useChooseVoiceType } from '@/app/api/settings';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface VAContentProps {
  modalStep: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleCancel: () => void;
  loading: boolean;
  profile: any;
  selectedGender: string;
  setSelectedGender: (selectedGender: string) => void;
  country: string;
  setCountry: (country: string) => void;
}

const VAModalContent: React.FC<VAContentProps> = ({
  modalStep,
  handleNextStep,
  handlePreviousStep,
  profile,
  selectedGender,
  setSelectedGender,
  country,
  setCountry,
}) => {
  const { mutateAsync: setVoiceType } = useChooseVoiceType();
  const [currentVoiceType, setCurrentVoiceType] = useState<string | null>(
    `${country}${selectedGender}`,
  );

  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const handleGenderSelect = (selectedGender: string) => {
    setSelectedGender(selectedGender);
    handleNextStep();
  };

  const handleCountrySelect = async (selectedCountry: string) => {
    setCountry(selectedCountry);
    const newVoiceType = `${selectedCountry}${selectedGender}`;
    setCurrentVoiceType(newVoiceType);

    try {
      await setVoiceType(newVoiceType);
      const audioUrl = profile?.user_profile?.audio_urls[newVoiceType];
      if (audioUrl) playAudio(audioUrl);
    } catch (error) {
      console.error('Error selecting country:', error);
    }
  };

  const renderContent = () => {
    switch (modalStep) {
      case 0:
        return (
          <div className="flex flex-col items-center justify-center text-center mt-10 mb-5">
            <Title level={4}>Choose your NAP Voice Assistant</Title>
            <div className="mt-4">
              <Button
                size="large"
                type="default"
                onClick={() => handleGenderSelect('male')}
              >
                Male
              </Button>
              <Button
                size="large"
                type="primary"
                className="ml-2"
                onClick={() => handleGenderSelect('female')}
              >
                Female
              </Button>
            </div>
          </div>
        );
      case 1:
        if (!selectedGender) return null;
        return (
          <>
            <ArrowLeftOutlined onClick={handlePreviousStep} />
            <div className="flex flex-col items-start px-16 justify-center text-center mt-10 mb-10">
              <Title level={4}>Choose your NAP Voice Type</Title>
              <Radio.Group
                onChange={(e) => handleCountrySelect(e.target.value)}
                className="flex flex-col items-start text-left mt-3"
              >
                <Space direction="vertical">
                  <Radio value="us">US {selectedGender}</Radio>
                  <Radio value="ng">Nigerian {selectedGender}</Radio>
                </Space>
              </Radio.Group>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default VAModalContent;
