// load a default library that lets us read/write to the file system
const fs = require('fs');
// if you are running this locally, you will need to npm install request
// load a default library that lets us make HTTP requests (like calls to an API)
const request = require('request');

// the folder we will write into, make sure the folder is in your directory
let folder = "./finaldown6";




function downloadImage(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        request(uri).pipe(fs.createWriteStream(folder + "/" + filename)).on('close', callback);
    });
};

// go through the json we created before
function downloadData(m) {
    fs.readFile("./finalminArray.json", "utf8", (err, data) => {
        if (err) console.log(err);

        let entirearray = JSON.parse(data);
        console.log(entirearray.length)


        for (let i = 380; i < 400; i++) {

            downloadImage(entirearray[i].primaryImage, entirearray[i].filename, function() {
                console.log('Finished Downloading', entirearray[i].filename)
            })
        }
        // entirearray.forEach((target)=>{
        //     downloadImage(target.primaryImage, target.filename, function() {
        //         console.log('Finished Downloading' + target.filename);
        //     })
        // })


    })
}


for (let t = 3; t < 4; t++) {
    setTimeout(() => { downloadData(t) }, (t - 3) * 600000)
}
//  1000000s 으로 도전해보기