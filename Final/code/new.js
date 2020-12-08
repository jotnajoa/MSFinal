const request = require('request');

const fs = require('fs')

let merged=[];


fs.readFile(`./result.json`, "utf8", (err, data) => {
    if (err) console.log(err);
    let entirearray=JSON.parse(data);
    let entirelength=entirearray.length

    for(let i=0;i<entirelength;i++){
        let innerlength=entirearray[i].length;
        console.log(innerlength)
        for(let k=0;k<innerlength;k++){
            merged.push(entirearray[i][k])
        }
    }

    }
)

setTimeout(()=>{  
    console.log(merged.length);
    fs.writeFileSync(`./newsampletest.json`, JSON.stringify(merged), 'utf8')},50)