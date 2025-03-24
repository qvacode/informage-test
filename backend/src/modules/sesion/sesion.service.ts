import { Injectable } from '@nestjs/common';
import { CreateSesionDto } from './dto/create-sesion.dto';
import { UpdateSesionDto } from './dto/update-sesion.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SesionService extends PrismaClient {
  create(createSesionDto: CreateSesionDto) {
    return this.sesion.create({ data: createSesionDto });
  }

  findAll() {
    return this.sesion.findMany();
  }

  findOne(id: number) {
    return this.sesion.findUnique({ where: { id } });
  }

  update(id: number, updateSesionDto: UpdateSesionDto) {
    return this.sesion.update({
      where: { id },
      data: updateSesionDto,
    });
  }

  remove(id: number) {
    return this.sesion.delete({ where: { id } });
  }

  findSessionsByDay(startOfDay: Date, endOfDay: Date) {
    return this.sesion.findMany({
      where: {
        startDatetime: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });
  }

  findSessionsByRange(start: Date, end: Date) {
    return this.sesion.findMany({
      where: {
        startDatetime: {
          gte: start,
          lt: end,
        },
      },
    });
  }
}
