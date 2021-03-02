import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {

  @IsOptional()
  @IsString()
  project_name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  creator: boolean;

  @IsOptional()
  @IsBoolean()
  is_private: boolean;

  @IsOptional()
  @IsString()
  password: string;
}
