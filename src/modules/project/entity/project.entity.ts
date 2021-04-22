import { Column, Entity, PrimaryColumn } from 'typeorm';
import { NumToBoolTransformer } from '../../../lib/numToBool.transformer';

@Entity()
export class Project {
  @PrimaryColumn('integer')
  project_id: number;

  @Column('text')
  project_name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  password: string;

  @Column({ type: 'blob', transformer: new NumToBoolTransformer(), comment: '0 | 1' })
  is_private: boolean;

  @Column({ type: 'blob', transformer: new NumToBoolTransformer(), comment: '0 | 1' })
  is_delete: boolean;
}
