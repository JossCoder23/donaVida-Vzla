import { IsString, IsNumber, IsInt, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCenterDto {
  // ==========================================
  // CAMPOS REQUERIDOS (Obligatorios)
  // ==========================================

  @ApiProperty({ 
    example: 'Banco Municipal de Sangre', 
    description: 'Nombre oficial del hospital o centro de donación' 
  })
  @IsString()
  name!: string;

  @ApiProperty({ 
    example: 'Distrito Capital', 
    description: 'Estado, provincia o departamento' 
  })
  @IsString()
  state!: string;

  @ApiProperty({ 
    example: 'Caracas', 
    description: 'Ciudad donde se encuentra el centro' 
  })
  @IsString()
  city!: string;

  @ApiProperty({ 
    example: 'Avenida Norte 1, Esquina Pirineos, 1010', 
    description: 'Dirección física completa' 
  })
  @IsString()
  address!: string;

  @ApiProperty({ 
    example: 50, 
    description: 'Cantidad máxima de donantes que pueden recibir al día' 
  })
  @IsInt()
  capacity_per_day!: number;

  // ==========================================
  // CAMPOS OPCIONALES
  // ==========================================

  @ApiPropertyOptional({ 
    example: '+58 412 617 4281', 
    description: 'Número de teléfono de contacto (puede incluir código de país)' 
  })
  @IsOptional()
  @IsString()
  phone?: string; 

  @ApiPropertyOptional({ 
    example: 'Martes a partir de las 07:00 AM – 12:00 PM', 
    description: 'Horario de atención al público' 
  })
  @IsOptional()
  @IsString()
  hours?: string;

  @ApiPropertyOptional({ 
    example: 'Instagram oficial de Clínica Atías', 
    description: 'Fuente de donde se obtuvo la información del centro' 
  })
  @IsOptional()
  @IsString()
  source?: string;

  @ApiPropertyOptional({ 
    example: 'https://www.instagram.com/p/DaHcundMzVV/', 
    description: 'Enlace a redes sociales o sitio web' 
  })
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiPropertyOptional({ 
    example: 10.5133, 
    description: 'Coordenada de latitud para el mapa' 
  })
  @IsOptional()
  @IsNumber()
  lat?: number;

  @ApiPropertyOptional({ 
    example: -66.9119, 
    description: 'Coordenada de longitud para el mapa' 
  })
  @IsOptional()
  @IsNumber()
  lng?: number;

  @ApiPropertyOptional({ 
    example: 'DC-009', 
    description: 'ID personalizado. Si se omite, la base de datos generará un UUID automáticamente.' 
  })
  @IsOptional()
  @IsString()
  id?: string;

}