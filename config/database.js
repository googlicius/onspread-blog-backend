module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    // default: {
    //   connector: 'bookshelf',
    //   settings: {
    //     client: 'mysql',
    //     host: env('DATABASE_HOST', '127.0.0.1'),
    //     port: env.int('DATABASE_PORT', 3306),
    //     database: env('DATABASE_NAME', 'onspread-blog-2'),
    //     username: env('DATABASE_USERNAME', 'onspread'),
    //     password: env('DATABASE_PASSWORD', '1234abcd'),
    //     ssl: env.bool('DATABASE_SSL', false),
    //   },
    //   options: {}
    // },
    default: {
      connector: 'mongoose',
      settings: {
        host: env('DATABASE_HOST', 'mongo'),
        srv: env.bool('DATABASE_SRV', false),
        port: env.int('DATABASE_PORT', 27017),
        database: env('DATABASE_NAME', 'onpsread-blog'),
        username: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
      },
      options: {
        authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
        ssl: env.bool('DATABASE_SSL', false),
      },
    },
  },
});
