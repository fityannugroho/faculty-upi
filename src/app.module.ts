import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FacultyModule } from 'src/faculty/faculty.module';
import { StudyModule } from 'src/studies/study.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // Connect to MongoDB.
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_CONNECT_URI,
      }),
    }),
    FacultyModule,
    StudyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
