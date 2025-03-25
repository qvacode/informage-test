import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  isSameMonth,
  isToday,
  format,
  isSameDay,
} from 'date-fns';
import { CalendarMode } from './Calendar';
import clsx from 'clsx';

interface Props {
  currentDate: Date;
  mode: CalendarMode;
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
}

export const CalendarGrid = ({ currentDate, mode, onSelectDate, selectedDate }: Props) => {
  const start = mode === 'month' ? startOfWeek(startOfMonth(currentDate)) : startOfWeek(currentDate);
  const end = mode === 'month' ? endOfWeek(endOfMonth(currentDate)) : endOfWeek(currentDate);

  const days = [];
  let day = start;

  while (day <= end) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className='grid grid-cols-7 gap-2'>
      {days.map((d, i) => (
        <button
          key={i}
          onClick={() => onSelectDate(d)}
          className={clsx(
            'border border-blue-200 rounded-md p-2 text-center bg-blue-50 hover:bg-blue-100',
            isToday(d) && 'bg-blue-100 font-bold',
            isSameDay(d, selectedDate ?? new Date()) && 'ring-2 ring-blue-500',
            !isSameMonth(d, currentDate) && 'text-gray-400',
          )}
        >
          <p>{format(d, 'EEE')}</p>
          <p>{format(d, 'd')}</p>
        </button>
      ))}
    </div>
  );
};
