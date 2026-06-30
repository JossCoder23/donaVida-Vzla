import { IsString, IsDecimal, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateCenterDto {
  @IsString()
  name!:string;

  @IsString()
  address!:string;

  @IsDecimal()
  lat!:number;

  @IsDecimal()
  lng!:number;

  @IsString()
  contact_info!:string;

  @IsInt()
  capacity_per_day?:number;
}
