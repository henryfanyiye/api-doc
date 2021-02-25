export default () => ({
  sqlite: {
    type: 'sqlite',
    entities: [__dirname + '/../modules/**/entity/*.entity{.ts,.js}'],
    database: __dirname + '/../../sqlite/api-doc.db',
    timezone: '+08:00', // 东八区
    synchronize: true, // 定义数据库表结构与实体类字段同步
  },
  jwt: {
    secret: 'secretKey',
    signOptions: {
      expiresIn: 3600,
    },
  },
})
