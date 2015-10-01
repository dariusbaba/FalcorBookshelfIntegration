var config = require('../config/config.js'),
  databaseName = 'test'

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
  //aici il facem din nou..o
  knex = require('knex')(config); // now we connect to the newly created DB
  var Manager = require('knex-schema');
  var manager = new Manager(knex);
  //create/update tables

  //aci era problema
  // din create tables nu returnezi promise
  //
  return manager.sync([tasks])
    .then(_ => console.log('db: created tasks table'))
    .then(_ => manager.populate([tasks]))
    .then(_ => console.log('Populated tasks table'))
};
// manager.reset([articles]); // Remove all data from articles.
// manager.drop([articles]); // Drop table articles.

var knex = require('knex')(config);


// ruleaza cu babel nu?
// poti folosi lambdas?
// dada...desi am avu cevapb a let
// lambdas merg..nush daca si let
function dropDatabase() {
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
  // asta nu e aceiasi treaba? atata ca nu mai faci un promise explicit nou.? k.ms
  // ba da e acelasi lucru dar e mai putin cod
  return dropDatabase()
    .then(createDatabase)
    .then(destroyConnection)
    .then(createTables)
    .then(_ => console.log('db: rebuildDB... done'))
    .then(_ => knex);
}

module.exports = {
  reinitialize: reinitialize
}
