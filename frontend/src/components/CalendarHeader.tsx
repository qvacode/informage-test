import { format } from 'date-fns';
import { CalendarMode } from './Calendar';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface Props {
  currentDate: Date;
  mode: CalendarMode;
  onModeChange: (mode: CalendarMode) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const CalendarHeader = ({ currentDate, mode, onModeChange, onNext, onPrev }: Props) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-2'>
        <Button variant='outline' onClick={onPrev}>
          ←
        </Button>
        <h2 className='text-xl font-semibold'>{format(currentDate, 'MMMM yyyy')}</h2>
        <Button variant='outline' onClick={onNext}>
          →
        </Button>
      </div>
      <ToggleGroup type='single' value={mode}>
        <ToggleGroupItem value='month' onClick={() => onModeChange('month')}>
          Mes
        </ToggleGroupItem>
        <ToggleGroupItem value='week' onClick={() => onModeChange('week')}>
          Semana
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
