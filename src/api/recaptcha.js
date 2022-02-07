const express = require('express')
const app = express()
const port = 4000

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({
    type: "*/*"    
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', function(req, res) {
    res.send('Got a POST request')
    console.log(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})