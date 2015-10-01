var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'TestDatabase'
    },
    port: 3000,
    db: 'postgres://localhost/TestDatabase-development',
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'dbaba',
      password: '',
      charset: 'utf8'
    }
  },

  test: {
    root: rootPath,
    app: {
      name: 'TestDatabase'
    },
    port: 3000,
    db: 'postgres://localhost/TestDatabase-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'TestDatabase'
    },
    port: 3000,
    db: 'postgres://localhost/TestDatabase-production'
  },

};

module.exports = config[env];
