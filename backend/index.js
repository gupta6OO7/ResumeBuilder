const express = require('express')
const app = express()
const port = 8080

//setting headers
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//our API
app.use(express.json())
app.use('/api', require('./BuildResume'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})