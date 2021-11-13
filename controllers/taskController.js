const Task = require('../models/taskModel');

function updateTask(req, res) {
  const { taskId } = req.params;
  const replaceTask = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: 'Missing params' });
  }

  Task.findByIdAndUpdate(taskId, replaceTask, (err, task) => {
    if (err) { return res.status(500).send({ msg: 'Error updating' }); }
    return res.status(200).send({ message: 'Task updated', task });
  });
}

function deleteTask(req, res) {
  Task.findByIdAndDelete(req.params.taskId, (err) => {
    if (err) { return res.status(500).send({ msg: 'Error deleting' }); }
    return res.status(200).send({ message: 'Task erased' });
  });
}
function getEveryTask(req, res) {
  Task.find({}, (err, tasks) => {
    if (err) { return res.status(500).send({ msg: 'Error getting the tasks' }); }
    return res.status(200).send(tasks);
  });
}

module.exports = {
  updateTask,
  deleteTask,
  getEveryTask,
};
