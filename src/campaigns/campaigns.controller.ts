import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Campañas')
@ApiBearerAuth() // Activa el candado de autenticación en Swagger
@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener todas las campañas (Requiere Auth)' })
  @ApiResponse({ status: 200, description: 'Lista de campañas.' })
  @ApiResponse({ status: 401, description: 'No autorizado (Token faltante o inválido).' })
  findAll() {
    return this.campaignsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de una campaña específica' })
  @ApiResponse({ status: 200, description: 'Detalle de la campaña.' })
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear una nueva campaña (Requiere Auth)' })
  @ApiResponse({ status: 201, description: 'Campaña creada exitosamente.' })
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignsService.create(createCampaignDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar o eliminar una campaña' })
  @ApiResponse({ status: 200, description: 'Campaña eliminada.' })
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(id);
  }
}