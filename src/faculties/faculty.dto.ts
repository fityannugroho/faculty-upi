import { IsAlpha, IsNotEmpty, IsString, Length } from 'class-validator';

export class FacultyCodeParam {
  @IsNotEmpty()
  @IsAlpha()
  @Length(1, 1)
  code: string;
}

export class FindByCodeParams extends FacultyCodeParam {}

export class FindStudiesParams extends FacultyCodeParam {}

export class FindByNameParams {
  @IsNotEmpty()
  @IsString()
  @Length(3)
  name: string;
}

export class FindByAbbrParams {
  @IsNotEmpty()
  @IsString()
  @Length(3)
  abbr: string;
}
