const fs = require('fs');

//blocking or sychronous way

const file1 = fs.readFileSync('./files/letter.txt','utf-8')
//console.log(file1)


//console.log('this statement will only be executed after the complete execution of file1')


// non blocking or asychronous way

fs.readFile(`${__dirname}/files/message.txt`,'utf-8',(err,data) =>{
    if(err){
        return console.log("an error occurred")
    }
    console.log(data)


})
console.log('asynchronous')
