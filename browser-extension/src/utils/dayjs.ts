import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { ref } from 'vue';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const refTick = ref(0);
setInterval(() => refTick.value++, 1000);
export const dayjsLive = () => {
  // Touch reactive value
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = refTick.value;
  return dayjs();
};
