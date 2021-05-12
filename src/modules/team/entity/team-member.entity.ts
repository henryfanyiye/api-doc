import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TeamMember {
  @PrimaryColumn('integer')
  tmid: number;

  @Column('integer')
  tid: string;

  @Column('integer')
  uid: string;

  @Column('text')
  username: string;

  @Column('text')
  create_time: string;

  @Column('text')
  update_time: string;
}
