import { IsString, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBloodRequirementDto {
  @ApiProperty({ example: 'A+', description: 'Tipo de sangre requerido' })
  @IsString()
  @IsNotEmpty()
  blood_type!: string;

  @ApiProperty({ example: 10, description: 'Cantidad de unidades necesarias' })
  @IsInt()
  amount!: number;

  @ApiProperty({ example: 'URGENTE', description: 'Nivel de urgencia' })
  @IsString()
  @IsNotEmpty()
  urgency!: string;

  @ApiProperty({ example: 'DC-001', description: 'ID del centro que hace la solicitud' })
  @IsString()
  @IsNotEmpty()
  center_id!: string; // Corregido: IsString permite usar tus mocks (DC-001) y UUIDs reales
}