import React, { useState } from 'react';
import { Button, Image } from 'antd';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white top-0 left-0 w-full z-50 flex items-center justify-between p-4">
      {/* Logo */}
      <div className={`flex items-center ${isOpen ? 'hidden' : 'block'}`}>
        <Image src="//images//Logo.png" alt="Logo" width={52} height={32} />
      </div>

      <button className="md:hidden flex items-center p-2" onClick={toggleMenu}>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        )}
      </button>

      <div
        className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute top-16 left-0 w-full p-4 bg-white shadow-md`}
      >
        <div className="flex flex-col items-start space-y-6 mt-4">
          <Button
            type="link"
            href="#"
            className="text-[20px] text-[#101010] no-underline bg-transparent border-none"
          >
            Features
          </Button>
          <Button
            type="link"
            href="#"
            className="text-[20px] text-[#101010] no-underline bg-transparent border-none"
          >
            Benefits
          </Button>
          <Button
            type="link"
            href="#"
            className="text-[20px] text-[#101010] no-underline bg-transparent border-none"
          >
            FAQs
          </Button>
          <Button
            style={{
              width: '174px',
              height: '50px',
              padding: '10px 30px',
              gap: '10px',
              borderRadius: '8px 0 0 0',
            }}
            type="primary"
            className="text-[20px] border-none"
            onClick={() => router.push('/register')}
          >
            Get Started
          </Button>
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-4 text-[#101010]">
        <Button
          type="link"
          href="#"
          className="px-3 py-2 rounded text-[20px] no-underline bg-transparent border-none text-[#101010]"
        >
          Features
        </Button>
        <Button
          type="link"
          href="#"
          className="px-3 py-2 rounded text-[20px] no-underline bg-transparent border-none text-[#101010]"
        >
          Benefits
        </Button>
        <Button
          type="link"
          href="#"
          className="px-3 py-2 rounded text-[20px] no-underline bg-transparent border-none text-[#101010]"
        >
          FAQs
        </Button>
        <Button
          style={{
            width: '174px',
            height: '50px',
            padding: '10px 30px',
            gap: '10px',
            borderRadius: '8px 0 0 0',
          }}
          type="primary"
          className="px-3 py-2 rounded border-none"
        >
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
