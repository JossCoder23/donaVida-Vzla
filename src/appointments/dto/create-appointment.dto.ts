import { IsString, IsEmail, IsUUID, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  donor_name!:string;

  @ApiProperty({ example: 'juan@email.com' })
  @IsEmail()
  donor_email!:string;

  @ApiProperty({ example: 'O+' })
  @IsString()
  donor_blood_type!:string;

  @ApiProperty({ example: 'uuid-del-centro' })
  @IsUUID()
  center_id!:string;

  @ApiProperty({ required: false, example: 'uuid-de-campana' })
  @IsUUID()
  @IsOptional()
  campaign_id?:string;

  @ApiProperty({ example: '2026-07-01T10:00:00Z' })
  @IsDateString()
  scheduled_at!:string;
}