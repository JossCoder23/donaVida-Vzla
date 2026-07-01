import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CentersService {
  constructor(private prisma: PrismaService) {}

  // PÚBLICO: Solo trae los activos
  async findAll() {
    const centers = await this.prisma.donationCenter.findMany({
      where: { is_active: true },
      include: { 
        campaigns: true,
        requirements: true 
      }
    });

    return centers.map((center) => {
      // Obtenemos la campaña activa (si hay)
      const activeCampaign = center.campaigns.find(c => c.is_active);
      
      // Obtenemos el requerimiento más urgente (si hay)
      const urgentRequirement = center.requirements[0]; 

      return {
        id: center.id, // O si usan un ID específico como "DC-001", lo mapeas aquí
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
        // Formateamos la fecha a YYYY-MM-DD como lo piden
        lat: center.lat, 
        lng: center.lng,
        fechaActualizacion: center.updated_at.toISOString().split('T')[0],
        estadoRegistro: center.is_verified ? "Verificado" : "Pendiente",
      };
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