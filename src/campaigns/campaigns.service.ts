import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateCampaignDto) {
    return this.prisma.campaign.create({ data: dto });
  }

  findAll() {
    return this.prisma.campaign.findMany({ include: { center: true } });
  }

  findOne(id: string) { // Cambiado de number a string
    return this.prisma.campaign.findUnique({ where: { id } });
  }

  remove(id: string) { // Cambiado de number a string
    return this.prisma.campaign.delete({ where: { id } });
  }
}