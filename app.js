var express = require('express'),
  config = require('./config/config')

var app = express(),
  database = require('./app/DB.js'),
  TasksRepo = require('./app/TaskRepo.js')

var falcorExpress = require('falcor-express'),
      Router = require('falcor-router');

require('./config/express')(app, config);

database.reinitialize()
  .then(knex => {
    //this code is ran before the create
    // ok
    var db = require('bookshelf')(knex);
    db.plugin('registry');
    var factory = require('bookshelf-factory')(config);
    var type = factory.schemer.constants.type;
    var schema = {
      tasks: {
        id: {
          type: type.integer,
          primary: true,
          increments: true
        },
        description: {
          type: type.string,
          size: 200
        }
      }
    };
    // call the create function to create all the models
    var models = factory.create(schema);
    console.log(models);
    var tasks = models.tasks;
    // forge the model and get all of its resources
    tasks.forge().getResources().then(function(results) {

      // pretty print the results to the console
      console.log(JSON.stringify(results, null, ' '));
    });

    tasks.collection().fetch().then(function(collection) {
      // console.log(collection);
    })

    var newTask = new tasks({
      description: "newly added task!!!!!!"
    })

    TasksRepo.create(newTask)
      .then(_ => TasksRepo.read(newTask))
      .then(_ => TasksRepo.update(newTask, "updated task!!!!"))
      .then(_ => TasksRepo.delete(newTask));
  })

app.listen(config.port, function() {
  console.log('Express server listening on port ' + config.port);
});
