var canvas = bricksCanvas;
var ctx = canvas.getContext("2d");
var cvsW = canvas.width, cvsH = canvas.height;

var bX = cvsW/2, bY = cvsH-30, bColor ="#f44280", bRadius = 10;//球的位置/颜色/直径
var mX = 2, mY = 2;//球的移动速度（每一帧移动的距离）

var pdW = 100,pdH = 20;  //移动板宽高
var pdX = (cvsW-pdW)/2, pdY = cvsH-pdH, pdColor = "#00f";  //移动板初始位置/颜色

//初始化砖块
var bkR = 5, bkC = 6, bkW = 70, bkH = 20, 
    bkPadding = 6, bkOffsetTop = 35, bkOffsetLeft = 15;
var bkColor = "#8f63cc";
var bks = [];
    for(r=0;r<bkR;r++){
        bks[r] = [];
        for(c=0;c<bkC;c++){
            bks[r][c] = {
                status:1,    //砖块状态，1表示可见，0表示消失
                x:c*(bkW+bkPadding)+bkOffsetLeft,
                y:r*(bkH+bkPadding)+bkOffsetTop
            };
        }
    }

function drawBall(){
    ctx.beginPath();
    ctx.arc(bX,bY,bRadius,0,2*Math.PI);
    ctx.fillStyle = bColor;
    ctx.fill();
    ctx.closePath();  
}
//画移动平板
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(pdX,pdY,pdW,pdH);
    ctx.fillStyle = pdColor;
    ctx.fill();
    ctx.closePath();
}
//画砖块
function drawBricks(){
    ctx.fillStyle = bkColor;
    for(r=0;r<bkR;r++){
        for(c=0;c<bkC;c++){
            if(bks[r][c].status==1){
                ctx.beginPath();
                ctx.rect(bks[r][c].x,bks[r][c].y,bkW,bkH);
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

(function(){
    drawBall();
    drawPaddle();
    drawBricks();
}())