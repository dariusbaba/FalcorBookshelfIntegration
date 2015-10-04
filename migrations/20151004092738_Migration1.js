
var config = require('../config/config.js'),
  knexBuilder = require('knex'),
  knexSchema = require('knex-schema'),
  databaseName = 'test';

//we declare the new schema (tables, references, etc)
// we can always use just knex methods to do this and not use the knex-schema helper
var tasksTypes = {
  tableName: 'tasks_types',
  build: function(table) {
    table.increments('id').primary();
    table.string('type');
  },
  populate: function(database) {
    return knex('tasks_types').insert([{
      type: 'First task type'
    }, {
      type: 'Second task type'
    }, {
      type: 'Third task type'
    }]);
  }
};

config.connection.database = databaseName
knex = knexBuilder(config);
var Manager = knexSchema
var manager = new Manager(knex);
//create/update tables

exports.up = function(knex, Promise) {
  return manager.sync([tasksTypes])
    .then(_ => console.log('db: created tasks types table'))
    .then(_ => manager.populate([tasksTypes]))
    .then(_ => console.log('Populated tasks types table'))

};

exports.down = function(knex, Promise) {
  return manager.drop([tasksTypes]);
  //or we can do it old school
  // return Promise.all([
  //   knex.schema.dropTable('tasksTypes'),
  // ]);
};
