import React from 'react';
import { Typography, Input, Button, Form } from 'antd';
import { useQueryClient } from 'react-query';
import { useUpdatePassword } from '@/app/api/settings';

const { Title } = Typography;

interface ChangePasswordProps {
  modalStep: number;
  profile: any;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
  modalStep,
  profile,
}) => {
  const [form] = Form.useForm();
  const { mutateAsync: changePassword, isLoading } = useUpdatePassword();
  const queryClient = useQueryClient();

  const handleFinish = async (values: any) => {
    try {
      await changePassword({
        email: profile?.user_profile?.email,
        ...values,
      });
      queryClient.invalidateQueries(['profile']);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        form.setFields([
          {
            name: 'oldPassword',
            errors: ['Oops... wrong password. Try again or reset now. '],
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
            Change Your Password
          </Title>
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item
              label="Old Password"
              name="user_password"
              rules={[
                { required: true, message: 'Please enter your old password!' },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="new_password"
              rules={[
                { required: true, message: 'Please enter your new password!' },
                {
                  min: 6,
                  message: 'Password must be at least 6 characters long.',
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirm_new_password"
              dependencies={['new_password']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your new password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!',
                      ),
                    );
                  },
                }),
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>
            <div className="flex justify-end mt-4">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={isLoading}
                >
                  Change Password
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

export default ChangePassword;
