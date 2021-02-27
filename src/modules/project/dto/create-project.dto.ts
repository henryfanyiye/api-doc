import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {

  @IsString()
  project_name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsBoolean()
  creator: boolean;

  @IsBoolean()
  is_private: boolean;
}
