var config = require('../config/config.js'),
  knexBuilder = require('knex'),
  knexSchema = require('knex-schema'),
  databaseName = 'test';

var tasks = {
  tableName: 'tasks',
  build: function(table) {
    table.increments('id').primary();
    table.string('description');
  },
  populate: function(database) {
    return knex('tasks').insert([{
      description: 'First task'
    }, {
      description: 'Second task'
    }, {
      description: 'Third task'
    }]);
  }
};

var createTables = function() {
  config.connection.database = databaseName
  knex = knexBuilder(config); // now we connect to the newly created DB
  var Manager = knexSchema
  var manager = new Manager(knex);
  //create/update tables

  return manager.sync([tasks])
    .then(_ => console.log('db: created tasks table'))
    .then(_ => manager.populate([tasks]))
    .then(_ => console.log('Populated tasks table'))
};
// manager.reset([articles]); // Remove all data from articles.
// manager.drop([articles]); // Drop table articles.

var knex = knexBuilder(config);


function dropDatabase() {
  console.log('db: dropping database..');
  var dropCommand = 'DROP DATABASE IF EXISTS ' + databaseName;
  return knex.raw(dropCommand);
}

function createDatabase() {
  console.log('db: creating database..');
  return knex.raw('CREATE DATABASE ' + databaseName);
}

function destroyConnection() {
  console.log('db: destroying connection..');
  return knex.destroy(); // promise? da.. If you ever need to explicitly teardown the connection pool, you may use knex.destroy([callback]). You may use knex.destroy by passing a callback, or by chaining as a promise, just not both.
}

function reinitialize() {
  console.log('db: reinitializing..');
  return dropDatabase()
    .then(createDatabase)
    .then(destroyConnection)
    .then(createTables)
    .then(_ => console.log('db: rebuildDB... done'))
    .then(_ => knex);
}


exports.seed = function(knex, Promise) {
    return reinitialize()
  // return Promise.join(
  //   // Deletes ALL existing entries
  //   knex('table_name').del(),
  //
  //   // Inserts seed entries
  //   knex('table_name').insert({id: 1, colName: 'rowValue'}),
  //   knex('table_name').insert({id: 2, colName: 'rowValue2'}),
  //   knex('table_name').insert({id: 3, colName: 'rowValue3'}),
  // );
};
