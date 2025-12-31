const express = require('express');
const dbconnection = require('./config/dbConnection');
const Students = require('./Model/Student.modal');

const port = 8080;
const app = express();

dbconnection();

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/add-student', async (req, res) => {
    try {
        await Students.create(req.body);
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error adding student');
    }
});

// Server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
