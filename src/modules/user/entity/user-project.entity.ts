import { Column, Entity, PrimaryColumn } from 'typeorm';
import { NumToBoolTransformer } from '../../../lib/numToBool.transformer';

@Entity()
export class UserProject {
  @PrimaryColumn('integer')
  upid: number;

  @PrimaryColumn('text', { unique: true })
  member_id: string;

  @Column('integer')
  pid: number;

  @Column({ type: 'blob', transformer: new NumToBoolTransformer() })
  creator: boolean;
}
