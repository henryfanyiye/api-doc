import { Column, Entity, PrimaryColumn } from 'typeorm';
import { NumToBoolTransformer } from '../../../lib/numToBool.transformer';

@Entity()
export class UserProject {
  @PrimaryColumn('integer')
  id: number;

  @Column('text')
  member_id: string;

  @Column('integer')
  project_id: number;

  @Column({ type: 'blob', transformer: new NumToBoolTransformer() })
  creator: boolean;
}
