import { Module } from '@nestjs/common';
import { BloodRequirementsService } from './blood-requirements.service';
import { BloodRequirementsController } from './blood-requirements.controller';

@Module({
  controllers: [BloodRequirementsController],
  providers: [BloodRequirementsService],
})
export class BloodRequirementsModule {}
