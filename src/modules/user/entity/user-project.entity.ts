import { Column, Entity, PrimaryColumn } from 'typeorm';
import { NumToBoolTransformer } from '../../../lib/numToBool.transformer';

@Entity()
export class UserProject {
  @PrimaryColumn('integer')
  upid: number;

  @Column('integer')
  uid: number;

  @Column('integer')
  pid: number;

  @Column({ type: 'blob', transformer: new NumToBoolTransformer() })
  creator: boolean;

  @Column({ type: 'blob', transformer: new NumToBoolTransformer() })
  is_private: boolean;
}
