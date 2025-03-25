import { useState } from 'react';
import { addMonths, subMonths, addWeeks, subWeeks, isSameDay, parseISO } from 'date-fns';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { EventList, EventItem } from './sesion-list/SesionList';
import { useMutation } from '@tanstack/react-query';
import { findAllSesions } from '@/api/sesions';

export type CalendarMode = 'month' | 'week';

export const Calendar = () => {
  const [mode, setMode] = useState<CalendarMode>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<EventItem[]>([]);

  const goNext = () => {
    setCurrentDate(prev => (mode === 'month' ? addMonths(prev, 1) : addWeeks(prev, 1)));
  };

  const goPrev = () => {
    setCurrentDate(prev => (mode === 'month' ? subMonths(prev, 1) : subWeeks(prev, 1)));
  };

  const mutation = useMutation({
    mutationFn: findAllSesions,
    onSuccess: value => {
      const filtered = value.filter(event => isSameDay(parseISO(event.startDatetime), selectedDate as Date));
      setFilteredEvents(filtered);
    },
  });

  return (
    <div className='p-4 space-y-4'>
      <CalendarHeader currentDate={currentDate} mode={mode} onModeChange={setMode} onNext={goNext} onPrev={goPrev} />
      <CalendarGrid
        currentDate={currentDate}
        mode={mode}
        onSelectDate={date => {
          setSelectedDate(date);
          mutation.mutate();
        }}
        selectedDate={selectedDate}
      />
      <EventList events={filteredEvents} />
    </div>
  );
};
