import { Column, Entity, PrimaryColumn } from 'typeorm';
import { NumToBoolTransformer } from '../../../lib/numToBool.transformer';

@Entity()
export class UserEnvironment {
  @PrimaryColumn('integer')
  id: number;

  @Column('text')
  member_id: string;

  @Column('integer')
  env_id: number;

  @Column({ type: 'blob', transformer: new NumToBoolTransformer(), comment: '0 | 1' })
  is_delete: boolean;
}
