import { IsNotEmpty, Length, IsString, IsAlphanumeric } from 'class-validator';

export class StudyCodeParam {
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(4, 4)
  code: string;
}

export class FindByCodeParams extends StudyCodeParam {}

export class FindByNameParams {
  @IsNotEmpty()
  @IsString()
  @Length(3)
  name: string;
}
