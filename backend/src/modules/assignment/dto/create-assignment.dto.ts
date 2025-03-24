import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssignmentDto {
  @ApiProperty({
    description: 'ID del estudiante a asignar',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  estudianteId: number;

  @ApiProperty({
    description: 'ID de la sesión a la que se asigna el estudiante',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  sesionId: number;
}
