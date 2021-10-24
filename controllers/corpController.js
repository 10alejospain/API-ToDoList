const { Corporation } = require('../models/corpModel');

// GET METHODS

function getCorp(req, res) {
  Corporation.find(req.params.id, (err, corpInfo) => {
    if (err) { return res.status(400).send(err.message); }
    return res.status(200).send(corpInfo);
  });
}

// POST METHOD

function createCorp(req, res) {
  const newCorp = new Corporation(req.body);

  newCorp.save((err) => {
    if (err) { return res.status(400).send(err.message); }
    return res.staus(200).send({ msg: 'Corporation added!' });
  });
}

module.exports = {
  getCorp,
  createCorp,
};
