const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/detail' ,require('./router/detail_route'));
app.use('/register' ,require('./router/register_route'));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});