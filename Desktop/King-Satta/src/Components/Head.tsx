import { useEffect, useState } from 'react';
import logo from '../assets/logo.svg';

interface PhnNo {
  phoneNum2: string;
}

interface HeadProps {
  contact: PhnNo[];
}

export const Head = ({contact} : HeadProps) => {
  const [currentTime, setCurrentTime] = useState("");
  const [phnNo, setPhnNo] = useState("919303466342");
  
  useEffect(() => {
    setPhnNo(contact[0]?.phoneNum2.replace('+', '').replace(' ', ''));
  }, [contact])

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formattedTime = new Intl.DateTimeFormat('en-IN', options).format(now) + " IST";

      const modifiedTime = formattedTime.split(' ');

      const newTime = `${modifiedTime[1]} ${modifiedTime[0]}, ${modifiedTime[2]}, ${modifiedTime[4]} ${modifiedTime[5]}.`

      setCurrentTime(newTime);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='flex-col items-center justify-center md:w-5/6 mx-auto text-center md:py-2 md:px-5 px-2'>
      <img className='h-20 object-contain w-full md:px-0 px-2' src={logo} alt="logo" />
      <p className='text-sm font-normal my-2 tracking-tight'>Satta King Result Chart of January-2025 And Leak Numbers for Gali, Desawar, Ghaziabad and Faridabad from Satta King Fast, Satta King 2025 chart, satta king desawar 2025, satta king desawar 2025, Black Satta King 786.</p>
      <p className='gibeMeborder bg-white my-2 py-2 rounded-sm px-2 text-sm font-normal text-blue-700'>Satta-King-Fast.com is most popular gaming discussion forum for players to use freely and we are not in partnership with any gaming company.</p>
      <p className='gibeMeborder bg-white my-2 py-2 rounded-sm px-2 text-md font-normal text-red-600'>कृपया ध्यान दें, लीक जोड़ी लेने के लिए हमें संपर्क करे -धन्यवाद</p>
      <p className='gibeMeborder bg-white my-2 py-2 rounded-sm px-2 text-md font-normal text-green-600'>हमसे संपर्क करने के लिए ➡️
        <span className='text-blue-600 cursor-pointer text-lg'
          onClick={() => {
            const phoneNumber = phnNo;
            const message = "Hi";
            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
          }}>
          यहाँ क्लिक करें
        </span>
      </p>
      <p className='md:mt-2 my-2 rounded-sm px-2 text-md text-nowrap font-normal text-green-600'>Updated: {currentTime}</p>
    </div>
  );
};
