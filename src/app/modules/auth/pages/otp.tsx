import React, { useState } from 'react';
import {
  Button,
  Typography,
  Form,
  Row,
  Col,
  Checkbox,
  message,
  Dropdown,
  Input,
  Image,
} from 'antd';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/resusables/Navbar';
import ReusableOtpInput from '@/app/resusables/OTPInput';
import { useAuth } from '../hooks/useAuth';
import type { MenuProps } from 'antd';
import securedStorage from 'react-secure-storage';
import ErrorAlert from '@/app/resusables/ErrorAlerts';

const { Title, Text } = Typography;

export function OTPInput() {
  const [form] = Form.useForm();
  const [isProcessing, setProcessing] = useState(false);
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const { SendCode } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');
  const [passkey, setPasskey] = useState('');

  const renderInput = (props: any) => <input {...props} />;

  const verifyCallBack = (data: any) => {
    if (data.status !== 'success') {
      setProcessing(false);
      message.error(data.message, 3);
      setErrorMsg(data.message);
      return;
    }

    message.success(data.message, 3);
    router.push('/sign-in');
  };

  const handleSubmit = (values: any) => {
    setProcessing(true);
    const storedEmail = securedStorage.getItem('email');
    const user = {
      email: storedEmail,
      new_password: values.password,
      confirm_password: values.confirm_password,
      otp: values.otp,
    };
    SendCode(user, verifyCallBack);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <>
          <p className="mb-2 text-lg font-bold">Your password must contain:</p>
          <CheckPassword
            isValid={/^.{10,}$/.test(passkey)}
            title={'A minimum of 10 characters'}
          />
          <CheckPassword
            isValid={/(?=.*[a-z])(?=.*[A-Z])/.test(passkey)}
            title={'Uppercase and lowercase letters'}
          />
          <CheckPassword
            isValid={/(?=.*\d)/.test(passkey)}
            title={'A number'}
          />
          <CheckPassword
            isValid={/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(passkey)}
            title={'A special character'}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <Navbar />
      </div>

      <div className="flex flex-col h-screen overflow-hidden pt-16 lg:pt-0 lg:flex-row">
        <div className="relative hidden h-full w-[50%] flex-shrink-0 p-5 lg:block">
          <Image
            src="/images/OTP.png"
            preview={false}
            alt="Logo"
            loading="lazy"
            className="p-10 py-5 lg:mt-36 xl:mt-0"
          />
        </div>

        <div className="flex flex-grow overflow-y-auto items-center justify-center p-3 lg:p-8 lg:px-16 xl:px-14">
          <div className="my-10 max-w-md w-full">
            <div className="mb-6">
              <Title className="m-0" style={{ margin: 0 }} level={2}>
                Reset Password
              </Title>
              <Text className="mb-5">
                Enter the verification code sent to your email and input your
                new password
              </Text>
              <ErrorAlert message={errorMsg} />
            </div>
            <Form
              form={form}
              layout="vertical"
              initialValues={{ remember: true }}
              data-testid="form"
              onFinish={handleSubmit}
            >
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    name="otp"
                    label="Enter OTP"
                    rules={[{ required: true, message: 'OTP is required' }]}
                  >
                    <ReusableOtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderInput={renderInput}
                      renderSeparator={null}
                      inputStyle={{
                        width: 'calc(100% / 6 - 10px)', // Adjust width for responsiveness
                        height: '42px',
                        padding: '10px 0',
                        fontSize: '16px',
                        borderRadius: '4px',
                        border: '1px solid #8A8A8A',
                        textAlign: 'center',
                        color: '#000',
                      }}
                      containerStyle={{
                        gap: '10px', // Adjust gap as needed
                        display: 'flex',
                        flexWrap: 'wrap', // Ensure OTP inputs wrap on smaller screens
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={24}>
                  <Dropdown
                    menu={{ items }}
                    placement="bottomLeft"
                    arrow
                    trigger={['hover']}
                  >
                    <Form.Item
                      name="password"
                      label="Password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input a valid password',
                          pattern:
                            /^(?=.*\d)(?=.*[@$!%*?&#%^])(?=.*[a-z])(?=.*[A-Z]).{10,}$/,
                        },
                      ]}
                    >
                      <Input.Password
                        size="large"
                        onChange={(e) => setPasskey(e.target.value)}
                      />
                    </Form.Item>
                  </Dropdown>
                </Col>
                <Col xs={24} md={24} lg={24}>
                  <Form.Item
                    name="confirm_password"
                    label="Confirm Password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              'The two passwords that you entered do not match',
                            ),
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password size="large" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <div className="flex items-center space-x-3">
                      <Checkbox />
                      <p className="m-0 text-primary">Resend code</p>
                    </div>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button
                  block
                  loading={isProcessing}
                  type="primary"
                  size="large"
                  htmlType="submit"
                >
                  Proceed
                </Button>
              </Form.Item>

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
          preview={false}
          height={250}
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

interface CheckPasswordProps {
  isValid: boolean;
  title: string;
}

const SuccessPassword = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 0C2.24 0 0 2.24 0 5C0 5.74 0.160022 6.44 0.460022 7.06C0.540022 7.24 0.62998 7.41 0.72998 7.57C1.58998 9.02 3.18 10 5 10C6.82 10 8.41002 9.02 9.27002 7.57C9.37002 7.41 9.45998 7.24 9.53998 7.06C9.83998 6.44 10 5.74 10 5C10 2.24 7.76 0 5 0ZM7.07001 4.57L4.94 6.54C4.8 6.67 4.60999 6.74 4.42999 6.74C4.23999 6.74 4.05002 6.67 3.90002 6.52L2.90997 5.53C2.61997 5.24 2.61997 4.76 2.90997 4.47C3.19997 4.18 3.67997 4.18 3.96997 4.47L4.45001 4.95L6.04999 3.47C6.35999 3.19 6.82999 3.21 7.10999 3.51C7.38999 3.81 7.37001 4.28 7.07001 4.57Z"
      fill="#1363DF"
    />
  </svg>
);

const FailPassword = () => (
  <svg
    width="11"
    height="10"
    viewBox="0 0 11 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.86625 3.80317C9.74106 3.31491 9.54073 2.82665 9.2653 2.38847C9.07751 2.06296 8.82711 1.74998 8.55168 1.46204C7.65028 0.560634 6.47346 0.0724079 5.27159 0.00981048C3.90696 -0.0778259 2.51733 0.42292 1.46569 1.46204C0.476652 2.45108 -0.0241442 3.76564 0.000894728 5.08018C0.0134142 6.33213 0.51421 7.58411 1.46569 8.54811C2.12922 9.21164 2.94298 9.64979 3.80683 9.8501C4.28257 9.9753 4.78334 10.0254 5.28412 9.9878C6.47347 9.93772 7.63776 9.46203 8.55168 8.54811C9.84119 7.2586 10.2794 5.44322 9.86625 3.80317ZM7.01181 7.00816C6.64875 7.37122 6.04781 7.37122 5.68475 7.00816L4.99616 6.3196L4.33262 6.98317C3.96956 7.34624 3.36863 7.34624 3.00556 6.98317C2.6425 6.60759 2.6425 6.01917 3.00556 5.65611L3.66909 4.99254L3.03063 4.36656C2.66756 3.99098 2.66756 3.40256 3.03063 3.02697C3.40621 2.66391 3.9946 2.66391 4.37018 3.02697L4.99616 3.66548L5.65969 3.00198C6.02275 2.63892 6.61116 2.63892 6.98675 3.00198C7.34981 3.36505 7.34981 3.96598 6.98675 4.32905L6.32322 4.99254L7.01181 5.6811C7.37488 6.04416 7.37488 6.64509 7.01181 7.00816Z"
      fill="#FF0000"
    />
  </svg>
);

const CheckPassword: React.FC<CheckPasswordProps> = ({ isValid, title }) => (
  <div className="mb-2 flex items-center">
    {isValid ? <SuccessPassword /> : <FailPassword />}
    <span>{title}</span>
  </div>
);
