window.scroll({
    behavior: 'smooth'
});
/*tslint:disabled*/
let tl = gsap.timeline();

newimg = `./img/trash.png`

let heightofCanvas = 1500;
let widthofCanvas = 1900;

$('.floatingImg').css('height', `${heightofCanvas}px`);
$('.floatingImg').css('top', `${heightofCanvas}px`)
$('.beforeFloating').css('top', `${heightofCanvas}+10px`)
    // let lastelm = $('.fImgs').last().position().top
    // $('.canva').css('top',`${lastelm+heightofCanvas}px`)

// $('.canva').css('width',`${widthofCanvas}px`)
// $('.canva').css('height',`${heightofCanvas}px`)

// 아래의 프로토 타입은, mismatch가 누가있는지를 확인하기 위해 일시적으로 사용함 

Array.prototype.unique = function() {
    return Array.from(new Set(this));
}




let mEntireArray = [];
let missmatcharray = [];
d3.json('./finalminArray600.json').then(function(d) {
    gsap.registerPlugin(ScrollTrigger);
    mEntireArray = d;
    // console.log(mEntireArray)

    // 아래의 모든것을 이 안에 넣어야 한다 결국엔
    let galleries = ['NMNH', 'SIA', 'SIL', 'SAAM', 'NPG', 'NPM', 'NMAAHC', 'NMAH', 'NZP', 'NASM', 'ACM', 'NMAI', 'FBR']
    let trashwords = [
        'debris', 'junk', 'remains', 'rubbish', 'trash', 'leftovers', 'leavings', 'scrapes', 'dregs', 'residue'
    ];
    // 개별 arrays for each gallery for statistics
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


    tl.to('.ticket', {
        repeat: -1,
        rotation: -1,
        duraiton: 3,
        ease: "sine.out"
    })

    d3.select('#toMuseum').on('click', entering)

    function entering() {
        d3.select('.wallpaper').transition().duration(1000).style('width', '0px')
        d3.select('body').style('overflow-y', 'auto')
        d3.select('.header').transition().duration(1000).style('opacity', 1)
        tl.kill()
        d3.select('#defaultCanvas0').transition().duration(1500).style('top', '0px')
        d3.select('.titleMsg').transition().duration(1500).style('opacity', 0)
        d3.select('.infotab').transition().duration(1500).style('opacity', 0)
        d3.select('.ticket').transition().duration(1500).style('opacity', 0)
        d3.select('.arrow').transition().duration(1500).style('opacity', 0)
        d3.select('.guide').transition().duration(1500).style('opacity', 0)


        setTimeout(moverDef, 1000);

    }



    function moverDef() {

        d3.select('.definitiontab').transition().duration(500).style('display', 'grid').style('left', '50px').style('top', '200px')
        tl.fromTo('.definitiontab', 0.2, { left: 0, opacity: 1 }, { left: 250, opacity: 1 });
        d3.select('.definitiontab').style('position', 'fixed')
        floatingGen();
        gsapSetup();

        gsap.to('.definitiontab', {
            scrollTrigger: '.floatingImg',
            x: -1000,
            duration: 1
        })

    }

    // scrolltrigger를 통해서 '.sourceview'에 오면 img div를 생성하는 함수를 실행해야함
    // galleryGen();
    // floatingGen();
    // // layoutGalleries();
    // gsapSetup();

    // 더이상 galleryGen 자체가 필요없음 

    // function galleryGen(){

    //     // img를 받아줄 container를 생성
    //     // 더이상 필요없음
    //     // for (let k=0;k<45;k++){
    //     //     $('.galleryview').append(`<div class='gImgs'></div>`)
    //     // }

    //     // 더이상 필요없음
    //     // let length=$('.gImgs').length;

    //     let dataarray=mEntireArray;

    //     for(let i=0;i<length;i++){
    //     let imgname=dataarray[i].filename;
    //     let imgkeyword=dataarray[i].keyword;
    //     let musemuseumacr=dataarray[i].filename.split('-')[0].trim()
    //     let museumname=sourcetranslate(musemuseumacr)


    //     $( `.gImgs:nth-child(${i+1})` ).append(`<img src='./download/${imgname}' class='imgself' 
    //         >
    //          <p class='desc' style='opacity:1'>${imgkeyword}</p>
    //          <p class='desc' style='opacity:0.3'>${museumname}</p>
    //     `);

    //     }   
    // }

    function floatingGen() {
        let sections = gsap.utils.toArray(".fImgs");
        let length = $('.fImgs').length;
        let dataarray = mEntireArray;


        // floatImg 에 도착하면 날라다니는 floating images가 만들어지게끔하는것

        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".floatingImg",
                //   onEnter:()=>{$('.statistics').css('opacity',0.4).css('filter','blur(1px)')},
                // To do!!!
                //floatingimg가 나오면 뒤에있는애들이 흐려지는 효과 뒤에있는 canvas가 흐려져야겠군
                //그러려면 main defaultCanvas0외에 추가적인 canvas가 그 밑에 새로생겨야겠군

                pin: true,
                scrub: 1,
                //   snap: 1 / (sections.length - 1),
                // base vertical scrolling on how wide the container is so it feels more natural.
                end: () => "+=" + document.querySelector(".floatingImg").offsetWidth
            }
        });




        for (let i = 0; i < length; i++) {
            let imgname = dataarray[i].filename;
            let imgkeyword = dataarray[i].keyword;
            let colors = ['#020AC1', '#FF1F7E', '#FF7600', '#00FFC4', '#020AC1'];
            let rots = ['15deg', '-20deg', '-30deg', '30deg', '-35deg']

            $(`.fImgs:nth-child(${i+1})`).append(`<img src='./download/${imgname}' class='fimg'
        style='box-shadow:10px 10px 5px ${colors[i]};transform:rotate(${rots[i]})'>
        <p class='fImgTag'>${imgkeyword}</p>
        `);

        }
    }

    //더이상 layoutGalleries도 필요없음
    // function layoutGalleries(){

    //     let actualnames=[];
    //     galleries.forEach((d)=>{actualnames.push(sourcetranslate(d))})

    //     // layout the gallery names
    //     let gallerylength=galleries.length;
    //     for(let i=0; i<gallerylength;i++){
    //         $('.museumlist').append(`<div class='galleries'>
    //         <p class='statsDesc'>${actualnames[i]}</p>
    //         </div>`)

    //         $('.mainpart').append(`<div class='galleries mainonly ${galleries[i]}'>
    //         </div>`)
    //     }

    //     // layout imgs to the position

    //         eachGalArray();
    //         // fillGallery(NMNHs);fillGallery(SIAs);fillGallery(SILs);fillGallery(SAAMs)
    //         // fillGallery(NPGs);fillGallery(NPMs);fillGallery(NMAAHCs);fillGallery(NMAHs)
    //         // fillGallery(NZPs);fillGallery(NASMs);fillGallery(ACMs);
    //         // fillGallery(NMAIs);fillGallery(FBRs);

    //         // console.log('unique elements are ',missmatcharray.unique())



    // }


    // Stats 부분을 보여주는 함수

    function showFills() {
        let myTl = gsap.timeline();
        myTl.to('.definitiontab', { x: -500, opacity: 0, duration: 1 })
            // $('#defaultCanvas0').css('top','3000px')

    }

    // Gallery array를 만드는 함수
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

    // function fillGallery(targetArray){
    //         // First, unitsize for each 쓰레기더미를 결정한다
    //         let unitSize;
    //         let UnitSize;
    //         let numOfUnit;
    //         let numOfunit;
    //         let targetLength=targetArray.length;
    //         if(targetArray[0]){
    //         let acronym=targetArray[0].filename.split('-')[0];


    //         if(targetLength>10000){
    //             UnitSize=10000;
    //             unitsize=100;

    //             // Sample Size expression, 만약에 length가 진짜 길면,
    //             // Unit이라는 10000단위짜리를 만들어서 붙인다
    //             numOfUnit=Math.round(targetLength / UnitSize);

    //             numOfunit= Math.round((targetLength-(numOfUnit*UnitSize)) / unitSize)

    //             fill(acronym,numOfunit,20)
    //             fill(acronym,numOfUnit,40)



    //         } else{
    //             UnitSize=0;
    //             unitsize=100;
    //             numOfUnit=0;
    //             numOfunit=Math.round(targetLength / unitsize);

    //             fill(acronym,numOfunit,20)
    //         }
    //         }
    //         console.log('nothing exists');

    //         }
    // 각각의 갤러리에 쓰레기 조각을 배치한다
    // function fill(acronym,num,size){

    //     for(k=0;k<num;k++){    
    //     $(`.${acronym}`).append(`<img class='statsImg' style='width:${size}px'src='${newimg}'></img>`)
    //     }
    //         // Unit과 unit이 각각 몇개필요할 지 정한다
    // }

    function gsapSetup() {

        // Floating imgs scroll trigger
        // gsap.to('.horizontalsection',{scrollTrigger:{
        //     trigger:'.canvas',
        //     start:'top 90%',
        //     onEnter: showFills,
        //     end:'bottom -=3500px',
        //     pin:'.canvasholder',
        //     markers:true} 
        // });

        // Galleryview 꺼버림

        // gsap.to('.galleryview',{scrollTrigger:{
        //     trigger:'.galleryview',
        //     onEnter: ()=>{$('.fImgs').css('display','none')},
        //     markers:false} 
        // });


        gsap.to('.canva', {
            scrollTrigger: {
                trigger: '.canva',
                onEnter: () => { sortKeyword() },
                markers: true
            }
        });

        gsap.to('.definitiontab', {
            scrollTrigger: '.definitiontrigger',
            opacity: 0,
            x: -600,
            duration: 2
        });

        gsap.to('#defaultCanvas0', {
            scrollTrigger: '.introtrigger',
            opacity: 0.4,
            duration: 1
        });

        gsap.to('.intromessage', {
            scrollTrigger: '.introtrigger',
            opacity: 1,
            x: 600,
            duration: 2
        });

        var Cont = { val: 0 },
            NewVal = 195037;

        gsap.to('#counter', {
            scrollTrigger: '.introtrigger',
            opacity: 1,
            duration: 3,
            onEnter: () => {
                TweenLite.to(Cont, 10, {
                    val: NewVal,
                    roundProps: "val",
                    onUpdate: function() {
                        document.getElementById("counter").innerHTML = `${Cont.val.toLocaleString()} garbages`
                    }
                });
            },

        })





        // scrollTrigger from to를 만들어야하는데
        // worviewTitle이 포지션도 없고, 
        // 디스플레이도 none이었다

        gsap
            .timeline({
                scrollTrigger: {
                    trigger: '.floatingImg',
                    scrub: true,
                    onLeave: () => {
                        $('.headband').css('opacity', 0);
                        $('.bottomband').css('opacity', 0)
                    }
                },
            })
            .fromTo(
                '.wordviewTitle', {
                    display: 'block',
                    x: `${widthofCanvas*-1}`,
                    opacity: 0,
                    y: `${heightofCanvas*2}`,
                    zIndex: 12
                },

                {
                    x: `${widthofCanvas*1/10}`,
                    y: `${heightofCanvas*2}`,
                    ease: 'none',
                    opacity: 1,
                },
            )


        gsap
            .timeline({
                scrollTrigger: {
                    trigger: '.beforeFloating',
                },
            })
            .to('.headband', {
                width: '100%',
                opacity: 1,
                duration: 1,
                onEnter: () => {
                    $('.intromessage').remove()
                    $('#counter').remove()
                    $('#defaultCanvas0').css('opacity', 0)
                }
            }).to('.bottomband', {
                width: '100%',
                duration: 1
            })

        // Recalling the second animation to the bottom
        gsap.timeline({
                scrollTrigger: {
                    trigger: '.canva',
                    scrub: false
                }
            })
            .to('.floatingImg', {
                opacity: 0,
                display: 'none',
                oneEnter: () => {
                    d3.select('.pin-spacer').transition()
                        .duration(500).style('opacity', 0)
                        .on('end', () => { $('.pin-spacer').remove() })
                }
            })
            .to('#defaultCanvas0', {
                opacity: 1,
                duration: 1,
                y: `${$('.canva').position().top-1/2*heightofCanvas}`,
                onEnter: () => {
                    console.log('i just entered to the second phase');
                    $('#defaultCanvas').css('height', `${heightofCanvas*1/2}px`);
                }
            })








    }

})