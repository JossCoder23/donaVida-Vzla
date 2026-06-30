import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CentersService } from './centers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Tu guard de autenticación
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Controller('centers')
export class CentersController {
  
  constructor(
    private readonly centersService: CentersService,
    readonly prisma:PrismaService
  ) {}

  // PÚBLICO
  @Get()
  findAll() {
    return this.centersService.findAll();
  }

  @Get('search-nearby')
  async findNearby(@Query('lat') lat: number, @Query('lng') lng: number) {
    return this.centersService.findNearby(lat, lng);
  }

  // PRIVADOS (Protegidos)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCenterDto: CreateCenterDto) { 
    return this.centersService.create(createCenterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateCenterDto: UpdateCenterDto
  ) {
    return this.centersService.update(id, updateCenterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.centersService.remove(id);
  }
}