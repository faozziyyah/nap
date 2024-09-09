import { useClearHistory } from '@/app/api/settings';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

interface ClearHistoryProps {
  clear: boolean;
  setClear: (settingsModal: boolean) => void;
}

export function ClearHistory({ clear, setClear }: ClearHistoryProps) {
  const { mutateAsync: clearHistory, isLoading } = useClearHistory();

  const handleDelete = () => {
    clearHistory();
    setClear(false);
  };
  return (
    <>
      <Modal
        open={clear}
        footer={null}
        onCancel={() => setClear(false)}
        closeIcon={<CloseCircleOutlined />}
        height="40vh"
        className="h-full"
      >
        <div className="flex flex-col space-y-2 justify-center mb-10">
          <Title level={4} className="text-center mt-10 mb-5">
            Do you want to clear all history?
          </Title>
          <div className=" space-x-4 text-center flex-row items-center justify-center">
            <Button type="default" size="large" onClick={() => setClear(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              size="large"
              className="bg-red-500"
              danger
              onClick={handleDelete}
              loading={isLoading}
            >
              Clear
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
