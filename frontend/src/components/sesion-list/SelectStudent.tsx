import { Student } from '@/api/students';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  students: Student[];
  setUserSelected(value: number): void;
}
export function SelectStudent({ students, setUserSelected }: Props) {
  return (
    <Select onValueChange={value => setUserSelected(+value)}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Estudiantes disponibles:' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Estudiantes disponibles:</SelectLabel>
          {students.map(({ nombre, id }, i) => (
            <SelectItem key={nombre + i} value={id.toString()}>
              {nombre}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
