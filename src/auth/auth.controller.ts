import { Controller, Post, Body, UseGuards, Request, Patch, Param, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { DonorRegisterDto } from './dto/donor-register.dto';
import { JwtAuthGuard } from './jwt-auth.guard'; // Asegúrate de que la ruta sea correcta
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Autenticación y Usuarios')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ==========================================
  // RUTAS PÚBLICAS
  // ==========================================
  @ApiOperation({ summary: 'Login de usuario/staff' })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  // ==========================================
  // RUTAS PRIVADAS (Requieren Token JWT)
  // ==========================================
  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Registrar personal (Solo ADMIN)' })
  @UseGuards(JwtAuthGuard)
  @Post('register-staff')
  registerStaff(@Body() dto: RegisterDto, @Request() req: any) {
    // Verificación estricta de ADMIN
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('No tienes permisos para registrar personal de Staff');
    }
    return this.authService.registerStaff(dto);
  }

  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Cambiar la contraseña solo STAFF y ADMIN' })
  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  changePassword(@Body() body: any, @Request() req: any) {
    // Idealmente crea un ChangePasswordDto con { newPassword: string }
    if (!body.newPassword) {
      throw new ForbiddenException('Debes enviar la nueva contraseña');
    }
    // req.user.userId viene del payload que configuramos en jwt.strategy.ts
    return this.authService.changePassword(req.user.userId, body.newPassword);
  }

  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Dar de baja o eliminar el acceso a uno del staff' })
  @UseGuards(JwtAuthGuard)
  @Patch('staff/:id/deactivate')
  deactivateStaff(@Param('id') id: string, @Request() req: any) {
    // Verificación estricta de ADMIN
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('No tienes permisos para dar de baja a un usuario');
    }
    return this.authService.deactivateUser(id);
  }
}