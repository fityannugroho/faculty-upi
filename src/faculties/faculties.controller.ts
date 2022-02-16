import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Study } from 'src/studies/schemas/study.schema';
import { StudiesService } from 'src/studies/studies.service';
import { FacultiesService } from './faculties.service';
import {
  GetFacultiesByAbbrParams,
  GetFacultiesByNameParams,
  GetFacultyByCodeParams,
  GetStudiesByFacultyParams,
} from './faculty.dto';
import { Faculty } from './schemas/faculty.schema';

@ApiTags('Faculties')
@Controller('faculties')
export class FacultiesController {
  constructor(
    private readonly facultiesService: FacultiesService,
    private readonly studiesService: StudiesService,
  ) {}

  @ApiOperation({ description: 'Get all faculties.' })
  @ApiOkResponse({ description: 'Returns an array of faculties.' })
  @Get()
  async getFaculties(): Promise<Faculty[]> {
    return this.facultiesService.findAll();
  }

  @ApiOperation({ description: 'Get a faculty.' })
  @ApiOkResponse({ description: 'Returns a faculty.' })
  @ApiBadRequestResponse({ description: 'When the code is invalid.' })
  @ApiNotFoundResponse({ description: 'When no faculties match the code.' })
  @ApiParam({
    name: 'code',
    type: 'string',
    description: 'The faculty code.',
    example: 'A',
  })
  @Get(':code')
  async getFacultyByCode(
    @Param() params: GetFacultyByCodeParams,
  ): Promise<Faculty> {
    const { code: facultyCode } = params;
    const faculty = await this.facultiesService.findByCode(facultyCode);

    // Result validation.
    if (faculty === null)
      throw new NotFoundException(
        `No faculty found with code '${facultyCode}'`,
      );

    return faculty;
  }

  @ApiOperation({ description: 'Get all study programs in a faculty.' })
  @ApiOkResponse({ description: 'Returns an array of study program.' })
  @ApiBadRequestResponse({ description: 'When the code is invalid.' })
  @ApiNotFoundResponse({ description: 'When no faculties match the code.' })
  @ApiParam({
    name: 'code',
    type: 'string',
    description: 'The faculty code.',
    example: 'A',
  })
  @Get(':code/studies')
  async getStudiesByFaculty(
    @Param() params: GetStudiesByFacultyParams,
  ): Promise<Study[]> {
    const { code: facultyCode } = params;

    // Validate the faculty code.
    if ((await this.facultiesService.findByCode(facultyCode)) === null)
      throw new NotFoundException(
        `No faculty found with code '${facultyCode}'`,
      );

    // Get all study programs with the validated faculty code.
    return this.studiesService.findByFaculty(facultyCode);
  }

  @ApiOperation({ description: 'Find faculties by its name.' })
  @ApiOkResponse({ description: 'Returns an array of faculty.' })
  @ApiBadRequestResponse({ description: 'When the name is invalid.' })
  @ApiParam({
    name: 'name',
    type: 'string',
    description: 'The faculty name.',
    example: 'kampus',
  })
  @Get('name/:name')
  async getFacultiesByName(
    @Param() params: GetFacultiesByNameParams,
  ): Promise<Faculty[]> {
    const { name } = params;
    return this.facultiesService.findByName(name);
  }

  @ApiOperation({ description: 'Find faculties by its abbreviation.' })
  @ApiOkResponse({ description: 'Returns an array of faculty.' })
  @ApiBadRequestResponse({ description: 'When the abbreviation is invalid.' })
  @ApiParam({
    name: 'abbr',
    type: 'string',
    description: 'The faculty abbreviation.',
    example: 'fpmipa',
  })
  @Get('abbr/:abbr')
  async getFacultiesByAbbr(
    @Param() params: GetFacultiesByAbbrParams,
  ): Promise<Faculty[]> {
    const { abbr } = params;
    return this.facultiesService.findByAbbr(abbr);
  }
}
