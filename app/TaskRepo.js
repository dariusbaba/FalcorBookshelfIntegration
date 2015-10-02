var TasksRepo = {
  create: newTask => {
    console.log("creating a new tasks...");
    return newTask.save().then(
      model => {
        console.log(model);
        console.log(' ---- created task ----');
      })
  },
  read: task => {
    console.log(task);
    return task.fetch().then(
      model => {
        console.log(model);
        console.log(' ---- tasks fetched ---- ');
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
        console.log(model);
        console.log(' ---- task updated ---- ');
      }
    )
  },

  delete: task => {
    console.log('deleting task');
    return task.destroy().then(
      _ => {
        console.log(_);
        console.log(' ---- task deleted ---- ');
      }
    )
  }
}


module.exports = TasksRepo
