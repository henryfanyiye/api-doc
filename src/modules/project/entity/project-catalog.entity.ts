import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ProjectItem } from './project-item.entity';

@Entity()
export class ProjectCatalog {
  @PrimaryColumn('integer')
  pcid: number;

  @Column('text')
  catalog_name: string;

  @Column('integer')
  parentId: number;

  @Column('integer')
  pid: number;
}
