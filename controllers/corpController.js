const Corporation = require('../models/corpModel');
const Task = require('../models/taskModel');

// GET METHODS

/* function getCorps(req, res) {
  Corporation.find({}, (err, corpInfo) => {
    if (err) { return res.status(400).send({ msg: 'No corporations found', error: err }); }
    return res.status(200).send({ corp: corpInfo, task: corporationTask });
  }).populate('corporationTask');
} */

function getCorps(req, res) {
  const selection = req.body;

  Corporation.find(selection, (err, corpInfo) => {
    if (err) { return res.status(400).send({ msg: 'Error getting the corp', error: err }); }
    return res.status(200).send(corpInfo);
  }).populate('corporationTask');
}

function getCorpById(req, res) {
  Corporation.findById(req.params.id, (err, corpInfo) => {
    if (err) { return res.status(400).send({ msg: 'Error getting the corp', error: err }); }
    return res.status(200).send(corpInfo);
  }).populate('corporationTask');
}

// POST METHODS

function createCorp(req, res) {
  const newCorp = new Corporation(req.body);

  newCorp.save((err, corpAdded) => {
    if (err) { return res.status(400).send({ msg: 'Error adding corporation', error: err }); }
    return res.status(200).send({ msg: 'Corporation added!', newCorp: corpAdded });
  });
}

function createCorpTask(req, res) {
  const { corpId } = req.params; // Corp id must be on the post param
  const newTask = new Task(req.body);

  newTask.save((err, taskAdded) => {
    if (err) { return res.status(400).send({ msg: 'Error adding corp task', error: err }); }
    Corporation.findByIdAndUpdate(corpId, { corporationTask: taskAdded.id }, (updateErr) => {
      if (updateErr) { return res.status(400).send({ msg: 'Error adding corp task', error: updateErr }); }
      return res.status(200).send({ msg: 'Corporation task added!', newCorp: taskAdded });
    });
  });
}

// DELETE METHODS

function deleteCorp(req, res) {
  Corporation.findByIdAndDelete(req.params.corpId, (err, corp) => {
    if (err) {
      return res.status(400).send({ msg: 'Unable to delete corp', error: err });
    }
    if (corp.corporationTask != null) {
      Task.findByIdAndDelete(corp.corporationTask, (terr, corpTask) => {
        if (terr) return res.status(400).send({ msg: 'Unable to delete corp task', error: terr });
      });
    }
    return res.status(200).send({ msg: 'Deleted succesfully', corpDeleted: corp });
  });
}

module.exports = {
  getCorps,
  getCorpById,
  createCorp,
  createCorpTask,
  deleteCorp,
};
