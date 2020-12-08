const fs = require('fs');

fs.readFile("./minified1000.json", "utf8", (err, data) => {
    if (err) console.log(err);
    let entirearray = JSON.parse(data);
    console.log(entirearray.length)
})