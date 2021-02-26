import { IsInt, IsString } from 'class-validator';

export class CreateProjectItemDto {
  @IsString()
  name: string;

  @IsString()
  context: string;

  @IsInt()
  pid: number;

  @IsInt()
  pcid: number;
}
