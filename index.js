const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const port = process.env.PORT 

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})