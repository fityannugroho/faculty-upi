import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudiesService } from 'src/studies/studies.service';
import { FacultiesService } from './faculties.service';
import { Faculty } from './schemas/faculty.schema';

@ApiTags('Faculties')
@Controller('faculties')
export class FacultiesController {
  constructor(
    private facultiesService: FacultiesService,
    private studiesService: StudiesService,
  ) {}

  @Get()
  async getFaculties(): Promise<Faculty[]> {
    return this.facultiesService.findAll();
  }

  /**
   * Get a faculty by its code.
   * @param code The faculty code.
   * @returns The suitable faculty.
   */
  @Get(':facultyCode')
  async getFacultyByCode(@Param('facultyCode') code: string): Promise<Faculty> {
    const suitableFaculty = await this.facultiesService.findByCode(code);

    // Result validation.
    if (suitableFaculty === null) {
      throw new HttpException(
        `No faculty found with the same code as '${code}'`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.facultiesService.findByCode(code);
  }

  /**
   * Get all study programs by faculty code.
   * @param code The faculty code.
   * @returns The suitable study programs.
   */
  @Get(':facultyCode/studies')
  async getStudiesByFaculty(@Param('facultyCode') code: string) {
    // Validate the faculty code.
    if (!(await this.facultiesService.isCodeExists(code))) {
      throw new HttpException(
        `No faculty found with the same code as '${code}'`,
        HttpStatus.NOT_FOUND,
      );
    }

    // Get all study programs with the validated faculty code.
    return this.studiesService.findByFaculty(code);
  }

  /**
   * Get all faculties with a suitable name.
   * @param name The name of the faculty to be searched.
   * @returns All faculties with matching names.
   */
  @Get('name/:facultyName')
  async getFacultiesByName(
    @Param('facultyName') name: string,
  ): Promise<Faculty[]> {
    return this.facultiesService.findByName(name);
  }

  /**
   * Find all faculties with its abbreviation.
   * @param abbr The faculty abbreviation.
   * @returns All faculties with matching abbreviation.
   */
  @Get('abbr/:facultyAbbr')
  async getFacultiesByAbbr(
    @Param('facultyAbbr') abbr: string,
  ): Promise<Faculty[]> {
    return this.facultiesService.findByAbbr(abbr);
  }
}
