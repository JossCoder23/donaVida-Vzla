import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AppointmentsService {

  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAppointmentDto) {
    // 1. Verificamos que el centro exista
    const center = await this.prisma.donationCenter.findUnique({ where: { id: dto.center_id } });
    if (!center) throw new NotFoundException('Centro de donación no encontrado');

    // 2. Creamos la cita (pública)
    return this.prisma.appointment.create({
      data: {
        donor_name: dto.donor_name,
        donor_email: dto.donor_email,
        donor_blood_type: dto.donor_blood_type,
        scheduled_at: new Date(dto.scheduled_at),
        center_id: dto.center_id,
        campaign_id: dto.campaign_id,
      },
    });
  }

  findAll() { 
    return this.prisma.appointment.findMany(); 
  }

}
