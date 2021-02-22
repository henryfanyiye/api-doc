import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  uid: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  nick_name: string;

  @Column()
  email: string;

  @Column('date')
  create_time: string;

  @Column('date')
  update_time: string;

  @Column('date')
  last_login_time: string;
}
