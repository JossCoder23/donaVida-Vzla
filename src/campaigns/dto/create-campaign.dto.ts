import { IsString, IsDateString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignDto {
  @ApiProperty()
  @IsString()
  title!:string;

  @ApiProperty()
  @IsString()
  description!:string;

  @ApiProperty()
  @IsDateString()
  start_date!:string;

  @ApiProperty()
  @IsDateString()
  end_date!:string;

  @ApiProperty()
  @IsUUID()
  center_id!:string;
}