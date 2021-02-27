import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryColumn('integer')
  pid: number;

  @Column('text')
  project_name: string;

  @Column('text', { nullable: true })
  description: string;
}
