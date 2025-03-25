import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SelectStudent } from './SelectStudent';
import { Button } from '../ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { findAllStudents } from '@/api/students';
import { createAssignment } from '@/api/assignment';
import { toast } from 'sonner';

export interface EventItem {
  nombre: string;
  startDatetime: string;
  endDatetime: string;
  cupo: number;
  id: number;
}

interface Props {
  events: EventItem[];
}

export const EventList = ({ events }: Props) => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [userSelected, setUserSelected] = useState<number | null>(null);
  const [, setIsOpen] = useState<boolean>(false);

  const query = useQuery({
    queryKey: ['students'],
    queryFn: findAllStudents,
  });

  const mutation = useMutation({
    mutationFn: (data: { estudianteId: number; sesionId: number }) =>
      createAssignment(data.estudianteId, data.sesionId),
    onSuccess: () => toast.success('Event has been created'),
    onError: error => toast.error(error.message),
  });

  const handleAssign = () => {
    if (!userSelected || !selectedEvent) return;
    mutation.mutate({ estudianteId: userSelected, sesionId: selectedEvent.id });
  };

  if (events.length === 0) return null;

  return (
    <div className='bg-white p-4 rounded-md shadow-md'>
      <h3 className='text-lg font-semibold mb-3 text-blue-900'>Eventos del día</h3>

      <div className='flex gap-4 overflow-x-auto no-scrollbar py-2'>
        {events.map((e, i) => {
          const start = parseISO(e.startDatetime);
          const end = parseISO(e.endDatetime);

          return (
            <Dialog
              key={i}
              onOpenChange={value => {
                if (!value) {
                  setSelectedEvent(null);
                  setUserSelected(null);
                }
                setIsOpen(value);
              }}
            >
              <DialogTrigger asChild>
                <Card
                  onClick={() => {
                    setSelectedEvent(e);
                    setIsOpen(true);
                  }}
                  className='min-w-[160px] border-2 border-blue-200 bg-blue-50 text-blue-900 flex-shrink-0 cursor-pointer hover:bg-blue-100 transition'
                >
                  <CardHeader className='p-3 pb-0 text-center'>
                    <CardTitle className='text-base uppercase font-bold'>{e.nombre}</CardTitle>
                  </CardHeader>
                  <CardContent className='p-3 pt-1 text-center text-sm space-y-1'>
                    <div>
                      {format(start, 'HH:mm')} a {format(end, 'HH:mm')}
                    </div>
                    <div>Cupo: {e.cupo}</div>
                  </CardContent>
                </Card>
              </DialogTrigger>

              {selectedEvent && (
                <DialogContent className='max-w-lg'>
                  <DialogHeader>
                    <DialogTitle className='uppercase'>{selectedEvent.nombre}</DialogTitle>
                    <DialogDescription>Detalles del evento seleccionado</DialogDescription>
                  </DialogHeader>
                  <div className='mt-4 space-y-2 text-sm text-gray-700'>
                    <p>
                      <strong>Horario:</strong> {format(parseISO(selectedEvent.startDatetime), 'HH:mm')} a{' '}
                      {format(parseISO(selectedEvent.endDatetime), 'HH:mm')}
                    </p>
                    <p>
                      <strong>Cupo disponible:</strong> {selectedEvent.cupo}
                    </p>
                    <p>
                      <strong>Fecha:</strong> {format(parseISO(selectedEvent.startDatetime), 'PPP')}
                    </p>
                  </div>
                  <div className='bg-blue-50 p-4 rounded-md flex flex-col gap-2'>
                    <p className='font-semibold'>Asignar a estudiante:</p>
                    {query.isLoading && <p>Cargando...</p>}
                    {query.isError && <p>Error al cargar los estudiantes</p>}
                    {query.data && <SelectStudent students={query.data} setUserSelected={setUserSelected} />}
                  </div>
                  <Button
                    variant='secondary'
                    onClick={() => {
                      setIsOpen(false);
                      handleAssign();
                    }}
                    disabled={!userSelected || !selectedEvent}
                  >
                    Asignar
                  </Button>
                </DialogContent>
              )}
            </Dialog>
          );
        })}
      </div>
    </div>
  );
};
