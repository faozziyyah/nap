import React from 'react';
import { Modal, Input, Radio, Button, Typography, Form } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useHighlightText } from '@/app/api/settings';
import { useArticleContext } from '@/contexts/article-context';

const { Title } = Typography;

interface HighlightModalProps {
  visible: boolean;
  onClose: () => void;
}

export const HighlightModal: React.FC<HighlightModalProps> = ({
  visible,
  onClose,
}) => {
  const [form] = Form.useForm();
  const { mutateAsync: highlightText, isLoading } = useHighlightText();
  const { articleData } = useArticleContext();

  const handleSave = async (value: any) => {
    await highlightText({
      highlighted_text: value?.highlighted_text,
      article_id: articleData?.id,
      article_url: articleData?.url,
      tags: value.tags,
    });
    onClose();
  };

  return (
    <div>
      <Modal
        open={visible}
        onCancel={onClose}
        closeIcon={<CloseCircleOutlined />}
        width="90%"
        className="h-full max-w-screen-md mx-auto custom-modal"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Title level={4}>Report this message</Title>
          <Form.Item
            name="highlighted_text"
            label="Comment"
            rules={[{ required: true, message: 'Please add a text!' }]}
          >
            <Input.TextArea
              placeholder="Leave a comment"
              rows={4}
              style={{ resize: 'none' }}
            />
          </Form.Item>
          <Form.Item
            name="tags"
            label="How was this message helpful??"
            rules={[
              { required: true, message: 'Please select at least one tag!' },
            ]}
          >
            <Radio.Group>
              <Radio value="good">Good</Radio>
              <Radio value="bad">Bad</Radio>
              <Radio value="fake">Fake</Radio>
              <Radio value="false">False</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-1/2 md:w-1/3"
              loading={isLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
