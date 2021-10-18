const app = require('./app');

const PORT = process.env.PORT || 3000; // Puerto asignado

app.listen(PORT, () => {
  console.log(`Node server running on http://localhost:${PORT}`);
});
