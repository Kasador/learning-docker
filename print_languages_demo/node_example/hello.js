const express = require('express')
const app = express();

const time = new Date()

let clock = `${time.getFullYear()}-${(time.getMonth() + 1)}-${time.getDate() - 1}`
// app.get('/', (req, res) => (
//     res.send('Hello ASL!')
// ))
// https://stackoverflow.com/questions/36637912/how-to-stop-running-node-in-docker
var process = require('process')
process.on('SIGINT', () => {
  console.info("Interrupted")
  process.exit(0)
})

app.listen(3000, () => {
    console.log('Hello ASL!')
    console.log(`${clock}`)
})