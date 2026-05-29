const express = require('express'); 
const dbconnect = require('./src/Config/dbConnect')
const app = express()
const port = 8100;

dbconnect();

app.use(express.urlencoded());
app.use(express.json());
app.use("/uploads", express.static('src/Uploads'));

app.use('/api', require('./src/Routes/index.routes'))

app.listen(port, () => {
    console.log(`server start at http://localhost:${port}`)
})