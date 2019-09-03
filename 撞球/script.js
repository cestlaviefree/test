var canvas = document.getElementById("bricksCanvas");
var ctx = canvas.getContext("2d"); //创建画布上的绘画环境
var stop_status = true; // 停止键是否有效
var stop;
var canvas_status = true;

var ballRadius = 10;
var ballColor = "#f44280";
//球的位置
var x = canvas.width/2;
var y = canvas.height-25;
//球移动速度
var dx = -2, dy = -2;

var paddleHeight = 15;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;  //托盘位置
var rightPressed = false;
var leftPressed = false;
//bricks 砖块
var brickRowCount = 5, brickColumnCount = 6, brickWidth = 70, brickHeight = 20, 
    brickPadding = 6, brickOffsetTop = 35, brickOffsetLeft = 15;

var score = 0;
var lives = 3;

//初始化二维数组，存储砖块信息 status：1表示砖块显示  0表示砖块消失
var bricks = [];
for(c=0;c<brickColumnCount;c++){
    bricks[c] = [];
    for(r=0;r<brickRowCount;r++){
        bricks[c][r]={x:0,y:0,status:1};
    }
}
//画球
function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2); //画球，底部居中
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}
//画托盘
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle = "#00f";
    ctx.fill();
    ctx.closePath();
}
//划转快
function drawBricks(){
    for(c=0;c<brickColumnCount;c++){
        for(r=0;r<brickRowCount;r++){
            if(bricks[c][r].status == 1){
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX,brickY,brickWidth,brickHeight);
                ctx.fillStyle = "#8f63cc";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
//分数
function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#f44280";
    ctx.fillText("Score:"+score,15,20);
}
//生命值
function drawLives(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#f44280";
    ctx.fillText("Lives:"+lives,canvas.width-70,20);
}
//Game over
function drawGO(){
    ctx.font = "30px Arial";
    ctx.fillStyle = "#f44280";
    ctx.fillText("GAME OVER",150,200);
}
//砖块消失 小球碰撞砖块的条件
function collisionDetection(){
    for(c=0;c<brickColumnCount;c++){
        for(r=0;r<brickRowCount;r++){
            var b = bricks[c][r];
            if(b.status == 1){
                if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickColumnCount*brickRowCount){
                        document.location.reload();
                        x = canvas.width/2;
                        y = canvas.height-30;
                        dx = 3;
                        dy = -3;
                        paddleX = (canvas.width-paddleWidth)/2;
                    }
                }
            }
        }
    }
}
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    drawLives();
    collisionDetection();
    if(x+dx >canvas.width-ballRadius || x+dx < ballRadius){
        dx = -dx;
    }
    if(y+dy < ballRadius){
        dy = -dy;
    }
    else if(y+dy >canvas.height-(ballRadius+paddleHeight)){
        if(x>paddleX && x<paddleX+paddleWidth){
            dy = -dy;
        }
        else{
            lives--;
            if(lives==0){
                drawGO();
                $(".start").attr("flage","flage");
                lives=4;
                score=0;
                stop_status=false;
                return;
            }
            else{
                x=canvas.width/2;
                y=canvas.height-30;
                dx=3;
                dy=-3;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    if(rightPressed && paddleX<canvas.width-paddleWidth){
        paddleX+=5;
    }
    else if(leftPressed&&paddleX>0){
        paddleX-=5;
    }
    x+=dx;
    y+=dy;
    stop = requestAnimationFrame(draw);
}
function mouseMoveHandler(e){
    var relativeX = e.clientX-canvas.offsetLeft;
    if(relativeX>0&&relativeX<canvas.width){
        paddleX = relativeX-paddleWidth/2;
    }
}
function keyDownHandler(e){
    if(e.keyCode == 39){
        rightPressed =true;
    }
    else if(e.keyCode == 37){
        leftPressed=true;
    }
    else if(e.keyCode == 32){
        if(stop_status){
            window.cancelAnimationFrame(stop);
            canvas_status=false;
        }
        else{
            stop=requestAnimationFrame(draw);
            canvas_status=true;
        }
    }
}
function keyUpHandler(e){
    if(e.keyCode==39){
        rightPressed=false;
    }else if(e.keyCode==37){
        leftPressed=false;
    }
}


(function(){
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    drawLives();
    $(".start").click(function(){
        stop_status = true;
        if($(".start").attr("flage")=="flage"){
            for(c=0;c<brickColumnCount;c++){
                for(r=0;r<brickRowCount;r++){
                    bricks[c][r].status=1;
                }
            }
            $(".start").attr("flage","");
            draw();
            document.addEventListener("mousemove",mouseMoveHandler,false);
            document.addEventListener("keydown",keyDownHandler,false);
            document.addEventListener("keyup",keyUpHandler,false);
        }
    })
    
}())
