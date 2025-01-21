// console.log('server file is running')

//what is call back function.
// function add(a,b){
//     return a+b
// }

// var result=add(3,500)
// console.log(result);

// (function (){
//     console.log('deepak kumar');
// })()

// (function (){
//     console.log('dpk');
// })
// 

const fs = require('fs');
const os = require('os');

let user = os.userInfo();

fs.appendFile('newfile2.txt', 'Hi, ' + user.username + '!', () => {
    console.log('File has been created');
});

