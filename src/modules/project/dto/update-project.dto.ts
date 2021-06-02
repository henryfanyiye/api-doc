import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {

  @IsOptional()
  @IsString()
  project_name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsBoolean()
  is_private: boolean;

  @IsOptional()
  @IsBoolean()
  is_delete: boolean;

  @IsOptional()
  @IsBoolean()
  creator: boolean;

  @IsOptional()
  @IsString()
  password: string;
}
