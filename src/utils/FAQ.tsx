import React from 'react';
import { Collapse } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Import Ant Design styles

const { Panel } = Collapse;

const FAQ: React.FC = () => {
  return (
    <section className="bg-white py-6 px-4 md:px-20 flex justify-center">
      <div className="w-full max-w-[1317px]">
        <Collapse
          expandIconPosition="right"
          expandIcon={({ isActive }) =>
            isActive ? (
              <MinusOutlined style={{ color: '#007bff' }} /> // Primary color for minus icon
            ) : (
              <PlusOutlined style={{ color: '#007bff' }} /> // Primary color for plus icon
            )
          }
          bordered={false}
          style={{
            width: '100%',
            backgroundColor: 'white', // Set background color to white
          }}
        >
          <Panel
            header={
              <span className="text-lg md:text-xl lg:text-2xl">
                What is the purpose of this software?
              </span>
            }
            key="1"
            style={{
              borderBottom: '1.5px solid #007bff',
              padding: '30px 10px',
              backgroundColor: 'white',
            }} // Primary color for border
          >
            <p className="text-base md:text-lg lg:text-xl">
              This software provides instant updates from various news sources
              with features like text-to-audio, transcription, summaries, and
              highlights.
            </p>
          </Panel>
          <Panel
            header={
              <span className="text-lg md:text-xl lg:text-2xl">
                How does text-to-audio work?
              </span>
            }
            key="2"
            style={{
              borderBottom: '1.5px solid #007bff',
              padding: '30px 10px',
              backgroundColor: 'white',
            }} // Primary color for border
          >
            <p className="text-base md:text-lg lg:text-xl">
              The text-to-audio feature converts written text into spoken audio
              using advanced speech synthesis technology.
            </p>
          </Panel>
          <Panel
            header={
              <span className="text-lg md:text-xl lg:text-2xl">
                Can I use the software offline?
              </span>
            }
            key="3"
            style={{
              borderBottom: '1.5px solid #007bff',
              padding: '30px 10px',
              backgroundColor: 'white',
            }} // Primary color for border
          >
            <p className="text-base md:text-lg lg:text-xl">
              Some features of the software may be available offline, but an
              internet connection is required for updates and some
              functionalities.
            </p>
          </Panel>
          <Panel
            header={
              <span className="text-lg md:text-xl lg:text-2xl">
                Is my data secure with this software?
              </span>
            }
            key="4"
            style={{
              borderBottom: '1.5px solid #007bff',
              padding: '30px 10px',
              backgroundColor: 'white',
            }} // Primary color for border
          >
            <p className="text-base md:text-lg lg:text-xl">
              Yes, the software employs robust encryption methods to ensure that
              your data remains secure and confidential.
            </p>
          </Panel>
        </Collapse>
      </div>
    </section>
  );
};

export default FAQ;
