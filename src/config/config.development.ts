export default () => ({
  // mongodb
  mongodb: {
    type: 'mongodb',
    host: 'localhost',
    database: 'api-doc',
    synchronize: true,
    entities: [__dirname + '/../modules/**/entity/*.entity{.ts,.js}'],
    useUnifiedTopology: true
  },
})
