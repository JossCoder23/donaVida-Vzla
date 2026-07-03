import { IsEmail, IsString, IsNumber, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DonorRegisterDto {
  @ApiProperty({ example: 'donante@email.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Carlos Mendoza' })
  @IsString()
  full_name!: string;

  @ApiProperty({ example: 'O+', description: 'Tipo de sangre del donante' })
  @IsString()
  @IsNotEmpty()
  blood_type!: string; 

  @ApiProperty({ example: 10.5133, description: 'Latitud actual del donante' })
  @IsNumber() // Corregido: antes era IsDecimal
  lat!: number;

  @ApiProperty({ example: -66.9119, description: 'Longitud actual del donante' })
  @IsNumber() // Corregido: antes era IsDecimal
  lng!: number;

  @ApiProperty({ example: 'Password123!', description: 'Contraseña del donante' })
  @IsString()
  @MinLength(6)
  password!: string;
}