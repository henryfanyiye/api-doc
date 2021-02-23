import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ProjectCatalog } from './project-catalog.entity';

@Entity('project')
export class Project {
  @PrimaryColumn()
  pid: number;

  @Column()
  project_name: string;

  @Column()
  description: string;
}
