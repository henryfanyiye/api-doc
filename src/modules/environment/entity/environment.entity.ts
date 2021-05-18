import { Column, Entity, PrimaryColumn } from 'typeorm';
import { NumToBoolTransformer } from '../../../lib/numToBool.transformer';

@Entity()
export class Environment {
  @PrimaryColumn('integer')
  id: number;

  @Column('text')
  env_name: string;

  @Column('text', { nullable: true })
  env_value: string;

  @Column({ type: 'blob', transformer: new NumToBoolTransformer(), comment: '0 | 1' })
  is_delete: boolean;
}
