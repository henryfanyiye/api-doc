import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('project_item')
export class ProjectItem {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  context: string;

  @Column()
  pid: number;

  @Column()
  pcid: number;

}
