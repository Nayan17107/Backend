// HTTP Moduals

const http = require('http');

const server = http.createServer((req, res) => {
    // res.write('Welcome to Web Page')
    // res.end();

    let Filepath;

    switch (req.url) {
        case '/':
            Filepath = './home.html'
            break;
    
        case '/about':
            Filepath = './about.html'
            break;
    
        case '/contact':
            Filepath = './contact.html'
            break;
    
        default:
            Filepath = './Pagenotfound.html'
            break;
    }

    let data = fs.readFileSync(Filepath, 'utf-8')
    res.end(data)
})

server.listen(8000);

// FS Moduals

const fs = require('fs')

// fs.open('../Local-Moduals/abc.js', (err, data) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log('File Opened')
//     }
// })

// const data = fs.readFileSync('../Local-Moduals/abc.js', 'utf-8')
// console.log(data);