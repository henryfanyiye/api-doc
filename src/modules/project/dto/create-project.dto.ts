import { IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {

  @IsString()
  project_name: string;

  @IsOptional()
  @IsString()
  description: string;
}
