import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FacultyMiddleware } from 'src/common/middlewares/faculty.middleware';
import { StudyModule } from 'src/studies/study.module';
import { FacultyController } from './faculty.controller';
import { FacultyService } from './faculty.service';
import { Faculty, FacultySchema } from './faculty.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Faculty.name, schema: FacultySchema }]),
    StudyModule,
  ],
  controllers: [FacultyController],
  providers: [FacultyService],
})
export class FacultyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Faculty code validation
    consumer.apply(FacultyMiddleware).forRoutes({
      path: 'faculties/:facultyCode',
      method: RequestMethod.GET,
    });
  }
}
