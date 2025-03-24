import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSesionDto {
  @ApiProperty({
    description: 'Nombre de la sesión',
    example: 'Matemáticas Avanzadas',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Fecha de inicio',
    example: '2025-03-24T21:00:05.434Z',
  })
  @IsDate()
  @Type(() => Date)
  startDatetime: Date;

  @ApiProperty({
    description: 'Fecha de fin',
    example: '2025-03-24T21:00:05.434Z',
  })
  @IsDate()
  @Type(() => Date)
  endDatetime: Date;

  @ApiProperty({
    description: 'Cupo de la sesión',
    example: 20,
  })
  @IsNumber()
  @IsNotEmpty()
  cupo: number;
}
