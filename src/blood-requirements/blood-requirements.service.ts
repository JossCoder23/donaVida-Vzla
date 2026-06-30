import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBloodRequirementDto } from './dto/create-blood-requirement.dto';

@Injectable()
export class BloodRequirementsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateBloodRequirementDto) {
    return this.prisma.bloodRequirement.create({ data: dto });
  }

  findAll() { 
    return this.prisma.bloodRequirement.findMany({ 
      include: { center: true } 
    }); 
  }
  
  remove(id: string) { 
    return this.prisma.bloodRequirement.delete({ 
      where: { id } 
    }); 
  }
}