import { IsString, IsOptional } from 'class-validator';

export class ObjAto {

  @IsOptional()
  @IsString()
  key: string;

  @IsOptional()
  @IsString()
  value: string;

  @IsOptional()
  @IsString()
  type: string;
}
