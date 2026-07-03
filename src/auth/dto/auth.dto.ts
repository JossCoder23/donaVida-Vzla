import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'usuario@email.com', description: 'Correo electrónico único' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Password123!', description: 'Contraseña segura (mínimo 6 caracteres)' })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 'Carlos Mendoza', description: 'Nombre completo' })
  @IsString()
  full_name!: string;

  @ApiProperty({ example: 'O-', description: 'Tipo de sangre' })
  @IsString()
  blood_type!: string;
}

export class LoginDto {
  @ApiProperty({ example: 'usuario@email.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  password!: string;
}