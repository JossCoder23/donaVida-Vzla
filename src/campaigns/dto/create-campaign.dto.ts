import { IsString, IsDateString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCampaignDto {
  @ApiProperty({ 
    example: 'DC-001', 
    description: 'ID del centro de donación al que pertenece esta campaña' 
  })
  @IsString()
  center_id!: string;

  @ApiProperty({ 
    example: 'Jornada de donación por terremoto', 
    description: 'Título visible de la campaña' 
  })
  @IsString()
  title!: string;

  @ApiProperty({ 
    example: 'Necesitamos apoyo urgente para los afectados en la región...', 
    description: 'Descripción detallada de la campaña' 
  })
  @IsString()
  description!: string;

  @ApiProperty({ 
    example: '2026-07-10T08:00:00Z', 
    description: 'Fecha y hora de inicio (Formato ISO 8601)' 
  })
  @IsDateString()
  start_date!: string; // NestJS transformará esto a Date para Prisma

  @ApiProperty({ 
    example: '2026-07-15T18:00:00Z', 
    description: 'Fecha y hora de finalización (Formato ISO 8601)' 
  })
  @IsDateString()
  end_date!: string;

  @ApiPropertyOptional({ 
    example: true, 
    description: 'Estado de la campaña (Activa/Inactiva). Por defecto es true.' 
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}