import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FacultyModule } from 'src/faculties/faculty.module';
import { StudiesModule } from 'src/studies/studies.module';

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
    StudiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
