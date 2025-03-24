import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({
    description: 'Nombre del estudiante',
    example: 'Juan Pérez',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Email del estudiante',
    example: 'juan@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
