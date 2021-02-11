
let imgsource;
let anArray=[];
let testimg;
let entireData=[];
let url='./newsample.json'
let pEntiredata=[];
let pSourcedata
let lenOfpData=200;
let NMNHs=[],SIAs=[],SILs=[],SAAMs=[],NPGs=[],NPMs=[],NMAAHCs=[],NMAHs=[],NZPs=[],NASMs=[],ACMs=[],
NMAIs=[],FBRs=[];
let mouseScroll=0;
let secondAnimation=false;

let sortTargetword;
let sortArrayLength;
let sortTarget=[];
let pageSize=500;


function preload() {
    imgsource='./img/trash.png';
    pSourcedata = loadJSON(url)
    
    
  }

function setup() {

  pEntiredata=Object.values(pSourcedata);
  //  eachGalArray(pEntiredata)


// 200 나중에 바꿔져야겠지 
    createCanvas(1700, 900);

    for (let i=0;i<200;i++){
        anArray.push(
          new Trashes(random(0,width),
          random(0,height),
          imgsource,
          pEntiredata[i].category,
          pEntiredata[i].keyword,
          pEntiredata[i].filename.split('-')[0],
          `./download/${pEntiredata[i].filename}`
          ))
        // constructor(xPos,yPos,img,category,keyword,gallery,actualImg)
    };

    setTimeout(()=>{
      console.log('settimeout function is running')
      pEachGalArray(pEntiredata)
    }
      ,2000);
   

  }

function draw(){
  clear()
// console.log(!secondAnimation)
  // array를 parameter로 받아서 뱉어내는 함수를 만들어야할듯
  if(!secondAnimation){
    
    arrayRenderer(anArray)
  }
  
  if(secondAnimation){

  updateTrashes();
  arrayRenderer(sortTarget)
}
  // arrayRenderer(sortTarget)
  // exArray.forEach((d)=>{d.moving();
  //                       d.render()                       
  //                       })
}

function mouseWheel() {
  if(secondAnimation){
    mouseScroll=mouseScroll+event.deltaY

  }
}

// JSON Load후, 각각의 datapoint에 해당하는 crumbled paper Object를 만드는 함수
function feedObj(data){
  // gallery이름은 filename 첫부분에 명시되어있으므로, 이것을 잘라냄
 let source=data.filename.split('-')[0];

//  acronym to actual galleryname으로 바꿔주는 함수

 let museumname=sourcetranslate(source);//지금 당장 쓸필요는 없음

//  source를 박물관 이름으로 바꿔주는 녀석

 let receiver = new Trashes(random(0,width),random(0,height),data.category,data.keyword,source,data.filename);
//  constructor(xPos,yPos,img,category,keyword,gallery,actualImg) -> Object Configuration은 위와같다

return receiver
// data를 기반으로 Object를 만들고 이를 뱉어냄

}

// unitcode -> actual museum name 바꿔줌

function sourcetranslate(acronym){
  if(acronym=='NMNH'){return 'National Museum of Natural History'};
  if(acronym=='SIA'){return 'Smithsonian Institution Archives'};
  if(acronym=='SIL'){return 'Smithsonian Libraries'};
  if(acronym=='SAAM'){return 'Smithsonian American Art Museum'};
  if(acronym=='NPG'){return 'National Portrait Gallery'};
  if(acronym=='NPM'){return 'National Postal Museum'};
  if(acronym=='NMAAHC'){return 'National Museum of African American History and Culture'};
  if(acronym=='NMAH'){return 'National Museum of American History'};
  if(acronym=='NZP'){return 'National Museum of Natural History'};
  if(acronym=='NASM'){return 'National Air and Space Museum'};
  if(acronym=='ACM'){return 'Anacostia Community Museum'};
  if(acronym=='NMAI'){return 'National Museum of the American Indian'};
  if(acronym=='FBR'){return 'Smithsonian Field Book Project'}
  else{
    console.log('No matching galleries');
    return 'N/A'}
}





function arrayRenderer(array){
  array.forEach((d)=>{d.moving();
    d.render()                       
    })
}



// pEachGalArray function is excuted in main.js because the arrays are filled later.

// pEachGalArray(pEntiredata)

function pEachGalArray(targetA){

  let target=[];
  target=targetA
  target.forEach((d)=>{
      // console.log(d.filename)
      if(d.filename){
      
      let acronym=d.filename.split('-')[0].trim().replace(/\s+/g, '')
      // console.log(acronym)



      if(acronym=='NMNH') {NMNHs.push(d);};
      if(acronym=='SIA') {SIAs.push(d)};
      if(acronym=='SIL') {SILs.push(d)};
      if(acronym=='SAAM') {SAAMs.push(d)};
      if(acronym=='NPG') {NPGs.push(d)};
      if(acronym=='NPM') {NPMs.push(d)};
      if(acronym=='NMAAHC') {NMAAHCs.push(d)};
      if(acronym=='NMAH') {NMAHs.push(d)};
      if(acronym=='NZP') {NZPs.push(d)};
      if(acronym=='NASM'){NASMs.push(d)};
      if(acronym=='ACM') {ACMs.push(d)};
      if(acronym=='NMAI') {NMAIs.push(d)};
      if(acronym=='FBR') {FBRs.push(d)}
      else{
            let noti=`${acronym}--'has no match'`;

            // missmatcharray.push(noti);
          }
    }else{
      console.log(d);
    }
          
 
  })
  // console.log(NMNHs.length);console.log(SIAs.length);console.log(SILs.length);console.log(SAAMs.length);console.log(NPGs.length);console.log(NPMs.length);console.log(NMAAHCs.length);console.log(NMAHs.length);console.log(NZPs.length);console.log(NASMs.length);console.log(ACMs.length);console.log(NMAIs.length);console.log(FBRs.length)
  
  }




  function sortKeyword(targetArray,words,keyNum){
    secondAnimation=true;
    console.log(targetArray)
    sortTargetword='';
    mouseScroll=0;
    sortArrayLength=0;
    sortTarget=[];
    sortTargetword=words[keyNum];


    targetArray.forEach((d)=>{
      if(d.keyword==sortTargetword){
        sortTarget.push(d)
      } else{null}
    });

    sortArrayLength=sortTarget.length;

    targetArray.forEach((d)=>{
      d.visible=false;
    });


  }

  function updateTrashes(){
    // console.log(sortTarget);
    console.log('sortArrayLength',sortArrayLength);
    console.log('mouseScroll',mouseScroll);
    if(sortArrayLength>0 && mouseScroll<pageSize){

      console.log('length is good and scroll is good')
      anArray.forEach((d)=>{
        d.ifDefault=false;
        d.ifActualImg=true;
      })

    } if(sortArrayLength>0 && mouseScroll>pageSize && mouseScroll<pageSize*2){
      console.log('second stage starts')
      sortTarget.forEach((d)=>{
        d.ifDefault=false;
        d.ifActualImg=false;
        d.ifRect=true;
      })
    } if(sortArrayLength>0 && mouseScroll>pageSize*2 && mouseScroll<pageSize*3){

      sortTarget.forEach((d)=>{
        d.ifDefault=false;
        d.ifActualImg=false;
        d.ifRect=true;
        d.downMoving=true;
      })
    } if(sortArrayLength>0 && mouseScroll>pageSize*3+50){

      sortTarget.forEach((d)=>{
        d.ifDefault=false;
        d.visible=false;
      })


    }
  }
/*

  let trashwords=[
    'debris','junk','remains','rubbish','trash','leftovers','leavings','scrapes','dregs','residue'
];


*/