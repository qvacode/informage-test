import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('student')
@ApiTags('Estudiantes')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiOperation({
    summary: 'Crea un nuevo estudiante',
  })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtiene todos los estudiantes',
  })
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtiene un estudiante por ID',
  })
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualiza un estudiante por ID',
  })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Elimina un estudiante por ID',
  })
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
