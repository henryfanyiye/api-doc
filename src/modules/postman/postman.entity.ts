import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Postman {
  @ObjectIdColumn()
  id: ObjectID;

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
