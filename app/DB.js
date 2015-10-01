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
  knex = require('knex')(config); // now we connect to the newly created DB
  var Manager = require('knex-schema');
  var manager = new Manager(knex);
  //create/update tables
  manager.sync([tasks])
    .then(
      _ => {
        console.log('Created tasks table');
        manager.populate([tasks])
          .then(_ => console.log('Populated tasks table'))
      })
};
// manager.reset([articles]); // Remove all data from articles.
// manager.drop([articles]); // Drop table articles.

var knex = require('knex')(config);
var dropCommand = 'DROP DATABASE IF EXISTS ' + databaseName
var rebuildDB = function() {
    knex.raw(dropCommand)
    .then(function() {
      knex.raw('CREATE DATABASE ' + databaseName)
        .then(function() {
          console.log('DB CREATED');
          knex.destroy();
          createTables()
        })
    })
};


module.exports = new Promise((resolve, reject) => {
  rebuildDB() // I want this shit to be done before i resolve knex
    .then(_ => {
      console.log(_);
      resolve(knex)
    })
})
