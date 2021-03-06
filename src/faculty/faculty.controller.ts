import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Study } from 'src/study/study.schema';
import { StudyService } from 'src/study/study.service';
import { FacultyService } from './faculty.service';
import {
  FindByCodeParams,
  FindByAbbrParams,
  FindByNameParams,
  FindStudiesParams,
} from './faculty.dto';
import { Faculty } from './faculty.schema';

@ApiTags('Faculty')
@Controller('faculties')
export class FacultyController {
  constructor(
    private readonly facultyService: FacultyService,
    private readonly studiesService: StudyService,
  ) {}

  @ApiOperation({ description: 'Get all faculties.' })
  @ApiOkResponse({ description: 'Returns an array of faculties.' })
  @Get()
  async findAll(): Promise<Faculty[]> {
    return this.facultyService.findAll();
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
  async findByCode(@Param() params: FindByCodeParams): Promise<Faculty> {
    const { code } = params;
    const faculty = await this.facultyService.findByCode(code);

    // Result validation.
    if (faculty === null)
      throw new NotFoundException(`No faculty found with code '${code}'`);

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
  async findStudies(@Param() params: FindStudiesParams): Promise<Study[]> {
    const { code } = params;

    // Validate the faculty code.
    if ((await this.facultyService.findByCode(code)) === null)
      throw new NotFoundException(`No faculty found with code '${code}'`);

    // Get all study programs with the validated faculty code.
    return this.studiesService.findByFaculty(code);
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
  async findByName(@Param() params: FindByNameParams): Promise<Faculty[]> {
    const { name } = params;
    return this.facultyService.findByName(name);
  }

  @ApiOperation({ description: 'Find faculties by its abbreviation.' })
  @ApiOkResponse({ description: 'Returns an array of faculty.' })
  @ApiBadRequestResponse({ description: 'When the abbreviation is invalid.' })
  @ApiParam({
    name: 'abbr',
    type: 'string',
    description: 'The faculty abbreviation.',
    example: 'kamda',
  })
  @Get('abbr/:abbr')
  async FindByAbbr(@Param() params: FindByAbbrParams): Promise<Faculty[]> {
    const { abbr } = params;
    return this.facultyService.findByAbbr(abbr);
  }
}
