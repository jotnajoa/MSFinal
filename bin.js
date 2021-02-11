let galleries = ['NMNH', 'SIA', 'SIL', 'SAAM', 'NPG', 'NPM', 'NMAAHC', 'NMAH', 'NZP', 'NASM', 'ACM', 'NMAI', 'FBR'];
let missmatcharray = [];
let mEntireArray = [];
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
let totalSet = [];
let selectedBin;
let binCanvWidth = 1920;
let binCanvHeight = 800;

console.log(totalSet);
d3.json('./finalminArray600.json').then(function(d) {

    console.log(d)
    mEntireArray = d;

    //making totalSet
    eachGalArray();
    totalSet.push(NMNHs);
    totalSet.push(SIAs);
    totalSet.push(SILs);
    totalSet.push(SAAMs);
    totalSet.push(NPGs);
    totalSet.push(NPMs);
    totalSet.push(NMAAHCs);
    totalSet.push(NMAHs);
    totalSet.push(NZPs);
    totalSet.push(NASMs);
    totalSet.push(ACMs);
    totalSet.push(NMAIs);
    totalSet.push(FBRs)

    console.log(totalSet.length)
    totalSet.forEach((d) => { generateDivs(d) })
    fadeInbins()

    $(".binofGal").click(function() {
        var myClass = $(this).attr("class");
        let targetclass = myClass.split(' ')[1]
        let target = `${targetclass}img`;

        openLid(target)
        showInside(targetclass)

    });

})


// 나중에 let 없앤다.

function eachGalArray() {

    mEntireArray.forEach((d) => {
        let acronym = d.filename.split('-')[0].trim().replace(/\s+/g, '')
            // console.log(acronym)

        if (acronym == 'NMNH') { NMNHs.push(d); };
        if (acronym == 'SIA') { SIAs.push(d) };
        if (acronym == 'SIL') { SILs.push(d) };
        if (acronym == 'SAAM') { SAAMs.push(d) };
        if (acronym == 'NPG') { NPGs.push(d) };
        if (acronym == 'NPM') { NPMs.push(d) };
        if (acronym == 'NMAAHC') { NMAAHCs.push(d) };
        if (acronym == 'NMAH') { NMAHs.push(d) };
        if (acronym == 'NZP') { NZPs.push(d) };
        if (acronym == 'NASM') { NASMs.push(d) };
        if (acronym == 'ACM') { ACMs.push(d) };
        if (acronym == 'NMAI') { NMAIs.push(d) };
        if (acronym == 'FBR') { FBRs.push(d) } else {
            let noti = `${acronym}--'has no match'`;

            missmatcharray.push(noti);
        }
    })
    console.log(NMNHs.length)
    console.log(SIAs.length)
    console.log(SILs.length)
    console.log(SAAMs.length)
    console.log(NPGs.length)
    console.log(NPMs.length)
    console.log(NMAAHCs.length)
    console.log(NMAHs.length)
    console.log(NZPs.length)
    console.log(NASMs.length)
    console.log(ACMs.length)
    console.log(NMAIs.length)
    console.log(FBRs.length)

}

function generateDivs(arr) {

    if (arr.length == 0) {
        console.log('this array is not ready to make divs')
    } else {
        makingDivs(arr)
    }
}

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

function makingDivs(arr) {
    let itemLength = rangeModi(arr.length);
    let gallAcronym = arr[0].filename.split('-')[0]
    let actualGalname = sourcetranslate(gallAcronym)
    $('.binGallery').append(`<div class='binofGal ${gallAcronym}'>
    <div class='picturepart'>
    <img src='./img/binlid.png' style='width:${itemLength}px' class='binlidimgs ${gallAcronym}img'>
    <img src='./img/binbody.png' style='width:${itemLength}px' class='binbodyimgs'>
    </div>
    <div class='bindescription'>${actualGalname}</div>
    </div>`)
}

function rangeModi(value) {
    if (value > 500) {
        return 200
    } else if (value > 300 && value <= 500) {
        return 150;
    } else if (value > 100 && value <= 300) {
        return 100
    } else {
        return 50
    }
}

function openLid(className) {


    let tl = gsap.timeline()

    tl.to(`.${selectedBin}`, { x: 0, rotate: 0, duration: 1 })
    console.log(selectedBin);


    tl.to(`.${className}`, { x: 50, rotate: 30, duration: 1 })
    console.log(selectedBin);


    selectedBin = className
}

function showInside(target) {

    // 이미 켜져있으면 끄고, 꺼져있으면 생성하라
    if ($('.popGallery').css('display') == 'none') {
        $('.popGallery').css('display', 'block')
        $('.binGallery').css('opacity', 0.4).css('filter', 'blur(1px)')
        $('.p5Canvas').remove()
    } else {
        $('.p5Canvas').remove()
        $('.binGallery').css('opacity', 0.4).css('filter', 'blur(1px)')
        let allBindata = [];
        totalSet.forEach((d) => {
            if (d[0]) {
                if (d[0].filename.split('-')[0] == target) {

                    allBindata = d;



                    let sketch = function(p) {
                        let binimgArray = [];
                        let showit = true;
                        p.setup = function() {
                            p.createCanvas(binCanvWidth, binCanvHeight);
                            p.background('rgba(155,155,155,0.1)');
                            let topPos = $('.binGallery').css('height')
                            $('.popGallery').css('top', `-600px`)
                            for (let i = 0; i < allBindata.length; i++) {
                                binimgArray.push({
                                        xPos: Math.random() * (0, binCanvWidth * 1 / 3),
                                        imgsource: p.loadImage(`./download/${allBindata[i].filename}`),
                                        yPos: Math.random() * (0, binCanvHeight * 1 / 2)
                                    }

                                )
                            }
                            console.log(binimgArray)
                        }

                        p.draw = function() {

                            for (let i = 0; i < allBindata.length; i++) {
                                p.image(binimgArray[i].imgsource, binimgArray[i].xPos + Math.random() * (-2, 2), binimgArray[i].yPos + Math.random() * (-2, 2),
                                    200, 200
                                )

                            }

                        }
                        p.mousePressed = function() {
                            $('.p5Canvas').remove()
                            $('.binGallery').css('opacity', 1).css('filter', 'blur(0px)')
                        }
                    };

                    let node = document.querySelector('.popGallery')
                    new p5(sketch, node);


                }
            }
        })

    }
    // arr[0].filename.split('-')[0] => gallery name과 일치하는지 보면되는군

    // 뒤에 세글자를 지우는 방법 
    /*
    let classname='soonkimgs';

    const editedText = classname.slice(0, -4) //'abcde';

    console.log(editedText)
    */

}

function fadeInbins() {

    let myTimeline = gsap.timeline();

    myTimeline.staggerTo(".binofGal", 1, { opacity: 1 }, 0.4);


}