const express = require('express');
const port = 8080;
const app = express()

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.end("Welcome to Express.Js")
})

app.get('/home', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`Server is started at ${port}`);
});