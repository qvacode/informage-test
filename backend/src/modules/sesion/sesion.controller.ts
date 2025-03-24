import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { SesionService } from './sesion.service';
import { CreateSesionDto } from './dto/create-sesion.dto';
import { UpdateSesionDto } from './dto/update-sesion.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

type CalendarType = 'week' | 'month';

@Controller('sesion')
@ApiTags('Sesiones')
export class SesionController {
  constructor(private readonly sesionService: SesionService) {}

  @Post()
  @ApiOperation({
    summary: 'Crea una nueva sesión',
  })
  create(@Body() createSesionDto: CreateSesionDto) {
    return this.sesionService.create(createSesionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtiene todas las sesiones',
  })
  findAll() {
    return this.sesionService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtiene una sesión por ID',
  })
  findOne(@Param('id') id: string) {
    return this.sesionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualiza una sesión por ID',
  })
  update(@Param('id') id: string, @Body() updateSesionDto: UpdateSesionDto) {
    return this.sesionService.update(+id, updateSesionDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Elimina una sesión por ID',
  })
  remove(@Param('id') id: string) {
    return this.sesionService.remove(+id);
  }

  @Get('dia/:fecha')
  @ApiOperation({
    summary: 'Obtiene sesiones por fecha',
  })
  getSessionsByDay(@Param('fecha') fecha: string) {
    const startOfDay = new Date(fecha);
    if (isNaN(startOfDay.getTime())) {
      throw new BadRequestException('Fecha inválida');
    }

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    return this.sesionService.findSessionsByDay(startOfDay, endOfDay);
  }

  @Get('calendar/:fecha')
  @ApiOperation({
    summary: 'Obtiene sesiones por rango de fechas (semana o mes)',
  })
  getSessionsByCalendar(
    @Query('tipo') tipo: CalendarType,
    @Param('fecha') fecha: string,
  ) {
    if (!fecha) {
      throw new BadRequestException('El parámetro "fecha" es requerido');
    }

    const givenDate = new Date(fecha);
    if (isNaN(givenDate.getTime())) {
      throw new BadRequestException('Fecha inválida');
    }

    let start: Date;
    let end: Date;

    if (tipo === 'week') {
      start = new Date(givenDate);
      start.setDate(givenDate.getDate() - givenDate.getDay());
      end = new Date(start);
      end.setDate(start.getDate() + 7);
    } else if (tipo === 'month') {
      start = new Date(givenDate.getFullYear(), givenDate.getMonth(), 1);
      end = new Date(givenDate.getFullYear(), givenDate.getMonth() + 1, 1);
    } else {
      throw new BadRequestException(
        'El parámetro "tipo" debe ser "week" o "month"',
      );
    }

    return this.sesionService.findSessionsByRange(start, end);
  }
}
