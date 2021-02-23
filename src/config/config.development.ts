export default () => ({
  sqlite: {
    type: 'sqlite',
    entities: [__dirname + '/../modules/**/entity/*.entity{.ts,.js}'],
    database: __dirname + '/../../sqlite/api-doc.db',
  },
  jwt: {
    secret: 'secretKey',
    signOptions: {
      expiresIn: 3600,
    },
  },
})
