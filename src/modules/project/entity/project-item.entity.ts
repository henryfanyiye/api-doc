import { Column, Entity, PrimaryColumn } from 'typeorm';
import { NumToBoolTransformer } from '../../../lib/numToBool.transformer';

@Entity()
export class ProjectItem {
  @PrimaryColumn('integer')
  item_id: number;

  @Column('text')
  title: string;

  @Column('text')
  url: string;

  @Column('text')
  method: string;

  @Column('text', { nullable: true })
  header: string;

  @Column('text', { nullable: true })
  path: string;

  @Column('text', { nullable: true })
  query: string;

  @Column('text', { nullable: true })
  body_type: string;

  @Column('text', { nullable: true })
  body: string;

  @Column('integer')
  project_id: number;

  @Column('integer')
  catalog_id: number;

  @Column({ type: 'blob', transformer: new NumToBoolTransformer(), comment: '0 | 1' })
  is_delete: boolean;

}
