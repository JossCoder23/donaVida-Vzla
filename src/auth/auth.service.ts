import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DonorRegisterDto } from './dto/donor-register.dto';
import { RegisterDto } from './dto/auth.dto';
// Importa tus DTOs (asumiendo que crearás un ChangePasswordDto)

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  // 1. PÚBLICO: Registro de Donante (USER)
  async registerStaff(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: { 
        email: dto.email,
        full_name: dto.full_name,
        password: hashedPassword, 
        role: 'STAFF' // Por defecto, se crean como STAFF
      },
    });
  }

  async login(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    
    // Validamos: Existe, contraseña correcta, y cuenta activa
    if (!user || !(await bcrypt.compare(pass, user.password)) || !user.is_active) {
      throw new UnauthorizedException('Credenciales inválidas o cuenta desactivada');
    }
    
    const payload = { sub: user.id, email: user.email, role: user.role };
    return { access_token: this.jwt.sign(payload) };
  }

  // 3. PRIVADO: Cambiar Contraseña
  async changePassword(userId: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  // 4. PRIVADO (ADMIN): Dar de baja (Soft Delete)
  async deactivateUser(userId: string) {
    // Es vital usar borrado lógico (is_active: false) para no romper 
    // el historial de citas (Appointments) que este staff haya gestionado.
    return this.prisma.user.update({
      where: { id: userId },
      // Asegúrate de tener el campo is_active (Boolean) en tu modelo User
      data: { is_active: false }, 
    });
  }
}