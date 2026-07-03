import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Citas')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las citas' })
  @ApiResponse({ status: 200, description: 'Lista de citas obtenida exitosamente.' })
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Agendar una nueva cita' })
  @ApiResponse({ status: 201, description: 'La cita fue agendada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error de validación en los datos enviados.' })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }
}