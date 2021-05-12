import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Team {
  @PrimaryColumn('integer')
  tid: number;

  @Column('text')
  team_name: string;

  @Column('integer')
  uid: string;

  @Column('text')
  username: string;

  @Column('text')
  create_time: string;

  @Column('text')
  update_time: string;
}
