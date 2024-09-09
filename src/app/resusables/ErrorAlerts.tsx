import { Alert } from 'antd';

function ErrorAlert({ message }: { message: string }) {
  return message ? <Alert message={message} type="error" /> : null;
}

export default ErrorAlert;
