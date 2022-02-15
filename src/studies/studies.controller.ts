import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Study } from './schemas/study.schema';
import { StudiesService } from './studies.service';

@ApiTags('Studies')
@Controller('studies')
export class StudiesController {
  constructor(private studiesService: StudiesService) {}

  /**
   * Get all study programs.
   * @returns All study programs.
   */
  @Get()
  async getAll(): Promise<Study[]> {
    return this.studiesService.findAll();
  }

  /**
   * Get a study program by its code.
   * @param code The study program code.
   * @returns The suitable study program.
   */
  @Get(':studyCode')
  async getByCode(@Param('studyCode') code: string) {
    const suitableStudy = await this.studiesService.findByCode(code);

    // Result validation.
    if (suitableStudy === null) {
      throw new HttpException(
        `No study program found with the same code as '${code}'`,
        HttpStatus.NOT_FOUND,
      );
    }

    return suitableStudy;
  }

  /**
   * Get all study programs by its name.
   * @param studyName The name of study program.
   * @returns All study programs with matching names.
   */
  @Get('name/:studyName')
  async getByName(@Param('studyName') studyName: string): Promise<Study[]> {
    return this.studiesService.findByName(studyName);
  }
}
