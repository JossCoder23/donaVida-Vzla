import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CentersService } from './centers.service';
import { CreateCenterDto } from './dto/create-center.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

// 1. @ApiTags agrupa todos estos endpoints bajo la categoría "Centros de Donación" en la UI
@ApiTags('Centros de Donación') 
@Controller('centers')
export class CentersController {
  constructor(private readonly centersService: CentersService) {}

  // ==========================================
  // RUTAS PÚBLICAS (Para el Frontend / Mapa)
  // ==========================================

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todos los centros activos',
    description: 'Devuelve una lista de todos los centros de donación formateados para el mapa del frontend.'
  })
  @ApiResponse({ status: 200, description: 'Lista de centros obtenida exitosamente.' })
  findAll() {
    return this.centersService.findAll();
  }

  @Get('nearby')
  @ApiOperation({ 
    summary: 'Obtener centros cercanos',
    description: 'Calcula la distancia euclidiana y devuelve los centros ordenados del más cercano al más lejano.'
  })
  @ApiQuery({ name: 'lat', type: Number, example: 10.5000, description: 'Latitud actual del usuario' })
  @ApiQuery({ name: 'lng', type: Number, example: -66.9000, description: 'Longitud actual del usuario' })
  @ApiResponse({ status: 200, description: 'Centros ordenados por cercanía.' })
  findNearby(@Query('lat') lat: number, @Query('lng') lng: number) {
    // Convertimos los query params a Number porque desde la URL siempre llegan como String
    return this.centersService.findNearby(Number(lat), Number(lng));
  }

  // ==========================================
  // RUTAS ADMINISTRATIVAS (Staff)
  // ==========================================

  @Post()
  @ApiOperation({ 
    summary: 'Registrar un nuevo centro',
    description: 'Crea un nuevo centro de donación en la base de datos.'
  })
  @ApiResponse({ status: 201, description: 'El centro fue creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error de validación (Faltan campos obligatorios en el JSON).' })
  create(@Body() createCenterDto: CreateCenterDto) {
    return this.centersService.create(createCenterDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un centro existente' })
  @ApiResponse({ status: 200, description: 'Centro actualizado correctamente.' })
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.centersService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Deshabilitar un centro (Soft Delete)',
    description: 'No borra el centro de la base de datos, solo cambia is_active a false.'
  })
  @ApiResponse({ status: 200, description: 'Centro deshabilitado correctamente.' })
  remove(@Param('id') id: string) {
    return this.centersService.remove(id);
  }
}