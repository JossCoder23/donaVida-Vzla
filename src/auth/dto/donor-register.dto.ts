import { IsEmail, IsString, IsDecimal, IsNotEmpty } from 'class-validator';

export class DonorRegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  full_name!: string;

  @IsString()
  @IsNotEmpty()
  blood_type!: string; 

  @IsDecimal()
  lat!: number;

  @IsDecimal()
  lng!: number;

  @IsString()
  password!: string;
}