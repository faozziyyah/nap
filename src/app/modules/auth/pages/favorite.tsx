import React, { useState } from 'react';
import { Image, message } from 'antd';
import { useRouter } from 'next/navigation';
import { Chip } from '@mui/material';

export function Favorite() {
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const router = useRouter();

  const handleChipClick = (choiceValue: string) => {
    setSelectedChoices((prev) =>
      prev.includes(choiceValue)
        ? prev.filter((item) => item !== choiceValue)
        : [...prev, choiceValue],
    );
  };

  const handleSubmit = async () => {
    const formValues = JSON.parse(localStorage.getItem('formValues') || '{}');
    //console.log(formValues);

    const fullData = { ...formValues, selectedChoices };
    //console.log(fullData);

    try {
      const response = await fetch(
        'https://news-accessibilty-platform-premium.onrender.com/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fullData),
        },
      );

      const result = await response.json();
      if (response.ok) {
        message.success('Registration Successful');
        router.push('/dashboard');
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('Failed to register. Try again later.');
    }
  };

  const choices = [
    { displayName: 'Independent ng', value: 'independentng' },
    { displayName: 'Dubawa org', value: 'dubawa' },
    { displayName: 'Daily Trust', value: 'dailytrust' },
    { displayName: 'Equality Reporters', value: 'equalityreporters' },
    { displayName: 'Gazetteng', value: 'gazette' },
    { displayName: 'Punch news', value: 'punch' },
    { displayName: 'Business day', value: 'businessday' },
  ];

  return (
    <div className="flex flex-col justify-center items-center">
      <section className="flex flex-col w-[60%] m-auto mt-12 mb-12">
        <h1 className="text-[#5E60CE] font-extrabold text-[28.8px]">
          What’s your Favourite News Website
        </h1>

        <p className="border-[#DBDBDB] border-b-2 mb-2">
          {selectedChoices.length > 0
            ? selectedChoices
                .map(
                  (choiceValue) =>
                    choices.find((choice) => choice.value === choiceValue)
                      ?.displayName,
                )
                .join(', ')
            : 'No news type selected'}
        </p>

        <div className="flex flex-wrap justify-between items-center w-[60%]">
          {choices.map((choice) => (
            <Chip
              key={choice.value}
              label={choice.displayName}
              clickable
              color={
                selectedChoices.includes(choice.value) ? 'primary' : 'default'
              }
              onClick={() => handleChipClick(choice.value)}
              className="mt-4 rounded-md w-[30%]"
            />
          ))}
        </div>

        <button className="bg-[#5E60CE] text-white rounded-lg border mt-16 w-[20%] py-2">
          Skip
        </button>

        <button
          onClick={handleSubmit}
          className="bg-[#5E60CE] text-white rounded-lg border mt-4 w-[30%] py-2 text-sm"
        >
          Continue To Dahsboard
        </button>
      </section>

      <p className="text-[#5E60CE]">
        You can always change your favourite news in the settings
      </p>

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
    </div>
  );
}

//export default favorite
