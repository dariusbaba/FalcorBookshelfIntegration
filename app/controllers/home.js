var express = require('express'),
  router = express.Router(),
  knex = require('knex'),
  config = require('../../config/config.js');
schema = require('../schema.js');



var falcorExpress = require('falcor-express'),
  Router = require('falcor-router');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/', function(req, res, next) {
  schema.models.tasks.forge().getResources().then(function(tasks) {
    console.log(JSON.stringify(tasks, null, ' '));
    res.render('index', {
      title: 'Generator-Express MVC',
      tasks: JSON.stringify(tasks, null, ' ')
    });
  });
});


router.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
  // create a Virtual JSON resource with single key ("greeting")
  console.log('in model.json');
  return new Router([{
    // match a request for the key "greeting"
    route: "tasks[{integers:tasksIds}]['description']",
    // respond with a PathValue with the value of "Hello World."
    get: function(pathSet) {
      return schema.models.tasks.forge().getResources()
        .then(tasks => {
          console.log(tasks);
          console.log(pathSet)
          var results = []
            // Above we specified an tasksIds identifier that is an
            // array of ids which we can loop over
            pathSet.tasksIds.forEach(function(taskId) {
              // Next, an array of key names that map is held at pathSet[2]
              [pathSet[2]].map(function(key) {
                // We find the event the cooresponds to the current eventId
                var task = tasks.find( _ => _.id  === taskId);
                // Finally we push a path/value object onto
                // the results array
                results.push({
                  path: ['tasks', taskId, key],
                  value: task.description
                });
              });
            });
          console.log(results);
          return results;
          })
    },
    set: function(jsonGraph) {
        console.log('in set');
        console.log(jsonGraph);
    }
  }]);
}));
