import { Module } from '@nestjs/common';
import { StudiesService } from './studies.service';
import { StudiesController } from './studies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Study, StudySchema } from './schemas/study.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Study.name, schema: StudySchema }]),
  ],
  providers: [StudiesService],
  controllers: [StudiesController],
  exports: [StudiesService],
})
export class StudiesModule {}
