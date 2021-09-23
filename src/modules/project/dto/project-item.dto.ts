import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class ProjectItemDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  url: string;

  @IsOptional()
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

  @IsOptional()
  @IsString()
  markdown: string;

  @IsOptional()
  @IsInt()
  project_id: number;

  @IsOptional()
  @IsInt()
  catalog_id: number;

  @IsOptional()
  @IsBoolean()
  is_delete: boolean = false;
}
