const express = require('express');
const port = 8080;
const app = express()

app.get('/', (req, res) => {
    res.end("Welcome to Express.Js")
})

app.listen(port, () => {
    console.log(`Server is started at ${port}`);
});