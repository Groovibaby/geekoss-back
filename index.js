const express = require('express');
const app = express();
const apiRouter = require('./routes');
const port = process.env.PORT || 3308;
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is running on ${port}`);
});