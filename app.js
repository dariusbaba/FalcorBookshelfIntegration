var express = require('express'),
  config = require('./config/config')

var app = express(),
  database = require('./app/DB.js'),
  schema = require('./app/schema.js'),
  TasksRepo = require('./app/TaskRepo.js')

var falcorExpress = require('falcor-express'),
  Router = require('falcor-router');

require('./config/express')(app, config);

database.reinitialize()
  .then(_ => {
    var newTask = new schema.models.tasks({
      description: "newly added task!!!!!!"
    })
    TasksRepo.create(newTask)
      .then(_ => TasksRepo.read(newTask))
      .then(_ => TasksRepo.update(newTask, "updated task!!!!"))
      .then(_ => TasksRepo.delete(newTask));
  })



app.use('/model.json',
  falcorExpress.dataSourceRoute(function(req, res) {
    return new Router([{
      route: "tasks['description']",
      get: function() {
        return {
          path: ['tasks'],
          value: "Hello Falcor Developers"
        };
      }
    }]);
  }));


app.listen(config.port, function() {
  console.log('Express server listening on port ' + config.port);
});
