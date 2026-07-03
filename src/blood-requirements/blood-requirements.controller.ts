import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BloodRequirementsService } from './blood-requirements.service';
import { CreateBloodRequirementDto } from './dto/create-blood-requirement.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Requerimientos de Sangre')
@Controller('blood-requirements')
export class BloodRequirementsController {
  constructor(private readonly bloodRequirementsService: BloodRequirementsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los requerimientos de sangre urgentes' })
  @ApiResponse({ status: 200, description: 'Lista obtenida correctamente.' })
  findAll() {
    return this.bloodRequirementsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo requerimiento de sangre (Staff del Centro)' })
  @ApiResponse({ status: 201, description: 'Requerimiento creado exitosamente.' })
  create(@Body() createBloodRequirementDto: CreateBloodRequirementDto) {
    return this.bloodRequirementsService.create(createBloodRequirementDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un requerimiento de sangre' })
  @ApiResponse({ status: 200, description: 'Requerimiento eliminado correctamente.' })
  remove(@Param('id') id: string) {
    return this.bloodRequirementsService.remove(id);
  }
}