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
imgSize=150;
defaultMoving=true;
downMoving=false;
yS=2; //y가 급강하 하는 속도
xS=1; //x가 자리잡아가는속도
xM=100; //xMargin 왼쪽

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

constructor(xPos,yPos,img,category,keyword,gallery,actualImg){
    this.xPos=xPos;
    this.yPos=yPos;
    this.img=loadImage(img)
    this.category=category;
    this.keyword=keyword;
    this.gallery=gallery;
    this.actualImg=loadImage(actualImg);
    // constructor에 function으로 넣어도되나?
}

moving(){
    if(this.defaultMoving){
    this.xPos=this.xPos+random(-1,1);
    this.yPos=this.yPos+random(-1,1);
    } else if(this.downMoving){

        // x&y 포지션을 바닥으로 끌어내리는 무브먼트
        if(this.xPos>this.xM && this.xPos<width){
            this.xPos=this.xPos
        } 
         if(this.xPos>width){
            this.xPos=this.xPos-this.xS
        } 
         if(this.xPos<this.xM){
            this.xPos=this.xPos+this.xS;
        } else{this.xPos=this.xPos}

        if(this.yPos>0 && this.yPos<height){
            this.yPos=this.yPos+yS;
        } 
         if(this.yPos>height){
            this.yPos=this.yPos-yS;
        } 
         if(this.yPos<0){
            this.yPos=this.yPos+yS
        } else{this.yPos=height};
    }

}

render(){

    if(this.visible && this.ifDefault){
    image(this.img,this.xPos,this.yPos,this.tWidth,this.tHeight)
    }

    else if(this.visible && this.ifActualImg){
        this.imgSize=150;
        image(this.actualImg,this.xPos,this.yPos,this.imgSize,this.this.imgSize)
        textSize(32);
        text(this.keyword, this.xM/2, 200);
        fill('#707070');
    }
    else if(this.visible && this.ifRect){
        rect(this.xPos, this.yPos,this.imgSize,this.imgSize)
        push()
        fill('rgba(0, 0, 0, 0.273)')
        pop()

    }
    else if(this.visible && this.downMoving){
        if(this.imgSize>20){
            this.imgSize=this.imgSize-5;
        }
        rect(this.xPos, this.yPos,this.imgSize,this.imgSize)
        push()
        fill('rgba(0, 0, 0, 0.173)')
        pop()
    }

}


// image source를 받고
// random하게 박은 후
// 계속 날라다니게 하는것?
// setinterval로 만들어서 하는게 쉬울 것 같다는 생각
// p5js로하면 또 canvas를 만들어야되니까?
// 하지만 그냥 날라다닌다기보다는 greensock scroll 움직임에 반응해서 날라다니게 해볼까?
}

