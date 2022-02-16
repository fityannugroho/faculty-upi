import { IsAlpha, IsNotEmpty, IsString, Length } from 'class-validator';

export class FacultyCodeParam {
  @IsNotEmpty()
  @IsAlpha()
  @Length(1, 1)
  code: string;
}

export class GetFacultyByCodeParams extends FacultyCodeParam {}

export class GetStudiesByFacultyParams extends FacultyCodeParam {}

export class GetFacultiesByNameParams {
  @IsNotEmpty()
  @IsString()
  @Length(3)
  name: string;
}

export class GetFacultiesByAbbrParams {
  @IsNotEmpty()
  @IsString()
  @Length(3)
  abbr: string;
}
