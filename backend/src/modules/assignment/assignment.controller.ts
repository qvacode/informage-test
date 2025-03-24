import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('assignment')
@ApiTags('Asignaciones')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  @ApiOperation({
    summary: 'Asigna una sesión a un estudiante',
  })
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentService.create(createAssignmentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtiene todas las asignaciones',
  })
  findAll() {
    return this.assignmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtiene una asignación por ID',
  })
  findOne(@Param('id') id: string) {
    return this.assignmentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualiza una asignación por ID',
  })
  update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return this.assignmentService.update(+id, updateAssignmentDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Elimina una asignación por ID',
  })
  remove(@Param('id') id: string) {
    return this.assignmentService.remove(+id);
  }
}
