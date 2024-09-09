import React, { useState } from 'react';
import {
  Button,
  Typography,
  Form,
  Row,
  Col,
  Input,
  Checkbox,
  message,
  Image,
} from 'antd';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/resusables/Navbar';
import { useAuth } from '../hooks/useAuth';
import ErrorAlert from '@/app/resusables/ErrorAlerts';
import securedStorage from 'react-secure-storage';

const { Title, Text } = Typography;

export function ForgotPassword() {
  const [form] = Form.useForm();
  const [isProcessing, setProcessing] = useState(false);
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');
  const { resetPassword } = useAuth();

  const resetCallBack = (data: any) => {
    if (data.status !== 'success') {
      setProcessing(false);
      message.error(data.message, 3);
      setErrorMsg(data.message);
      return;
    }

    message.success(data.message, 3);
    router.push('/input-otp');
  };

  const handleSubmit = (values: any) => {
    setProcessing(true);
    securedStorage.setItem('email', values.email.toLowerCase());
    resetPassword(
      {
        email: values.email.toLowerCase(),
      },
      resetCallBack,
    );
  };

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <Navbar />
      </div>

      <div className="flex flex-col h-screen pt-16 lg:pt-0 lg:flex-row">
        <div className="relative hidden h-full w-[50%] flex-shrink-0 p-5 lg:block lg:mt-36 xl:mt-0">
          <Image
            src="/images/ForgotPAssword.png"
            loading="lazy"
            alt="Logo"
            preview={false}
            className="p-10 py-5"
          />
        </div>

        <div className="flex flex-grow-0 overflow-y-auto items-center justify-center p-3 lg:p-8 lg:px-16 xl:px-14">
          <div className="my-20 max-w-2xl">
            <div className="mb-12">
              <Title className="m-0" style={{ margin: 0 }} level={2}>
                Forgot Password
              </Title>
              <div className="mt-4 mb-5">
                <Text>
                  Don’t worry it occurs. Enter the email address linked with
                  your account to receive OTP.{' '}
                </Text>
              </div>
              <ErrorAlert message={errorMsg} />
            </div>
            <Form
              form={form}
              layout="vertical"
              initialValues={{ remember: true }}
              data-testid="form"
              onFinish={handleSubmit}
            >
              <Row gutter={[2, 0]}>
                <Col xs={24} md={24} lg={24}>
                  <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Email address is required',
                      },
                    ]}
                  >
                    <Input
                      placeholder="you@example.com"
                      size="large"
                      data-testid="email-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={12}>
                  <Form.Item>
                    <div className="flex items-center space-x-3">
                      <Checkbox />
                      <p className="m-0">Remember this device.</p>
                    </div>
                  </Form.Item>
                </Col>
              </Row>

              <Button
                block
                loading={isProcessing}
                type="primary"
                size="large"
                htmlType="submit"
              >
                Proceed
              </Button>

              <div className="flex flex-col mt-6 space-y-4">
                <div className="flex justify-start">
                  <Button
                    type="link"
                    className="text-black"
                    onClick={() => router.push('/sign-in')}
                  >
                    Remember password?
                    <span className="text-primary"> Log In</span>
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 p-4">
        <Image
          src="/images/SideImage.png"
          alt="Side Image"
          width={250}
          height={250}
          preview={false}
          loading="lazy"
          style={{
            maxWidth: '100vw',
            height: 'auto',
          }}
          className="max-w-[120px] md:max-w-[250px] lg:max-w-[300px] max-h-[200px] absolute bottom-0 right-0"
        />
      </div>
    </>
  );
}
