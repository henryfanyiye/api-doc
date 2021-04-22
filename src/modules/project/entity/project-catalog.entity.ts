import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ProjectItem } from './project-item.entity';
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

  @Column({ type: 'blob', transformer: new NumToBoolTransformer(), comment: '0 | 1' })
  is_delete: boolean;
}
