import { useFeedback } from '@/app/api/settings';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Typography } from 'antd';
import React from 'react';
import '@/styles/globals.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface FeedbackProps {
  feedback: boolean;
  setFeedback: (feedback: boolean) => void;
}

export function Feedback({ feedback, setFeedback }: FeedbackProps) {
  const [form] = Form.useForm();
  const { mutateAsync: submitFeedback, isLoading } = useFeedback();

  const handleSubmit = (values: any) => {
    submitFeedback(values);
    setFeedback(false);
  };

  return (
    <>
      <Modal
        open={feedback}
        footer={null}
        onCancel={() => setFeedback(false)}
        closeIcon={<CloseCircleOutlined />}
        width="90%"
        className="h-full max-w-screen-md mx-auto custom-modal"
      >
        <div className="flex flex-col space-y-2 justify-center mb-5 modal-content">
          <Title level={4} className="text-center mt-10 mb-5">
            Share Your Thoughts
          </Title>
          <Text>
            We value your opinions and would love to hear your thoughts on our
            web design. Your feedback helps us create a better user experience
            and improve our services to meet your needs.
          </Text>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            form={form}
            className="text-center modal-form"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Email is required',
                },
              ]}
            >
              <Input type="email" placeholder="Enter your Email" />
            </Form.Item>
            <Form.Item
              label="Comments"
              name="message"
              rules={[
                {
                  required: true,
                  message: 'Leave a comment',
                },
              ]}
            >
              <TextArea size="large" />
            </Form.Item>
            <div className="flex justify-end space-x-4">
              <Button
                type="primary"
                size="large"
                danger
                htmlType="submit"
                loading={isLoading}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
}
