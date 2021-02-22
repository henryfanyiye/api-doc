import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ProjectCatalog {
  @PrimaryColumn()
  pcid: number;

  @Column()
  catalog_name: string;

  @Column()
  parentId: number;

  @Column()
  pid: number;

}
