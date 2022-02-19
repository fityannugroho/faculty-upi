import { Module } from '@nestjs/common';
import { StudiesService } from './studies.service';
import { StudyController } from './study.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Study, StudySchema } from './schemas/study.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Study.name, schema: StudySchema }]),
  ],
  providers: [StudiesService],
  controllers: [StudyController],
  exports: [StudiesService],
})
export class StudiesModule {}
