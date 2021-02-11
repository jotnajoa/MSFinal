// var jsonArray1 = [{'name': "doug", 'id':5}, {'name': "dofug", 'id':23}];
// var jsonArray2 = [{'name': "goud", 'id':1}, {'name': "doaaug", 'id':52}];
// jsonArray1 = jsonArray1.concat(jsonArray2);
let keywords=['waste','debris','junk','remains','rubbish','trash','leftover','leavings','scrapes','dreg','residue'];
let categories=['title','label','content','object_type']


const fs = require('fs')
// load a default library that lets us make HTTP requests (like calls to an API)
let merged=[];
mergethings();
async function mergethings(){

    await new Promise(function (resolve) {

        for(let i=0;i<categories.length;i++){
            for(let k=0;k<keywords.length;k++){
                fs.readFile(`./json/'${categories[i]}'_'${keywords[k]}'.json`, "utf8", (err, data) => {
                    if (err) console.log(err);
                    let entirearray=JSON.parse(data);
                    entirearray.forEach((d)=>{
                        d.category=`${categories[i]}`;
                        d.keyword=`${keywords[k]}`
                    })
                    merged.push(entirearray)
                })
                
            }
            
        }

        resolve(); 
    })
    setTimeout(()=>{  fs.writeFileSync(`./result.json`, JSON.stringify(merged), 'utf8')},60000)
  

}



