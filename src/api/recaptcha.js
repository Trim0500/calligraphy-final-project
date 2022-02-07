const express = require('express')
const app = express()
const port = 4000

const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
var request = require('request');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({
    type: "*/*"    
}));
dotenv.config({path: './.env'});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', function(req, res) {
    let response = req.body.token;
    let secret = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? process.env.REACT_APP_RECAPTCHA_SERVER_KEY_LOCAL : process.env.REACT_APP_RECAPTCHA_SERVER_KEY;
    let api = 'https://www.google.com/recaptcha/api/siteverify?secret=' + secret + '&response=' + response

    request(api, function(error, response, body){
        if(error) {
            console.error(error);
        }
        else {
            res.statusCode = 200;
            res.send(body);
        }
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})