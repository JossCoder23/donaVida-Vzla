import { IsString, IsNumber, IsInt, IsOptional, IsUrl } from 'class-validator';

export class CreateCenterDto {
  @IsString()
  name?:string;

  @IsString()
  state?:string;

  @IsString()
  city?:string;

  @IsString()
  address?:string;

  // Si el frontend envía un teléfono o no, lo aceptamos
  @IsOptional()
  @IsString()
  phone?:string; 

  @IsOptional()
  @IsString()
  hours?:string;

  @IsOptional()
  @IsString()
  source?:string;

  @IsOptional()
  @IsUrl() // Valida que si mandan URL, tenga formato correcto
  url?:string;

  // Usamos IsNumber para aceptar floats reales del JSON (ej: 10.5133)
  @IsOptional()
  @IsNumber()
  lat?:number;

  @IsOptional()
  @IsNumber()
  lng?:number;

  @IsOptional()
  @IsInt()
  capacity_per_day?:number;
}