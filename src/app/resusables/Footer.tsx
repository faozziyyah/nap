import React from 'react';
import { Button, Image } from 'antd';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white bottom-0 left-0 w-full z-50 p-4">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="flex items-center">
          <Image src="/images/logo.png" alt="Logo" width={52} height={32} />
        </div>

        <div className="flex flex-row items-start md:items-center md:space-y-0 md:space-x-4 text-black md:text-primary font-light mt-4 md:mt-0">
          <Button
            type="link"
            href="#"
            className="text-[14px] md:text-[20px] no-underline bg-transparent border-none text-black md:text-primary font-light"
          >
            Features
          </Button>
          <Button
            type="link"
            href="#"
            className="text-[14px] md:text-[20px] no-underline bg-transparent border-none text-black md:text-primary font-light"
          >
            Benefits
          </Button>
          <Button
            type="link"
            href="#"
            className="text-[14px] md:text-[20px] no-underline bg-transparent border-none text-black md:text-primary font-light"
          >
            FAQs
          </Button>
        </div>
      </div>

      <div className="w-full text-left md:text-center mt-10">
        <p className="text-[12px] md:text-[16px] text-primary">
          Sage Studio. All rights reserved. © 2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;
