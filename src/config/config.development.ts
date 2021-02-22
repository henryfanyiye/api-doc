import { Postman } from '../modules/postman/entity/postman.entity';
import { User } from '../modules/user/entity/user.entity';

export default () => ({
  // mongodb
  mongodb: {
    type: 'mongodb',
    host: 'localhost',
    database: 'api-doc',
    synchronize: true,
    // entities: [__dirname + '/../modules/**/entity/*.entity{.ts,.js}'],
    entities: [Postman],
    useUnifiedTopology: true,
  },
  sqlite: {
    type: 'sqlite',
    entities: [User],
    database: __dirname + '/../../sqlite/api-doc.db',
  },
  jwt: {
    secret: 'secretKey',
    signOptions: {
      expiresIn: 3600,
    },
  },
})
