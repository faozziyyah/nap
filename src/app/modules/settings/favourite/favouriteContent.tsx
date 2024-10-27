import React, { useState } from 'react';
import { Typography, Button, Form } from 'antd';
import { useQueryClient } from 'react-query';
import { useUpdateFavourite } from '@/app/api/settings';
import { Chip } from '@mui/material';

const { Title } = Typography;

interface ChangeFavouriteProps {
  modalStep: number;
  profile: any;
}

const ChangeFavourite: React.FC<ChangeFavouriteProps> = ({
  modalStep,
  profile,
}) => {
  const [form] = Form.useForm();
  const { mutateAsync: changeFavourite, isLoading } = useUpdateFavourite();
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleChipClick = (choiceValue: string) => {
    setSelectedChoice((prev) => (prev === choiceValue ? null : choiceValue));
  };

  const choices = [
    { displayName: 'Independent ng', value: 'independentng' },
    { displayName: 'Dubawa org', value: 'dubawa' },
    { displayName: 'Daily Trust', value: 'dailytrust' },
    { displayName: 'Equality Reporters', value: 'equalityreporters' },
    { displayName: 'Gazetteng', value: 'gazette' },
    { displayName: 'Punch news', value: 'punch' },
    { displayName: 'Business day', value: 'businessday' },
  ];

  const handleFinish = async (values: any) => {
    if (!selectedChoice) {
      form.setFields([
        {
          name: 'fav_newstype',
          errors: ['Please select a news type'],
        },
      ]);
      return;
    }
    try {
      await changeFavourite({
        email: profile?.user_profile?.email,
        fav_newstype: selectedChoice,
        ...values,
      });
      queryClient.invalidateQueries(['profile']);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        form.setFields([
          {
            name: 'oldPassword',
            errors: ['Oops... error occurred. Try again or reset now. '],
          },
        ]);
      }
    }
  };

  const renderContent = () => {
    if (modalStep === 0) {
      return (
        <div className="flex flex-col space-y-4 p-4 sm:p-6">
          <Title level={4} className="text-left">
            Update Favourite News
          </Title>

          <p className="border-[#DBDBDB] border-b-2 mb-2">
            {selectedChoice
              ? choices.find((choice) => choice.value === selectedChoice)
                  ?.displayName
              : 'No news type selected'}
          </p>

          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <div className="flex flex-wrap justify-between items-center">
              {choices.map((choice) => (
                <Chip
                  key={choice.value}
                  label={choice.displayName}
                  clickable
                  color={
                    selectedChoice === choice.value ? 'primary' : 'default'
                  }
                  onClick={() => handleChipClick(choice.value)}
                  className="mt-4 rounded-md w-[30%]"
                />
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={isLoading}
                >
                  Change Favourite
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      );
    }
    return null;
  };

  return <>{renderContent()}</>;
};

export default ChangeFavourite;
