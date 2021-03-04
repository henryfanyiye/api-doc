import { Column, Entity, PrimaryColumn } from 'typeorm';
import { NumToBoolTransformer } from '../../../lib/numToBool.transformer';

@Entity()
export class User {
  @PrimaryColumn('integer')
  uid: number;

  @Column('text', { unique: true })
  username: string;

  @Column('text')
  password: string;

  @Column('text', { nullable: true })
  nick_name: string;

  @Column('text', { unique: true })
  email: string;

  @Column({ nullable: true, type: 'blob', transformer: new NumToBoolTransformer() })
  admin: boolean;

  @Column('text')
  create_time: string;

  @Column('text')
  update_time: string;

  @Column('text', { nullable: true })
  last_login_time: string;
}
