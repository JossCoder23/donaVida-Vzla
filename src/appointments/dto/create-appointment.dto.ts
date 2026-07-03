import { IsString, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ 
    example: 'DC-001', 
    description: 'ID del centro donde se realizará la donación' 
  })
  @IsString()
  center_id!: string;

  @ApiPropertyOptional({ 
    example: 'CAMP-001', 
    description: 'ID de la campaña (opcional, solo si la cita viene desde una campaña específica)' 
  })
  @IsOptional()
  @IsString()
  campaign_id?: string;

  @ApiProperty({ 
    example: 'Carlos Mendoza', 
    description: 'Nombre completo del donante' 
  })
  @IsString()
  donor_name!: string;

  @ApiProperty({ 
    example: 'carlos.mendoza@email.com', 
    description: 'Correo electrónico de contacto del donante' 
  })
  @IsString()
  donor_email!: string;

  @ApiProperty({ 
    example: 'O-', 
    description: 'Tipo de sangre del donante' 
  })
  @IsString()
  donor_blood_type!: string;

  @ApiProperty({ 
    example: '2026-07-12T10:30:00Z', 
    description: 'Fecha y hora agendada para la donación (Formato ISO 8601)' 
  })
  @IsDateString()
  scheduled_at!: string;

  // El campo "status" no lo exponemos en el DTO de creación porque 
  // la base de datos lo inicializa por defecto en "PENDING".
}