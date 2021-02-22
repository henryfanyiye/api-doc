import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  nick_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  create_time: Date;

  @Column()
  update_time: Date;

  @Column()
  last_login_time: Date;
}
