import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ProjectItem {
  @PrimaryColumn('integer')
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  context: string;

  @Column('integer')
  pid: number;

  @Column('integer')
  pcid: number;

}
