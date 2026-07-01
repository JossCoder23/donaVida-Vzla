import { Module } from '@nestjs/common';
import { BloodRequirementsService } from './blood-requirements.service';
import { BloodRequirementsController } from './blood-requirements.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BloodRequirementsController],
  providers: [BloodRequirementsService],
})
export class BloodRequirementsModule {}
