import { ConflictException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StudentService extends PrismaClient {
  async create(createStudentDto: CreateStudentDto) {
    const studentExists = await this.estudiante.findUnique({
      where: { email: createStudentDto.email },
    });

    if (studentExists) {
      throw new ConflictException('El estudiante ya existe');
    }

    return this.estudiante.create({ data: createStudentDto });
  }

  findAll() {
    return this.estudiante.findMany();
  }

  findOne(id: number) {
    return this.estudiante.findUnique({
      where: { id },
    });
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.estudiante.update({
      where: { id },
      data: updateStudentDto,
    });
  }

  remove(id: number) {
    return this.estudiante.delete({ where: { id } });
  }
}
