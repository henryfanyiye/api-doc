import { IsOptional, IsString, IsArray } from 'class-validator';
import { ObjAto } from './obj.ato';

export class CreateDto {

  @IsString()
  name: string;

  @IsString()
  method: string;

  @IsString()
  api: string;

  @IsOptional()
  @IsArray()
  header: ObjAto[];

  @IsOptional()
  @IsArray()
  path: ObjAto[];

  @IsOptional()
  @IsArray()
  query: ObjAto[];

  @IsOptional()
  @IsString()
  body: string;

  @IsOptional()
  @IsArray()
  dir: string[];
}
