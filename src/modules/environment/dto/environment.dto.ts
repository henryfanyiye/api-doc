import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

class ValueDto {
  @IsString()
  key: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  value: string;
}

export class EnvironmentDto {
  @IsOptional()
  @IsString()
  id: number;

  @IsOptional()
  @IsString()
  env_name: string;

  @IsOptional()
  @IsArray()
  env_value: ValueDto[];

  @IsOptional()
  @IsBoolean()
  is_delete: boolean = false;
}
