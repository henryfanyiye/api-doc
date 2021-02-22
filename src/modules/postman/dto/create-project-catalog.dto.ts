import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProjectCatalogDto {

  @IsString()
  catalog_name: string;

  @IsOptional()
  @IsInt()
  parentId: number;

  @IsInt()
  pid: number;
}
