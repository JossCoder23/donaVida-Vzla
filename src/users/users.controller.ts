import { Controller, Body, Post, UseGuards, ForbiddenException, Request } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RegisterDto } from "@/auth/dto/auth.dto";
import { PrismaService } from "@/prisma/prisma.service";

@Controller('users')
export class UserController {

    constructor(
        readonly prisma:PrismaService
    ){}
    
    @UseGuards(JwtAuthGuard)
    @Post('staff')
    async createStaff(@Body() dto: RegisterDto, @Request() req: any) {
        // req.user viene de la validación del JWT (gracias a JwtStrategy)
        if (req.user.role !== 'ADMIN') {
            throw new ForbiddenException('No tienes permisos para crear Staff');
        }
        
        return this.prisma.user.create({
            data: { ...dto, role: 'STAFF' },
        });
    }

}

