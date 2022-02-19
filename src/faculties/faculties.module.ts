import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FacultiesMiddleware } from 'src/middleware/faculties.middleware';
import { StudiesModule } from 'src/studies/studies.module';
import { FacultyController } from './faculty.controller';
import { FacultyService } from './faculty.service';
import { Faculty, FacultySchema } from './schemas/faculty.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Faculty.name, schema: FacultySchema }]),
    StudiesModule,
  ],
  controllers: [FacultyController],
  providers: [FacultyService],
})
export class FacultiesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Faculty code validation
    consumer.apply(FacultiesMiddleware).forRoutes({
      path: 'faculties/:facultyCode',
      method: RequestMethod.GET,
    });
  }
}
