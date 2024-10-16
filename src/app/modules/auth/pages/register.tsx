import React, { useState } from 'react';
import {
  Button,
  Typography,
  Form,
  Row,
  Col,
  Input,
  Dropdown,
  Image,
} from 'antd';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/resusables/Navbar';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import { useIPAddress } from '@/utils/useIPAddress';
import type { MenuProps } from 'antd';
import 'react-phone-number-input/style.css';
//import { useAuth } from '../hooks/useAuth';
import ErrorAlert from '@/app/resusables/ErrorAlerts';

const { Title } = Typography;

export function Register() {
  const [form] = Form.useForm();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isProcessing, setProcessing] = useState(false);
  //const { signUp } = useAuth();
  const router = useRouter();
  const [passkey, setPasskey] = useState('');
  const { data: ipAddress } = useIPAddress();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formValues, setFormValues] = useState({});

  const handleSubmit = (values: any) => {
    setFormValues(values);
    localStorage.setItem('formValues', JSON.stringify(values));
    router.push('/favourite');
  };

  /*const registerCallback = (data: any) => {
    setProcessing(false);

    if (data.status !== 'success') {
      setError(data.message);
      return;
    }

    message.success(data.message, 3);
    router.push('/dashboard');
  };

  const handleSubmit = (values: any) => {
    const user = {
      full_name: values.full_name,
      email: values.email.toLowerCase(),
      password: values.password,
      phone_number: values.phone_number,
      confirm_password: values.confirm_password,
    };

    setProcessing(true);
    signUp(user, registerCallback);
  };*/

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

      <div className="flex flex-col h-screen pt-16 lg:pt-0 lg:flex-row">
        <div className="relative hidden h-full w-[50%] flex-shrink-0 p-5 lg:block">
          <Image
            preview={false}
            src="/images/SignUpImage.png"
            alt="Logo"
            loading="lazy"
            className="p-10 py-5 lg:mt-36 xl:mt-0"
          />
        </div>

        <div className="flex flex-grow-0 overflow-y-auto items-center justify-center p-3 lg:p-8 lg:px-16 xl:px-14">
          <div className="my-20 max-w-2xl">
            <div className="mb-12">
              <Title className="m-0 mb-5 mt-16" style={{ margin: 0 }} level={2}>
                Create an Account
              </Title>
              <ErrorAlert message={error} />
            </div>
            <Form
              form={form}
              layout="vertical"
              initialValues={{ remember: true }}
              data-testid="form"
              onFinish={handleSubmit}
            >
              <Row gutter={[16, 0]}>
                <Col xs={24} md={24} lg={24}>
                  <Form.Item
                    label="Full Name"
                    name="full_name"
                    rules={[
                      {
                        required: true,
                        message: 'Full Name is required',
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      type="text"
                      placeholder="Enter your Fullname"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={24}>
                  <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Email address is required',
                      },
                      {
                        type: 'email',
                        message: 'Please enter a valid email address',
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your email"
                      size="large"
                      type="email"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={24}>
                  <Form.Item
                    label="Phone Number"
                    name="phone_number"
                    rules={[
                      {
                        required: true,
                        message: 'Phone Number is required',
                      },
                      {
                        validator(_, value) {
                          if (value && isPossiblePhoneNumber(value)) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error('Invalid phone number'),
                          );
                        },
                      },
                    ]}
                  >
                    <PhoneInput
                      defaultCountry={ipAddress?.country ?? 'US'}
                      placeholder="Enter phone number"
                      autoComplete="off"
                      autoCorrect="off"
                      onChange={(value) => value}
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
              </Row>

              <Button
                block
                loading={isProcessing}
                type="primary"
                size="large"
                htmlType="submit"
              >
                Next
              </Button>

              <div className="flex flex-col mt-6 space-y-4">
                <div className="flex justify-start">
                  <Button
                    type="link"
                    className="text-[#101010]"
                    onClick={() => router.push('/sign-in')}
                  >
                    Already have an account?{' '}
                    <span className="font-bold">Login here</span>
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 p-4 hidden lg:block">
        <Image
          src="/images/SideImage.png"
          alt="Side Image"
          width={250}
          loading="lazy"
          preview={false}
          height={500}
          style={{
            maxWidth: '100vw',
            height: 'auto',
          }}
          className=" md:max-w-[200px] lg:max-w-[150px] max-h-[500px] absolute bottom-0 right-0"
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
