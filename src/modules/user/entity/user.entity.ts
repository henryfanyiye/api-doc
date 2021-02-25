import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  nick_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  create_time: Date;

  @Column()
  update_time: Date;

  @Column({ nullable: true })
  last_login_time: Date;
}
