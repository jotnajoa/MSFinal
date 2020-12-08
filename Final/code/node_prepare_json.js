/*
 * Note that this function uses *synchronous* JavaScript
 * There is a 2-second (2000 milliseconds) timer after which the JSON will be downloaded
 * so if the API calls are not finished by then, the JSON will only have the ones that did finish.
 * You can increase the timer if you need to.
 */

// if you are running this locally, you will need to npm install request and dotenv
// load a default library that lets us read/write to the file system
const fs = require('fs')
// load a default library that lets us make HTTP requests (like calls to an API)
const request = require('request')
// load dotenv for the purpose of storing our api key
// create a .env file
// store your api key (ex. API_KEY="abcdefghijk")
// make sure to put your .env file in your .gitignore
var myArray = [];

// getting our api key from .env
const API_KEY='YiDoLOkdZ9yOYebr3Ozp77fqfd59L2bC8GheRAaC'

// endpoint URL
const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";
// our search term


// 이렇게 구분하는 이유는 흑백사진에서는 그냥 이미지들이 큰 의미가 없으니까, 전체 pool을 
// 드로잉이나 페인팅인 녀석을 전체 레인지에서 뽑고, 
// 사진은 컬러사진이후만
let keywords=['waste','debris','junk','remains','rubbish','trash','leftover','leavings','scrapes','dreg','residue'];
// let keywords=['waste'];
// let sources=['title','label','content','object_type'];

let searchTitle=[];
let searchLabel=[];
let searchContent=[];
let searchObj=[];

keywords.forEach((d)=>{
  searchTitle.push(`'title':'${d}'`);
  searchLabel.push(`'label':'${d}'`);
  searchContent.push(`'content':'${d}'`);
  searchObj.push(`'object_type':'${d}'`);
})

searchTitle.forEach((d)=>{searchGenerator(d)})

function searchGenerator(input){
    // input 이 searchword가 되는것이고
  // 이 input을 가지고 entireloop를 돌리면 json을 만드는 것인데, 

  entireloop(input)
}

function entireloop(search){

  let category=search.split(':')[0];
  let keyword=search.split(':')[1];
  let url = `${searchBaseURL}?api_key=${API_KEY}&q=${search}`

fetchSearchData(url,category,keyword);
// get objects by search term
function fetchSearchData(url,category,keyword) {

  request(url, function(error, response, body) {

    console.error('error:', error); // print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // print the response status code if a response was received
    

    let obj = JSON.parse(body);
    console.log(obj);
    let pageSize = 1000;
    let numberOfQueries = Math.ceil(obj.response.rowCount / pageSize);

    console.log(numberOfQueries)

    for(let i = 0; i < numberOfQueries; i++) {
      // making sure that our last query calls for the exact number of rows
      if (i == (numberOfQueries - 1)) {
        searchAllURL = url + `&start=${i * pageSize}&rows=${obj.response.rowCount - (i * pageSize)}`;
      } else {
        searchAllURL = url + `&start=${i * pageSize}&rows=${pageSize}`;
      }
      
      fetchUrl(searchAllURL,category,keyword);
    }
  })

}

async function fetchUrl(searchAllURL,cat,key){
  await new Promise(function (resolve) {

      request(searchAllURL, function (error, response, body) {
       
        let obj = JSON.parse(body);
        console.log(obj)

        // here we are constructing our own object with just the information we need
        // first we filter out the objects that do not have the information we need (change accordingly)
        // after the objects are filtered, we map our objects and construct a new object
        let objects = obj.response.rows.filter(data => {

          // by default we assume we have complete data
          dataComplete = true;

          // Test if images exist
          if (data.content.descriptiveNonRepeating.online_media == undefined
            || data.content.descriptiveNonRepeating.online_media.media == undefined
            || data.content.descriptiveNonRepeating.online_media.media[0] == undefined
            || data.content.descriptiveNonRepeating.online_media.media[0].resources == undefined
            || data.content.descriptiveNonRepeating.online_media.media[0].resources[1] == undefined) { dataComplete = false; }

          // Test if we have a date value
          if (data.content.indexedStructured.date == undefined) { dataComplete = false; }


          return dataComplete;

          // Filter operater filters through the entities and returns a value only when the anonymous function in the
          // filter operator is 'true'
        }).map((data) => {
          //I guess, to chain functions, the previous function must 'RETURN' something and receive the value 
          // in the following "chained" operator like 'then()'.

          let filename = data.content.descriptiveNonRepeating.online_media.media[0].resources[1].url.split('=').pop();

          return {
            // mediumtype:data.content.freetext.objectType[0].content,
            category:cat,
            keyword:key,
            objectID: data.id,
            title: data.title,
            date: data.content.indexedStructured.date,
            primaryImage: data.content.descriptiveNonRepeating.online_media.media[0].resources[1].url,
            filename: filename.includes(".jpg") ? filename : filename + ".jpg" // if the filename we defined above doesn't include .jpg add it at the end
          };

        });

        myArray.push(objects);
        // if there are more objects than the pageSize myArray will look like this: [[...objects], [...objects]]
        // we use [].concat to flatten out myArray to be a one-dimensional array
        myArray = [].concat(...myArray);
        resolve();
      });
      
    })
      fs.writeFileSync(`./${cat}_${key}.json`, JSON.stringify(myArray), 'utf8')

}


// calling our function


}
// // the function inside the setTimeout saves myResults to a JSON
// // it will automatically run after 5000 ms

// setTimeout(() => {
//     fs.writeFileSync('./data.json', JSON.stringify(myArray), 'utf8')
// }, 1000)
// 7000ms is not enough, so either going with async function or increase the time