import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {

  @IsOptional()
  @IsString()
  project_name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsBoolean()
  is_private: boolean = false;

  @IsOptional()
  @IsBoolean()
  is_delete: boolean = false;

  @IsOptional()
  @IsBoolean()
  creator: boolean = true;

  @IsOptional()
  @IsString()
  password: string;
}
