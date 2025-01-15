const http = require('http');
const fs = require('fs')
const PORT = 8000;
const localhost = '127.0.0.1';

const data = fs.readFileSync('./database.json','utf-8')

const server = http.createServer((req,res)=>{
    const pathName = req.url;
    if(pathName === '/'){
        res.writeHead(200,{
            "content-type": "text/html"
        })
        res.end('<h1>hello dear, welcome to our home page</h1>')

    }else if (pathName === '/product') {
        res.writeHead(200,{
            "content-type": "text/html"
        })
        res.end('<h1>hello dear, which products would you prefer</h1>')

        
    }  else if (pathName === '/api'){

        res.writeHead(200,{
            "content-type": "application/json",
            'my_header': "good to go"
        })

        res.end(data)


    }else{
        res.writeHead(404,{
            "content-type": "text/html"
        })
        res.end('<h1>file not found</h1>')

    }
    
    

})

server.listen(PORT, ()=>{
    console.log(`server is running on PORT: ${PORT}`)
})

