import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProjectItemDto {
  @IsString()
  title: string;

  @IsString()
  url: string;

  @IsString()
  method: string;

  @IsOptional()
  @IsString()
  header: string;

  @IsOptional()
  @IsString()
  path: string;

  @IsOptional()
  @IsString()
  query: string;

  @IsOptional()
  @IsString()
  body_type: string;

  @IsOptional()
  @IsString()
  body: string;

  @IsInt()
  project_id: number;

  @IsInt()
  catalog_id: number;

  @IsOptional()
  @IsBoolean()
  is_delete: boolean = false;
}
