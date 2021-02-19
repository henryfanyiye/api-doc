import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Postman {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  dir: string[];

  @Column()
  name: string;

  @Column()
  method: string;

  @Column()
  api: string;

  @Column()
  header: any;

  @Column()
  path: any;

  @Column()
  query: any;

  @Column()
  body: any;
}
