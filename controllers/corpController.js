const Corporation = require('../models/corpModel');
const Task = require('../models/taskModel');

// GET METHODS

function getCorp(req, res) {
  Corporation.findOne({ _id: req.params.id }, (err, corpInfo) => {
    if (err) { return res.status(400).send(err.message); }
    return res.status(200).send(corpInfo);
  }).populate('corporationTask');
}

// POST METHOD

function createCorp(req, res) {
  const newCorp = new Corporation(req.body);

  newCorp.save((err, corpAdded) => {
    if (err) { return res.status(400).send({ message: 'Error adding corporation', error: err }); }
    return res.status(200).send({ msg: 'Corporation added!', newCorp: corpAdded });
  });
}

function createCorpTask(req, res) {
  const { corpId } = req.params; // Corp id must be on the post param
  const newTask = new Task(req.body);

  newTask.save((err, taskAdded) => {
    if (err) { return res.status(400).send(err.message); }
    Corporation.findByIdAndUpdate(corpId, { corporationTask: taskAdded.id }, (updateErr) => {
      if (updateErr) { return res.status(400).send(updateErr.message); }
      return res.status(200).send({ msg: 'Corporation task added!', newCorp: taskAdded });
    });
  });
}

module.exports = {
  getCorp,
  createCorp,
  createCorpTask,
};
