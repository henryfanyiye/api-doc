import { Column, Entity, PrimaryColumn } from 'typeorm';
import { NumToBoolTransformer } from '../../../lib/numToBool.transformer';

@Entity()
export class Project {
  @PrimaryColumn('integer')
  pid: number;

  @Column('text')
  project_name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  password: string;
}
