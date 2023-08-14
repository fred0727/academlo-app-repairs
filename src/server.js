require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/initModels');

db.authenticate()
  .then(() => console.log('Database Connectes 🫡'))
  .catch((err) => console.log(err));

initModel();

db.sync()
  .then(() => console.log('Database Synced 👌'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 💻`);
});
