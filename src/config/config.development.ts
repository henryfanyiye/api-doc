export default () => ({
  // mongodb
  mongodb: {
    type: 'mongodb',
    host: 'localhost',
    database: 'api-doc',
    synchronize: true,
    entities: [__dirname + '/../modules/**/entity/*.entity{.ts,.js}'],
    useUnifiedTopology: true,
  },
  redis: {
    config: {
      url: 'redis://localhost:6379',
    },
  },
  jwt: {
    secret: 'secretKey',
    signOptions: {
      expiresIn: 3600,
    },
  },
})
