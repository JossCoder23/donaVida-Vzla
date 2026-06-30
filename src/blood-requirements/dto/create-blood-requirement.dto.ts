import { IsString, IsInt, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBloodRequirementDto {
  @ApiProperty({ example: 'A+' })
  @IsString()
  blood_type!:string;

  @ApiProperty({ example: 10 })
  @IsInt()
  amount!:number;

  @ApiProperty({ example: 'URGENTE' })
  @IsString()
  urgency!:string;

  @ApiProperty()
  @IsUUID()
  center_id!:string;
}