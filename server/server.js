const express = require('express')
const fs = require('fs')
var cors = require('cors')
const app = express()
app.use(cors())

const port = 3001

app.get('/header-shape', (req, res) => {
  res.send('Hello World!')
})

app.get('/shape/:filename', (req, res) => {
    if(!fs.existsSync(`./rdf/${req.params.filename}.ttl`)){
        res.send('Requested file doesnt exist')
    } else {
        fs.readFile(`./rdf/${req.params.filename}.ttl`, (err, data) => {
            // console.log("data:", data)
            // console.log("data:", String(data))
            res.setHeader('content-type', 'text/turtle');
            res.send(String(data))
        })
    }
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})