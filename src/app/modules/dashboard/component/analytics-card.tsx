import { Card, Typography } from 'antd';
import React from 'react';

interface AnalyticsData {
  title: any;
  value: string;
  week_value: string;
  icon: any;
}

const { Title } = Typography;

const AnalyticsCard = ({ title, value, icon }: AnalyticsData) => {
  const style = {
    display: 'flex',
    border: '1px solid rgba(149, 149, 172, 0.16)',
    borderRadius: '8px',
    padding: '20px',
  };

  return (
    <>
      <Card
        hoverable
        style={style}
        className={`h-full flex-col justify-between space-y-1`}
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 5,
          height: '100%',
        }}
      >
        <div className="mb-2 flex justify-between items-center space-x-2 text-left capitalize">
          <div
            style={{
              fontWeight: 'bold',
            }}
            className="text-[12px] lg-[16px] lg:ml-[16px]"
          >
            {title}
          </div>
          <div>{icon}</div>
        </div>
        <div
          className="text-[12px] lg-[16px] lg:ml-[22px] !text-black"
          style={{ textAlign: 'left' }}
        >
          <Title level={3}>{value}</Title>
        </div>
        <div className="ml-5 flex h-full text-center"></div>
      </Card>
    </>
  );
};

export default AnalyticsCard;
