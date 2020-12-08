// Canvas Sizing
// The variables are declared first in the main.js file below...
heightofCanvas = 1900;
widthofCanvas = 1900;


let imgsource;
let anArray = [];
let testimg;
let entireData = [];
let url = './finalminArray600.json'
let pEntiredata = [];
let pSourcedata
let lenOfpData = 200;
let NMNHs = [],
    SIAs = [],
    SILs = [],
    SAAMs = [],
    NPGs = [],
    NPMs = [],
    NMAAHCs = [],
    NMAHs = [],
    NZPs = [],
    NASMs = [],
    ACMs = [],
    NMAIs = [],
    FBRs = [];
let mouseScroll = 0;
let secondAnimation = false;
let numofEl = 0;
let loopAcc = true;
let takeitOut = [];
let lastAnimation = false;
let firstLast = true;

let trashwords = [
    'debris', 'junk', 'remains', 'rubbish', 'trash', 'leftovers', 'leavings', 'scrapes', 'dregs', 'residue'
];

let keyNum = 0;
let pageSize = 500;

// $('.horizontalsection').css('top',`${heightofCanvas}px`)

function preload() {
    imgsource = './img/trash.png';
    pSourcedata = loadJSON(url)
}

function setup() {


    pEntiredata = Object.values(pSourcedata);
    //  eachGalArray(pEntiredata)
    console.log(pEntiredata)


    // 200 나중에 바꿔져야겠지 
    createCanvas(widthofCanvas, heightofCanvas);

    for (let i = 0; i < pEntiredata.length; i++) {

        if (pEntiredata[i].filename) {
            anArray.push(
                new Trashes(random(0, width),
                    random(0, height),
                    imgsource,
                    pEntiredata[i].category,
                    pEntiredata[i].keyword,
                    pEntiredata[i].filename.split('-')[0],
                    `./download/${pEntiredata[i].filename}`,
                    pEntiredata[i].title
                ))
        }

        // constructor(xPos,yPos,img,category,keyword,gallery,actualImg)
    };

    // removeEmptywords가 진짜 필요할지는 미지수

    removeEmptywords();

    //

    // pEachgalArray is not necessary anymore

    // setTimeout(()=>{
    //   // console.log('settimeout function is running')
    //   // pEachGalArray(pEntiredata)
    // }
    //   ,1000);


}

function draw() {
    clear()
        // console.log(!secondAnimation)
        // array를 parameter로 받아서 뱉어내는 함수를 만들어야할듯


    arrayRenderer(anArray)


    if (numofEl > 0) {
        showTotal()
    }



    // arrayRenderer(sortTarget)
    // exArray.forEach((d)=>{d.moving();
    //                       d.render()                       
    //                       })
}

function mouseWheel() {

    if (secondAnimation) {

        mouseScroll = mouseScroll + event.deltaY * 1 / 4;
        console.log((mouseScroll));

        updateShape();
    }
    if (keyNum > 6) {
        lastAnimation = true;
    }

}

function mousePressed() {
    if (lastAnimation && firstLast) {
        let backdrop = document.createElement('div')
        backdrop.classList.add('backdrop');

        let finalBtn = document.createElement('div')
        finalBtn.classList.add('finalbtn');
        document.querySelector('.canva').appendChild(backdrop);
        document.querySelector('.canva').appendChild(finalBtn);

        $('.finalbtn').append(`<a id='finallink' href='./bin.html'>Go to Summary</a>`)


        $('#defaultCanvas0').remove();
        firstLast = false;
    } else {
        console.log('not yet')
    }
}

