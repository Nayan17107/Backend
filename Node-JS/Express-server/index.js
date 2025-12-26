const express = require('express');
const port = 8080;
const app = express()

app.set('view engine', 'ejs');
app.use(express.urlencoded());

let students = [
    {
        id : "1",
        name : "Prajapati Nayan",
        age : "19",
        email : "nayan123@.in"
    },
    {
        id : "2",
        name : "Pajiyavala Krish",
        age : "19",
        email : "krish123@.in"
    },
    {
        id : "3",
        name : "Dhamiliya Luv",
        age : "21",
        email : "luv123@.in"
    },
    {
        id : "4",
        name : "Trapsiya Meet",
        age : "19",
        email : "meet123@.in"
    },
]

app.get('/', (req, res) => {
    res.render('index', {students})
})

app.post('/add-student', (req, res) =>{
    // console.log(req.body)
    students.push(req.body);
    return res.redirect('/')
})

app.get('/delete-student/:id', (req, res) => {
    // console.log(req.params.id);
    const id = req.params.id

    students = students.filter(stud => stud.id !== id)
    return res.redirect('/')
})

app.listen(port, () => {
    console.log(`Server is started at http://localhost:${port}`);
});