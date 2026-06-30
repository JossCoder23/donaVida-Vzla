import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BloodRequirementsService } from './blood-requirements.service';
import { CreateBloodRequirementDto } from './dto/create-blood-requirement.dto';
import { UpdateBloodRequirementDto } from './dto/update-blood-requirement.dto';

@Controller('blood-requirements')
export class BloodRequirementsController {
  constructor(private readonly bloodRequirementsService: BloodRequirementsService) {}

  @Post()
  create(@Body() createBloodRequirementDto: CreateBloodRequirementDto) {
    return this.bloodRequirementsService.create(createBloodRequirementDto);
  }

  @Get()
  findAll() {
    return this.bloodRequirementsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloodRequirementsService.remove(id);
  }
}
