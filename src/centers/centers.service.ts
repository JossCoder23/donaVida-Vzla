import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CentersService {
  constructor(private prisma: PrismaService) {}

  // PÚBLICO: Solo trae los activos
  async findAll() {
    return this.prisma.donationCenter.findMany({
      where: { is_active: true },
      include: { requirements: true }
    });
  }

  async findNearby(lat: number, lng: number) {
    const centers = await this.prisma.donationCenter.findMany({
      where: { is_active: true },
      include: { requirements: true }
    });

    // La lógica de ordenamiento por cercanía vive aquí, en el servicio
    return centers.sort((a, b) => {
      const distA = Math.sqrt(Math.pow(Number(a.lat) - lat, 2) + Math.pow(Number(a.lng) - lng, 2));
      const distB = Math.sqrt(Math.pow(Number(b.lat) - lat, 2) + Math.pow(Number(b.lng) - lng, 2));
      return distA - distB;
    });
  }

  // PRIVADO: Crear
  async create(data: any) {
    return this.prisma.donationCenter.create({ data });
  }

  // PRIVADO: Actualizar
  async update(id: string, data: any) {
    return this.prisma.donationCenter.update({
      where: { id },
      data,
    });
  }

  // PRIVADO: Borrado Lógico (Soft Delete)
  async remove(id: string) {
    return this.prisma.donationCenter.update({
      where: { id },
      data: { is_active: false },
    });
  }
}