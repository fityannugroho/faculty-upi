import { IsNotEmpty, Length, IsString, IsAlphanumeric } from 'class-validator';

export class StudyCodeParam {
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(4, 4)
  code: string;
}

export class GetByCodeParams extends StudyCodeParam {}

export class GetByNameParams {
  @IsNotEmpty()
  @IsString()
  @Length(3)
  name: string;
}
