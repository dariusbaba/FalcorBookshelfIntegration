var express = require('express'),
  config = require('./config/config')

var app = express();

require('./config/express')(app, config);

var db = require('./app/DB.js')
db.then(knex => {
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
  // forge the model and get all of its resources
  models.task.forge().getResources().then(function(results) {

    // pretty print the results to the console
    console.log(JSON.stringify(results, null, ' '));3
  });
});

app.listen(config.port, function() {
  console.log('Express server listening on port ' + config.port);
});