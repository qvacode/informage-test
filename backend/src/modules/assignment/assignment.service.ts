import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AssignmentService extends PrismaClient {
  async create(createAsignacionDto: CreateAssignmentDto) {
    const { estudianteId, sesionId } = createAsignacionDto;

    const estudiante = await this.estudiante.findUnique({
      where: { id: estudianteId },
    });
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado');
    }

    const sesion = await this.sesion.findUnique({
      where: { id: sesionId },
    });
    if (!sesion) {
      throw new BadRequestException('Sesión no encontrada');
    }

    const asignacionesCount = await this.asignacion.count({
      where: { sesionId },
    });
    if (asignacionesCount >= sesion.cupo) {
      throw new BadRequestException('Cupo alcanzado para la sesión');
    }

    const asignacionesDelEstudiante = await this.asignacion.findMany({
      where: { estudianteId },
      include: { sesion: true },
    });

    const overlapping = asignacionesDelEstudiante.some((asignacion) => {
      const sesionExistente = asignacion.sesion;

      return (
        sesion.startDatetime < sesionExistente.endDatetime &&
        sesion.endDatetime > sesionExistente.startDatetime
      );
    });

    if (overlapping) {
      throw new BadRequestException(
        'El estudiante ya está inscrito en una sesión que se solapa en horario',
      );
    }

    return await this.asignacion.create({
      data: {
        estudianteId,
        sesionId,
      },
    });
  }

  findAll() {
    return this.asignacion.findMany({
      include: {
        estudiante: true,
        sesion: true,
      },
    });
  }

  findOne(id: number) {
    return this.asignacion.findUnique({
      where: { id },
      include: {
        estudiante: true,
        sesion: true,
      },
    });
  }

  update(id: number, updateAsignacionDto: UpdateAssignmentDto) {
    return this.asignacion.update({
      where: { id },
      data: updateAsignacionDto,
    });
  }

  remove(id: number) {
    return this.asignacion.delete({ where: { id } });
  }
}
