// src/utils/dayjsConfig.ts
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/en-gb'; // If you need locale support

// Extend dayjs with the plugin
dayjs.extend(isBetween);

export default dayjs;
