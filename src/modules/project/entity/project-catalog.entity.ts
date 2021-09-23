import { Column, Entity, PrimaryColumn } from 'typeorm';
import { NumToBoolTransformer } from '../../../lib/numToBool.transformer';

@Entity()
export class ProjectCatalog {
  @PrimaryColumn('integer')
  catalog_id: number;

  @Column('text')
  catalog_name: string;

  @Column('integer', { nullable: true })
  parentId: number;

  @Column('integer')
  level: number;

  @Column('integer')
  project_id: number;

  @Column('integer')
  sortNum: number;

  @Column({ type: 'blob', transformer: new NumToBoolTransformer(), comment: '0 | 1' })
  is_delete: boolean;
}
