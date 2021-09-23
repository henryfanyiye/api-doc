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
  is_delete: boolean = false;

  @IsOptional()
  @IsBoolean()
  creator: boolean = true;
}
