const request = require('request');

const fs = require('fs')

let merged = [];
let minMerged = [];

function shuffle(arra1) {
    var ctr = arra1.length,
        temp, index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}


fs.readFile(`./minified1000.json`, "utf8", (err, data) => {
    if (err) console.log(err);
    let entirearray = JSON.parse(data);
    let entirelength = entirearray.length
    console.log(entirelength)


    shuffle(entirearray)

    setTimeout(() => {
        for (let i = 0; i < 600; i++) {
            minMerged.push(entirearray[i])
        }
    }, 1000)
})

setTimeout(() => {
    fs.writeFileSync(`./finalminArray600.json`, JSON.stringify(minMerged), 'utf8');
    console.log(minMerged.length)
}, 5000)