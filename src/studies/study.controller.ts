import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Study } from './schemas/study.schema';
import { StudyService } from './study.service';
import { FindByCodeParams, FindByNameParams } from './study.dto';

@ApiTags('Study')
@Controller('studies')
export class StudyController {
  constructor(private studyService: StudyService) {}

  @ApiOperation({ description: 'Get all study programs.' })
  @ApiOkResponse({ description: 'Returns an array of study program.' })
  @Get()
  async findAll(): Promise<Study[]> {
    return this.studyService.findAll();
  }

  @ApiOperation({ description: 'Get a study program.' })
  @ApiOkResponse({ description: 'Returns a study program.' })
  @ApiBadRequestResponse({ description: 'When the code is invalid.' })
  @ApiNotFoundResponse({ description: 'When no study program match the code.' })
  @ApiParam({
    name: 'code',
    type: 'string',
    description: 'The study program code.',
    example: 'G505',
  })
  @Get(':code')
  async findByCode(@Param() params: FindByCodeParams) {
    const { code } = params;
    const study = await this.studyService.findByCode(code);

    // Result validation.
    if (study === null)
      throw new NotFoundException(`No study program found with code '${code}'`);

    return study;
  }

  @ApiOperation({ description: 'Find study programs by its name.' })
  @ApiOkResponse({ description: 'Returns an array of study program.' })
  @ApiBadRequestResponse({ description: 'When the name is invalid.' })
  @ApiParam({
    name: 'name',
    type: 'string',
    description: 'The study program name.',
    example: 'pendidikan',
  })
  @Get('name/:name')
  async findByName(@Param() params: FindByNameParams): Promise<Study[]> {
    const { name } = params;
    return this.studyService.findByName(name);
  }
}
