const fs=require('fs');
const request = require('request');
let sortedArray=[];
const path = './download/';

downloadData();

function downloadData() {

    fs.readFile("./newresult.json", "utf8", (err, data) => {
      if (err) console.log(err);
  
      let entirearray=JSON.parse(data);
      console.log('ready to make an array')
      setTimeout(()=>{
        entirearray.forEach((d)=>{checkingfile(d,path,sortedArray,400)})
      },2000)  
      

    })

}





// path다음에 file이름을 써줘야한다



function checkingfile(data,checkpath,targetArray,lengthofArray){
let filename=data.filename;
let myvalue=false;
let checkingtarget=`${checkpath}${filename}`

    fs.access(checkpath, fs.F_OK, (err) => {
        if (err) {
          console.error(err)
        //   return
        } else{
            console.log('there is the file there')
            targetArray.push(data)

            if(targetArray.length==lengthofArray){

                fs.writeFileSync(`./minified${lengthofArray}.json`, JSON.stringify(sortedArray), 'utf8')
            } else if(targetArray.length>lengthofArray){
                return
            }

            // return myvalue
        }
      

        
      })
}











