import React, { useEffect, useState } from 'react';
import { Typography, Input, Button, Form, Modal } from 'antd';
import { useUpdateProfile } from '@/app/api/settings';
import { useQueryClient } from 'react-query';

const { Title } = Typography;

interface ProfileModalContentProps {
  modalStep: number;
  loading: boolean;
  profile: any;
}

const ProfileContent: React.FC<ProfileModalContentProps> = ({
  modalStep,
  loading,
  profile,
}) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const queryClient = useQueryClient();

  useEffect(() => {
    form.setFieldsValue({
      fullName: profile?.user_profile?.full_name || '',
      phoneNumber: profile?.user_profile?.phone_number || '',
      email: profile?.user_profile?.email || '',
    });
  }, [profile, form]);

  const handleFinish = async (values: any) => {
    await updateProfile({
      full_name: values.fullName,
      phone_no: values.phoneNumber,
    });
    queryClient.invalidateQueries(['profile']);
  };

  const showEmailModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const renderContent = () => {
    if (modalStep === 0) {
      return (
        <div className="flex flex-col space-y-4 p-4 sm:p-6">
          <Title level={4} className="text-left">
            Personal Details
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{
              fullName: profile?.user_profile?.full_name || '',
              phoneNumber: profile?.user_profile?.phone_number || '',
              email: profile?.user_profile?.email || '',
            }}
          >
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: 'Please enter your full name!' },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: 'Please enter your phone number!' },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input
                disabled
                style={{ border: '1px solid red' }}
                size="large"
                onClick={showEmailModal}
              />
            </Form.Item>
            <div className="flex justify-end mt-4">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full flex justify-center"
                  size="large"
                  loading={loading}
                  block
                >
                  Update
                </Button>
              </Form.Item>
            </div>
          </Form>

          <Modal
            title="Contact Admin"
            open={isModalVisible}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
            okText="Close"
          >
            <p>Please contact your admin to update your email.</p>
            <p>Admin Email: admin@example.com</p>
          </Modal>
        </div>
      );
    }
    return null;
  };

  return <>{renderContent()}</>;
};

export default ProfileContent;
