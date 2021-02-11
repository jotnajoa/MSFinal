const fs = require('fs');
const request = require('request');

let myArray = [];

let sortedArray = [];


const path = './download/';
// path다음에 file이름을 써줘야한다

fs.readFile("./finalminArray.json", "utf8", (err, data) => {
    if (err) console.log(err);

    myArray = JSON.parse(data);
    console.log(myArray.length)
})



function checkingfile(data, checkpath, targetArray, lengthofArray, indexNum) {
    let filename = data.filename;

    let checkingtarget = `${checkpath}${filename}`

    fs.access(checkingtarget, fs.F_OK, (err) => {
        if (err) {
            console.error(err)
                //   return
        } else {
            console.log('there is the file there')
            targetArray.push(data)

            if (indexNum == lengthofArray - 1) {

                fs.writeFileSync(`./minified${lengthofArray}.json`, JSON.stringify(sortedArray), 'utf8')
            } else if (targetArray.length > lengthofArray) {
                return
            }

            // return myvalue
        }



    })
}

// myArray.forEach((d) => { checkingfile(d, path, sortedArray, 3) })
setTimeout(() => {
    for (let i = 0; i < myArray.length; i++) {
        checkingfile(myArray[i], path, sortedArray, 1000, i)
    }
}, 1000)