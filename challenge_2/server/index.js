const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`connected to ${port}`);
});


