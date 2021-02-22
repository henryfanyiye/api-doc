import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryColumn()
  pid: number;

  @Column()
  project_name: string;

  @Column()
  description: string;

}
