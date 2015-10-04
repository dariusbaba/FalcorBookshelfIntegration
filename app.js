var express = require('express'),
  config = require('./config/config')

var app = express(),
  schema = require('./app/schema.js'),
  TasksRepo = require('./app/TaskRepo.js')

var falcorExpress = require('falcor-express'),
  Router = require('falcor-router');

require('./config/express')(app, config);

// var newTask = new schema.models.tasks({
//   description: "newly added task!!!!!!"
// })
// TasksRepo.create(newTask)
//   .then(_ => TasksRepo.read(newTask))
//   .then(_ => TasksRepo.update(newTask, "updated task!!!!"))
//   .then(_ => TasksRepo.delete(newTask));
//

//
// app.use('/model.json',
//   falcorExpress.dataSourceRoute(function(req, res) {
//     return new Router([{
//       route: "tasks",
//       get: function() {
//         return {
//           path: ['tasks'],
//           value: "Hello Falcor Developers"
//         };
//       }
//     }]);
//   }));


app.use('/model.json', falcorExpress.dataSourceRoute(function (req, res) {
  // create a Virtual JSON resource with single key ("greeting")
  console.log('in model.json');
  return new Router([
    {
      // match a request for the key "greeting"
      route: "greeting",
      // respond with a PathValue with the value of "Hello World."
      get: function() {
        return {path:["greeting"], value: "Hello World"};
      }
    }
  ]);
}));


app.listen(config.port, function() {
  console.log('Express server listening on port ' + config.port);
});
