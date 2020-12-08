// load a default library that lets us read/write to the file system
const fs = require('fs');
// if you are running this locally, you will need to npm install request
// load a default library that lets us make HTTP requests (like calls to an API)
const request = require('request');

// the folder we will write into, make sure the folder is in your directory
let folder = "./download2";
let segmentarray=[];

// download the image by url, name the file by filename
//   fs.readFile('./data.json',(err,data)=>{
//   if(err){console.log(err)};

//   let readobject =JSON.parse(data)
//   console.log(readobject[0])
// })




function downloadImage(uri, filename, callback){
  request.head(uri, function(err, res, body){
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(folder + "/" + filename)).on('close', callback);
  });
};

// go through the json we created before
function downloadData() {
  fs.readFile("./result.json", "utf8", (err, data) => {
    if (err) console.log(err);

    let entirearray=JSON.parse(data);
    console.log(entirearray.length)


    function autodown(val){

      for (let i=val;i<(val)+1;i++){
        let innerlength=entirearray[i].length;
        console.log(innerlength)
        for(let k=1300;k<1400;k++){
          target=entirearray[i][k]
          console.log(target.filename)
          downloadImage(target.primaryImage,target.filename,function(){
            console.log('Finished Downloading' + target.filename);
          })
          console.log(entirearray[i][k])
          }
        }

    }

//     function doout(i){
//     setTimeout(()=>{console.log('counting',i)},i*1000)}

// function doout2(){
//   console.log('yo')
// }

    // for (let m=1;m<45;m++){
    //   setTimeout(autodown(m),m*1000)
    // }
    
    autodown(25)


    //   downall();

  //   async function downall(){

  //     for (let i=1;i<45;i++){
  //       await new Promise(function (resolve) {
  //         autodown(i)
  //         resolve()
  //     })

  //     }



  // }
    // length is 44

    // for 4,500 index 99 wasn't added
    // lets run from 300 to 500

    // time to run 6

    // tried to loop it to download all, but my processor can't afford it, 
    // so manually iterated through them.




    // length of photographs is 6538, lets divide it by 500? maybe?








        // segmentarray.forEach((e) => {
        //   console.log('Downloading ' + e.filename);
        //   downloadImage(e.primaryImage, e.filename, function(){
        //     console.log('Finished Downloading ' + e.filename);
        //   });
        // })

      })
}

downloadData();

