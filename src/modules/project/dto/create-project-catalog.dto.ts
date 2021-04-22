import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProjectCatalogDto {

  @IsString()
  catalog_name: string;

  @IsOptional()
  @IsInt()
  parentId: number = 0;

  @IsOptional()
  @IsInt()
  level: number = 1;

  @IsInt()
  project_id: number;

  @IsOptional()
  @IsBoolean()
  is_delete: boolean = false;
}
