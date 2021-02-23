import { IsInt, IsString } from 'class-validator';

export class CreateProjectItemDto {

  @IsString()
  context: string;

  @IsInt()
  pid: number;

  @IsInt()
  pcid: number;
}
