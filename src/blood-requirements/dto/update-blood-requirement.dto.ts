import { PartialType } from '@nestjs/mapped-types';
import { CreateBloodRequirementDto } from './create-blood-requirement.dto';

export class UpdateBloodRequirementDto extends PartialType(CreateBloodRequirementDto) {}