// JSON Load후, 각각의 datapoint에 해당하는 crumbled paper Object를 만드는 함수
function feedObj(data) {
    // gallery이름은 filename 첫부분에 명시되어있으므로, 이것을 잘라냄
    let source = data.filename.split('-')[0];

    //  acronym to actual galleryname으로 바꿔주는 함수

    let museumname = sourcetranslate(source); //지금 당장 쓸필요는 없음

    //  source를 박물관 이름으로 바꿔주는 녀석

    let receiver = new Trashes(random(0, width), random(0, height), data.category, data.keyword, source, data.filename);
    //  constructor(xPos,yPos,img,category,keyword,gallery,actualImg) -> Object Configuration은 위와같다

    return receiver
        // data를 기반으로 Object를 만들고 이를 뱉어냄

}

// unitcode -> actual museum name 바꿔줌

function sourcetranslate(acronym) {
    if (acronym == 'NMNH') { return 'National Museum of Natural History' };
    if (acronym == 'SIA') { return 'Smithsonian Institution Archives' };
    if (acronym == 'SIL') { return 'Smithsonian Libraries' };
    if (acronym == 'SAAM') { return 'Smithsonian American Art Museum' };
    if (acronym == 'NPG') { return 'National Portrait Gallery' };
    if (acronym == 'NPM') { return 'National Postal Museum' };
    if (acronym == 'NMAAHC') { return 'National Museum of African American History and Culture' };
    if (acronym == 'NMAH') { return 'National Museum of American History' };
    if (acronym == 'NZP') { return 'National Museum of Natural History' };
    if (acronym == 'NASM') { return 'National Air and Space Museum' };
    if (acronym == 'ACM') { return 'Anacostia Community Museum' };
    if (acronym == 'NMAI') { return 'National Museum of the American Indian' };
    if (acronym == 'FBR') { return 'Smithsonian Field Book Project' } else {
        console.log('No matching galleries');
        return 'N/A'
    }
}





function arrayRenderer(array) {
    array.forEach((d) => {
        d.moving();
        d.render()
    })
}



// pEachGalArray function is excuted in main.js because the arrays are filled later.

// pEachGalArray(pEntiredata)

// pEachGalArray is not necessary anymore
// function pEachGalArray(targetA){

//   let target=[];
//   target=targetA
//   target.forEach((d)=>{
//       // console.log(d.filename)
//       if(d.filename){

//       let acronym=d.filename.split('-')[0].trim().replace(/\s+/g, '')
//       // console.log(acronym)



//       if(acronym=='NMNH') {NMNHs.push(d);};
//       if(acronym=='SIA') {SIAs.push(d)};
//       if(acronym=='SIL') {SILs.push(d)};
//       if(acronym=='SAAM') {SAAMs.push(d)};
//       if(acronym=='NPG') {NPGs.push(d)};
//       if(acronym=='NPM') {NPMs.push(d)};
//       if(acronym=='NMAAHC') {NMAAHCs.push(d)};
//       if(acronym=='NMAH') {NMAHs.push(d)};
//       if(acronym=='NZP') {NZPs.push(d)};
//       if(acronym=='NASM'){NASMs.push(d)};
//       if(acronym=='ACM') {ACMs.push(d)};
//       if(acronym=='NMAI') {NMAIs.push(d)};
//       if(acronym=='FBR') {FBRs.push(d)}
//       else{
//             let noti=`${acronym}--'has no match'`;

//             missmatcharray.push(noti);
//             console.log(noti);
//           }
//     }else{
//       console.log(d);
//     }


//   })
//   // console.log(NMNHs.length);console.log(SIAs.length);console.log(SILs.length);console.log(SAAMs.length);console.log(NPGs.length);console.log(NPMs.length);console.log(NMAAHCs.length);console.log(NMAHs.length);console.log(NZPs.length);console.log(NASMs.length);console.log(ACMs.length);console.log(NMAIs.length);console.log(FBRs.length)

//   }

function removeEmptywords() {

    for (let i = 0; i < trashwords.length; i++) {

        if (anArray.filter((d) => d.keyword == `${trashwords[i]}`).length == 0) {
            let removeword = trashwords[i]
            let index = trashwords.indexOf(removeword);
            if (index > -1) {
                trashwords.splice(index, 1)
                console.log(trashwords[i], 'this word is removed',
                    'width the length of 0')
            }
        }
    }
}



