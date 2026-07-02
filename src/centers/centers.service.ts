import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCenterDto } from './dto/create-center.dto'; // Asegúrate de tener esta ruta correcta

@Injectable()
export class CentersService {
  constructor(private prisma: PrismaService) {}

  // ==========================================
  // HELPER PRIVADO: Mapeo del Contrato Frontend
  // ==========================================
  private mapToFrontendContract(center: any) {
    const activeCampaign = center.campaigns?.find((c:any) => c.is_active);
    const urgentRequirement = center.requirements?.[0]; 

    return {
      id: center.id,
      estado: center.state || "Distrito Capital",
      ciudad: center.city || "Caracas",
      hospital: center.name,
      direccion: center.address,
      telefono: center.phone || null,
      horario: center.hours || "Consultar directamente",
      campana: activeCampaign ? activeCampaign.title : null,
      tipoSangre: urgentRequirement ? urgentRequirement.blood_type : "No especificado",
      fuente: center.source || center.name,
      url: center.url || null,
      lat: center.lat, 
      lng: center.lng,
      fechaActualizacion: center.updated_at.toISOString().split('T')[0],
      estadoRegistro: center.is_verified ? "Verificado" : "Pendiente",
    };
  }

  // ==========================================
  // MÉTODOS PÚBLICOS
  // ==========================================
  async findAll() {
    const centers = await this.prisma.donationCenter.findMany({
      where: { is_active: true }, // Asumo que agregaste is_active al schema de Prisma
      include: { 
        campaigns: true,
        requirements: true 
      }
    });

    // Usamos el helper para mantener el código limpio
    return centers.map((center) => this.mapToFrontendContract(center));
  }

  async findNearby(lat: number, lng: number) {
    const centers = await this.prisma.donationCenter.findMany({
      where: { is_active: true },
      // OJO: También necesitas incluir campaigns aquí para que el helper funcione bien
      include: { 
        campaigns: true, 
        requirements: true 
      } 
    });

    // Ordenamiento por distancia euclidiana
    const sortedCenters = centers.sort((a, b) => {
      const distA = Math.sqrt(Math.pow(Number(a.lat) - lat, 2) + Math.pow(Number(a.lng) - lng, 2));
      const distB = Math.sqrt(Math.pow(Number(b.lat) - lat, 2) + Math.pow(Number(b.lng) - lng, 2));
      return distA - distB;
    });

    // Retornamos la data MAPEADA al frontend
    return sortedCenters.map((center) => this.mapToFrontendContract(center));
  }

  // ==========================================
  // MÉTODOS PRIVADOS / ADMINISTRATIVOS
  // ==========================================
  
  // Reemplazamos "any" por tu DTO validado
  async create(data: CreateCenterDto) {
    return this.prisma.donationCenter.create({ 
      data: {
        ...data,
        capacity_per_day: data.capacity_per_day ?? 50 
      } 
    });
  }

  async update(id: string, data: any) {
    return this.prisma.donationCenter.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.donationCenter.update({
      where: { id },
      data: { is_active: false },
    });
  }
}