const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000; // Puerto asignado
const db = process.env.MONGODB || 'mongodb://localhost:27017/API';

mongoose.connect(db, { useNewUrlParser: true }, (err) => {
  if (err) console.log(`Database unable to conect. Error: ${err}`);
  else app.listen(PORT, () => { console.log(`Node server running on http://localhost:${PORT}`); });
});