function sortKeyword() {


    secondAnimation = true;



    console.log('before', keyNum);
    keyNum = keyNum + 1;
    console.log('after', keyNum)

    anArray.forEach((d) => {

            if (d.keyword == trashwords[0]) {

                d.ifDefault = false;
                d.ifActualImg = true;
                d.xPos = random(d.xM, width)
                d.yPos = random(d.yM + 1 / 2 * height, height - d.yM)


            } else {
                d.visible = false;
            }
        })
        // step1;


}

function updateShape() {


    if (mouseScroll > 0 && mouseScroll < 10) {
        console.log(mouseScroll);
        if (loopAcc) {
            console.log('before', keyNum);
            keyNum = keyNum + 1;
            console.log('after', keyNum)
        } else {
            console.log('loopAcc stoped this loop');
        }
    } else if (mouseScroll > 10 && mouseScroll < 50) {
        console.log('new keyword is', trashwords[keyNum]);
        anArray.forEach((d) => {
            console.log('new keyword is launched', trashwords[keyNum]);
            if (d.keyword == trashwords[keyNum]) {

                d.visible = true;
                d.xPos = random(d.xM, width)
                d.yPos = random(d.yM + 1 / 2 * height, height - d.yM)
            }
        })

    } else if (mouseScroll > 50 && mouseScroll < pageSize * 1) {


        anArray.forEach((d) => {

            if (d.keyword == trashwords[keyNum]) {

                d.ifDefault = false;
                d.ifActualImg = true;


            } else {
                d.visible = false;
            }
        })
    }

    // rect모드로!
    else if (mouseScroll > pageSize * 1 && mouseScroll < pageSize * 2) {


        anArray.forEach((d) => {

            if (d.keyword == trashwords[keyNum]) {

                d.ifDefault = false;
                d.ifActualImg = false;
                d.ifRect = true;

            } else {
                d.visible = false;
            }
        })
    }

    //small 모드로!
    else if (mouseScroll > pageSize * 2 + 10 && mouseScroll < pageSize * 3) {


        anArray.forEach((d) => {

            if (d.keyword == trashwords[keyNum]) {
                d.defaultMoving = false;
                d.downMoving = true;
                d.imgSize = d.smallSize;
            } else {
                d.visible = false;
            }
        });
        numofEl = anArray.filter((d) => {
            return d.keyword == trashwords[keyNum]
        }).length;

    } else if (mouseScroll > pageSize * 3 + 10 && mouseScroll < pageSize * 4) {
        loopAcc = true;
        anArray.forEach((d) => {

            if (d.keyword == trashwords[keyNum]) {
                d.ifRect = false;
                d.defaultMoving = false;
                d.downMoving = false;
                //  d.imgSize=d.smallSize;
                d.wordView = true;
            } else {
                d.visible = false;
            }
        })

    } else if (mouseScroll > pageSize * 4 + 10 && mouseScroll < pageSize * 4 + 70) {

        anArray.forEach((d) => {
            d.visible = false;
            d.wordView = false;
            numofEl = 0;
        })

        if (loopAcc) {
            keyNum = keyNum + 1;
            loopAcc = false;
            console.log('keyNum successfully got increased', keyNum)
            mouseScroll = 0;
            console.log(('new start!'));
            console.log(mouseScroll)
        }

    }

    // Reset 되야하는 것들 list


}

function showTotal() {

    if (numofEl > 0) {
        push()
        fill('#707070');
        textFont('Helvetica')
        textSize(100);
        text(`${numofEl} elements`, width * 1 / 10, height * 4 / 5);
        push()
        textSize(50)
        text(`tagged as ${trashwords[keyNum]}`, width * 1 / 10, height * 4 / 5 + 40);
        pop();
        pop();

    }
}