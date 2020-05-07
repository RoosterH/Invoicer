const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Mongooese Connect
mongoose.connect('mongodb://localhost/invoicer',  {useNewUrlParser: true});
const db = mongoose.connection;

// Init App
const app = express();
// set port
const port = process.env.PORT || 3000;

// Enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // client folder, the agular app placeholder
app.use(express.static(__dirname+'/client'));
// Body parser
app.use(bodyParser.json());
// create route message
app.get('/', (req, res) => {
    res.send('Please use /api/customers or /api/invoices');
});

// Route files
const customers = require('./routes/customers');
const invoices = require('./routes/invoices');

// Paths
app.use('/api/customers', customers);
app.use('/api/invoices', invoices);

app.listen(port, () => {
   console.log('Server listening to port ' + port);
});
