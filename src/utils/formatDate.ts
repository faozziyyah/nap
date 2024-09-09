import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';

const getOrdinalSuffix = (day: number): string => {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const formatDate = (timestamp: string): string => {
  const date = dayjs(timestamp);
  const day = date.date();
  const month = date.format('MMMM');
  const year = date.year();

  return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
};
