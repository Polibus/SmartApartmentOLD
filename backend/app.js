const express = require('express');
const app = express();
const { port } = require('./config')
const apiRouter = require('./routes/api')
const cors = require('cors')
require('./db/mongoose')

app.use(express.json());
app.use(cors());
app.use('/api/', apiRouter);

app.listen(port, () => { console.log('Server is running', port) });
