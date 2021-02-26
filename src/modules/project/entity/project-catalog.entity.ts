import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ProjectItem } from './project-item.entity';

@Entity('project_catalog')
export class ProjectCatalog {
  @PrimaryColumn()
  pcid: number;

  @Column()
  catalog_name: string;

  @Column({ nullable: true })
  parentId: number;

  @Column()
  pid: number;
}
