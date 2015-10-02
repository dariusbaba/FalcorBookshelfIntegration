var TasksRepo = {
  create: newTask => {
    console.log("creating a new tasks...");
    return newTask.save().then(
      model => {
        console.log('created task');
        console.log(model);
      })
  },
  read: task => {
    console.log(task);
    return task.fetch().then(
      model => {
        console.log('tasks fetched');
        console.log(model);
      }
    )
  },
  update: (task, newDescription) => {
    console.log('updating tasks...');
    return task.save({
      description: newDescription
    }, {
      patch: true
    }).then(
      model => {
        console.log('task updated');
        console.log(model);
      }
    )
  },

  delete: task => {
    console.log('deleting task');
    return task.destroy().then(
      _ => {
        console.log('task deleted');
        console.log(_);
      }
    )
  }
}


module.exports = TasksRepo
