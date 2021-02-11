// trashclass가 하는일은...
// random(-1,1) this is how random function works


class Trashes{

tHeight=30;
tWidth=30;
ifDefault=true;
visible=true;
ifTitle=false;
ifActualImg=false;
ifRect=false;
ifSmall=false;
ifGallery=false;
imgSize=100;
defaultMoving=true;
downMoving=false;
wordView=false;
strong='rgba(83, 83, 83, 0.872)'
light='rgba(83, 83, 83, 0.521)'
yS=4; //y가 급강하 하는 속도
xS=1; //x가 자리잡아가는속도
sS=1;
xM=100; //xMargin 왼쪽
yM=100;
smallSize=30;
numofElem;
tagX=random(this.xM,width)
tagY=random(this.yM,height-this.yM)


// if (this.keyword=='junk'){this.visible=true;}
// 이런 함수를 만들어야할 듯

// 혹은

// 전체 array에서 forEach((d)=>
// {d.keyword==해당키워드면 d.visible==true; else d.visible==false})
// 이런 함수를 돌려서 class object들의 visible을 꺼버려야함

// turnjunk=false;turnremains=false;turnrubbish=false;
// turntrash=false;turnleftovers=false;turnleavings=false;
// turnscrapes=false;turndregs=false;turnresidue=false;
// turndebris=false;
// 특정 조건이 안맞으면 visible 을 false로 바꿔서 꺼버리면 되겠구만 후후후

constructor(xPos,yPos,img,category,keyword,gallery,actualImg,title){
    this.xPos=xPos;
    this.yPos=yPos;
    this.img=loadImage(img)
    this.category=category;
    this.keyword=keyword;
    this.gallery=gallery;
    this.actImg=loadImage(actualImg);
    this.title=title
    // constructor에 function으로 넣어도되나?
}

moving(){
    if(this.defaultMoving){
    this.xPos=this.xPos+random(-1,1);
    this.yPos=this.yPos+random(-1,1);
    } 
    else if(this.defaultMoving==false && this.downMoving==true){
        
  


        if(this.yPos>height-this.yM){

            if(this.xPos>width*0.8){
                this.xPos=this.xPos-this.xS;
            } else if(this.xPos<this.xM*2){
                this.xPos=this.xPos+this.xS
            } else {this.xPos=this.xPos}
           
            this.yPos=this.yPos;


        } else if(this.yPos<height-this.yM){
            if(this.xPos>width*0.8){
                this.xPos=this.xPos-this.xS;
            } else if(this.xPos<this.xM*2){
                this.xPos=this.xPos+this.xS
            } else {this.xPos=this.xPos}


            this.yPos=this.yPos+this.yS;


        } 

    }else if(this.downMoving==false && this.wordView==true){
      this.tagX=this.tagX+random(-1,1);
      this.tagY=this.tagY+random(-1,1);
    }

}

render(){



    if(this.visible && this.ifDefault){
    image(this.img,this.xPos,this.yPos,this.tWidth,this.tHeight)
    }

    else if(this.visible && this.ifActualImg){
        // this.image=loadImage()
        this.imgSize=150;
        image(this.actImg,this.xPos,this.yPos,this.imgSize,this.imgSize)
        textSize(80);
        text(this.keyword, this.xM*1/2, height-this.yM);
        textFont('Helvetica')
        push()
        fill('#707070');
        pop();
    }
    else if(this.visible && this.ifRect){
        
        push()
        fill('rgba(0, 0, 0, 0.273)')
        noStroke()
        rect(this.xPos, this.yPos,this.imgSize,this.imgSize)
        pop()

 
        push()
        fill('#707070');
        textFont('Helvetica')
        textSize(80);
        text(this.keyword, this.xM*1/2, height-this.yM);
      
        pop();

    }
    else if(this.visible && this.downMoving){
        console.log('moving');
        push()
        noStroke()
        fill('rgb(100,0,0)')
        rect(this.xPos, this.yPos,this.imgSize,this.imgSize)
        pop();

        push()
        fill('#707070');
        textFont('Helvetica')
        textSize(80);
        text(this.keyword, this.xM*1/2, height-this.yM);
        pop();
    }else if(this.wordView){
    // Showing Keyword
        push()
        fill(this.strong);
        textFont('Helvetica')
        textSize(20);
        text(this.title,this.tagX,this.tagY);
        pop();
    // Showing tagCategory
        push()
        fill(this.light);
        textFont('Helvetica')
        textSize(10);
        text(this.category,this.tagX+10,this.tagY+10);
        pop();

    }

}

// showNumb(){

//     push()
//     fill('#707070');
//     textFont('Helvetica')
//     textSize(250);
//     text(this.numofElem, width*1/2, height*1/2);
//     pop();
// }


// image source를 받고
// random하게 박은 후
// 계속 날라다니게 하는것?
// setinterval로 만들어서 하는게 쉬울 것 같다는 생각
// p5js로하면 또 canvas를 만들어야되니까?
// 하지만 그냥 날라다닌다기보다는 greensock scroll 움직임에 반응해서 날라다니게 해볼까?
}

