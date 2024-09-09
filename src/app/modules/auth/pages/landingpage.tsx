'use client';

import React from 'react';
import Navbar from '@/app/resusables/Navbar';
import { Divider, Typography, Button, Image } from 'antd';
import Footer from '@/app/resusables/Footer';
import FAQ from '@/utils/FAQ';
import { useRouter } from 'next/navigation';
const { Title, Text } = Typography;

const images = [
  '/images/Sports.png',
  '/images/Punch.png',
  '/images/Independent.png',
  '/images/BBC.png',
  '/images/Guardian.png',
  '/images/Times.png',
  '/images/Daily.png',
];

export function LandingPage() {
  const router = useRouter();
  return (
    <section>
      <div>
        <Navbar />
        <div className="bg-primary">
          <Divider />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center mt-20 px-4 md:px-8 lg:px-16">
        <Title className="text-[30px] lg:text-[50px] mb-4">
          Elevate Your News Experience
        </Title>
        <Text className="text-[14px] lg:text-[18px] max-w-4xl text-[#001514]">
          Get instant updates from any source with our game-changing software.
          Enjoy text-to-audio, transcription, summaries, highlights, closed
          captioning, and more. NAP makes news awesome for everyone, everywhere.
        </Text>
        <div className="mt-5">
          <Button
            style={{
              width: '246px',
              height: '50px',
              padding: '20px 40px 20px 40p',
              gap: '10px',
              borderRadius: '12px',
            }}
            type="primary"
            className="text-[15px] border-none"
            onClick={() => router.push('/register')}
          >
            Get Started Today
          </Button>
        </div>
      </div>
      <div className="relative w-full mt-10">
        <Image
          src="/images/HomeImage.png"
          alt="Logo"
          width="100%"
          height="100%"
          style={{ objectFit: 'contain' }}
          className="w-full h-auto"
        />
      </div>
      <div className="mt-20 flex flex-col items-center w-full">
        <Title className="text-center text-[24px] md:text-[40px]">
          Supported Platforms
        </Title>
        <div className="overflow-x-auto w-full">
          <div className="flex flex-row md:gap-16 p-2 md:p-4">
            {images.map((src, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={src}
                  alt={`Image ${index + 1}`}
                  preview={false}
                  height={40}
                  width={200}
                  className="object-contain h-10"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-32">
        <Title className="text-center text-[24px] md:text-[40px]">
          Features
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 md:px-8 lg:px-16">
          <div className="border-solid rounded-[12px] border-[1.5px] p-[20px] border-[#5E60CE]">
            <svg
              className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-primary"
              viewBox="0 0 54 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M48.3332 0.333252C49.7477 0.333252 51.1043 0.895155 52.1045 1.89535C53.1047 2.89554 53.6666 4.2521 53.6666 5.66658V32.3333C53.6666 33.7477 53.1047 35.1043 52.1045 36.1045C51.1043 37.1047 49.7477 37.6666 48.3332 37.6666H5.66658C2.70659 37.6666 0.333252 35.2666 0.333252 32.3333V5.66658C0.333252 2.70659 2.70659 0.333252 5.66658 0.333252H48.3332ZM42.9999 32.3333V26.9999H28.3333L22.9999 32.3333H42.9999ZM10.9999 32.3333H17.6666L35.9333 13.9866C36.4666 13.4799 36.4666 12.6266 35.9333 12.0933L31.2399 7.39992C30.7066 6.86659 29.8533 6.86659 29.3466 7.39992L10.9999 25.7466V32.3333Z"
                fill="currentColor"
              />
            </svg>

            <Title className="text-[24px] md:text-[32px]">
              Video Transcription
            </Title>
            <Text className="text-[14px] md:text-[18px]">
              Effortlessly convert your videos into accurate, readable text with
              our Transcribe Video to Text service. Enhance accessibility. Save
              time and reach a wider audience with precise transcriptions today!
            </Text>
          </div>
          <div className="border-solid rounded-[12px] border-[1.5px] p-[20px] border-[#5E60CE]">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-primary"
              >
                <path
                  fillRule="evenodd"
                  d="M11 5a.75.75 0 0 1 .688.452l3.25 7.5a.75.75 0 1 1-1.376.596L12.89 12H9.109l-.67 1.548a.75.75 0 1 1-1.377-.596l3.25-7.5A.75.75 0 0 1 11 5Zm-1.24 5.5h2.48L11 7.636 9.76 10.5ZM5 1a.75.75 0 0 1 .75.75v1.261a25.27 25.27 0 0 1 2.598.211.75.75 0 1 1-.2 1.487c-.22-.03-.44-.056-.662-.08A12.939 12.939 0 0 1 5.92 8.058c.237.304.488.595.752.873a.75.75 0 0 1-1.086 1.035A13.075 13.075 0 0 1 5 9.307a13.068 13.068 0 0 1-2.841 2.546.75.75 0 0 1-.827-1.252A11.566 11.566 0 0 0 4.08 8.057a12.991 12.991 0 0 1-.554-.938.75.75 0 1 1 1.323-.707c.049.09.099.181.15.271.388-.68.708-1.405.952-2.164a23.941 23.941 0 0 0-4.1.19.75.75 0 0 1-.2-1.487c.853-.114 1.72-.185 2.598-.211V1.75A.75.75 0 0 1 5 1Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <Title className="text-[24px] md:text-[32px]">
              Language Translator
            </Title>
            <Text className="text-[14px] md:text-[18px]">
              Expand your reach! Translate your content into three indigenous
              languages effortlessly. Break language barriers, enhance cultural
              connections, and engage a broader audience.{' '}
            </Text>
          </div>
          <div className="border-solid rounded-[12px] border-[1.5px] p-[20px] border-[#5E60CE]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-primary"
            >
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm-.847-9.766A.75.75 0 0 0 6 5.866v4.268a.75.75 0 0 0 1.153.633l3.353-2.134a.75.75 0 0 0 0-1.266L7.153 5.234Z"
                clipRule="evenodd"
              />
            </svg>

            <Title className="text-[24px] md:text-[32px]">Audio to Text</Title>
            <Text className="text-[14px] md:text-[18px]">
              Bring your text to life! Convert your content into high-quality
              audio instantly. Enhance accessibility, cater to auditory
              learners, and reach a wider audience with engaging spoken word.{' '}
            </Text>
          </div>
        </div>
      </div>
      <div className="mt-32">
        <Title className="text-center text-[24px] md:text-[40px]">
          Benefits
        </Title>
        <div className="flex flex-col items-center justify-center text-center mt-10 px-8 lg:px-16">
          <Title className="text-[24px] md:text-[30px]">
            Translate articles to 3 indigenous languages
          </Title>
          <Text className="text-[14px] md:text-[18px] text-[#001514]">
            Our expert translation services will bring your articles to life in
            three indigenous languages, making your content accessible and
            engaging for all. Don't let language barriers hold you back, unlock
            the power of effective communication and cultural connection today!
          </Text>
          <div className="hidden md:block px-4 md:px-8 lg:px-16">
            <Image
              src="/images/Translate.png"
              alt="Translation Image for Large Screens"
              width="100%"
              height="100%"
              preview={false}
              style={{ objectFit: 'contain' }}
              className="w-full h-auto mt-10"
            />
          </div>
          <div className="block md:hidden px-4 md:px-8 lg:px-16">
            <Image
              src="/images/Translate-small.png"
              alt="Translation Image for Small Screens"
              width="100%"
              height="100%"
              preview={false}
              style={{ objectFit: 'contain' }}
              className="w-full h-auto mt-10"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center mt-20 px-8 lg:px-16">
          <Title className="text-[24px] md:text-[30px]">
            Listen to articles in different voices
          </Title>
          <Text className="text-[14px] md:text-[18px]">
            Whether you prefer a soothing narration, an energetic tone, or a
            professional delivery, our platform allows you to choose the voice
            that best suits your mood and style. Transform your articles into
            captivating audio experiences and enjoy the ultimate convenience of
            listening on the go. Dive into a world of diverse voices and make
            every article a personalized auditory adventure.
          </Text>
          <div className="hidden md:block px-4 md:px-8 lg:px-16">
            <Image
              src="/images/Listen.png"
              alt="Listening Image for Large Screens"
              width="100%"
              height="100%"
              preview={false}
              style={{ objectFit: 'contain' }}
              className="w-full h-auto mt-10"
            />
          </div>
          <div className="block md:hidden px-4 md:px-8 lg:px-16">
            <Image
              src="/images/Listen-small.png"
              alt="Listening Image for Small Screens"
              preview={false}
              width="100%"
              height="100%"
              style={{ objectFit: 'contain' }}
              className="w-full h-auto mt-10"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center mt-20 px-8 lg:px-16">
          <Title className="text-[24px] md:text-[30px]">
            Transcribe videos to text
          </Title>
          <Text className="text-[14px] md:text-[18px]">
            Unlock the full potential of your videos with our Transcribe Videos
            to Text service! As a user, enjoy seamless access to all video
            content by converting it into clear, readable text. Enhance your
            understanding, save time, and ensure you never miss important
            information. Empower yourself with precise transcriptions and make
            every video accessible and inclusive.
          </Text>
          <div className="hidden md:block px-4 md:px-8 lg:px-16">
            <Image
              src="/images/Transcribe.png"
              alt="Transcription Image for Large Screens"
              width="100%"
              height="100%"
              preview={false}
              style={{ objectFit: 'contain' }}
              className="w-full h-auto mt-10"
            />
          </div>
          <div className="block md:hidden px-4 md:px-8 lg:px-16">
            <Image
              src="/images/Transcribe-small.png"
              alt="Transcription Image for Small Screens"
              preview={false}
              width="100%"
              height="100%"
              style={{ objectFit: 'contain' }}
              className="w-full h-auto mt-10"
            />
          </div>
        </div>
      </div>
      <div className="mt-32">
        <Title className="text-center text-[24px] md:text-[40px]">FAQ</Title>
        <FAQ />
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </section>
  );
}

export default LandingPage;
