export default () => ({
  hostname: 'beimoting.fun',
  port: 3000,
  sqlite: {
    type: 'sqlite',
    entities: [__dirname + '/../modules/**/entity/*.entity{.ts,.js}'],
    database: __dirname + '/../../sqlite/api-doc.db',
    timezone: '+08:00', // 东八区
    synchronize: true, // 定义数据库表结构与实体类字段同步
  },
  ioredis: {
    config: {
      host: process.env.REDIS_HOST || 'beimoting.fun',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PWD || 'Fyy@0423',
    },
  },
  auth: {
    tokenKey: 'token:member:',
    expiresIn: 24 * 3600,
  },
})
