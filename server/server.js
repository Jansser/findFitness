const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
  const help = `
  <pre>
    Welcome to the FindFitness API!
  </pre>
  `;

  res.send(help);
});

require('./routes')(app);

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port);
}); 