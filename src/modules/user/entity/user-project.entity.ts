import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserProject {
  @PrimaryColumn()
  upid: number;

  @Column()
  uid: number;

  @Column()
  pid: number;
}
