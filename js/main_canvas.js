const H_audio1 = new Audio('/audio/hod/Hod battle1.mp3');
const H_audio2 = new Audio('/audio/hod/Hod battle2.mp3');
const H_audio3 = new Audio('/audio/hod/Hod battle 3.mp3');

const Y_audio1 = new Audio('/audio/yesod/Yesod battle1.mp3');
const Y_audio2 = new Audio('/audio/yesod/Yesod battle2.mp3');
const Y_audio3 = new Audio('/audio/yesod/Yesod battle 3.mp3');

const M_audio1 = new Audio('/audio/Malkuth/Malkuth battle1.mp3');
const M_audio2 = new Audio('/audio/Malkuth/Malkuth battle2.mp3');
const M_audio3 = new Audio('/audio/Malkuth/Malkuth battle 3.mp3');

const R_audio1 = new Audio('/audio/kether/Kether battle1.mp3');
const R_audio2 = new Audio('/audio/kether/Kether battle2.mp3');

let canvas, ctx, center_x, center_y, radius, bars, 
x_end, y_end, bar_height, bar_width, audio1, audio2, audio3, floor,
frequency_array;


function left_movement() {

}
function right_movement() {

}

























bars = 700;
bar_width = 1.5;
//========================================== 음악재생
function initPage(){//initpage = 페이지가 로드될 경우 실행 

audio = new Audio('/audio/kether/Kether battle1.mp3'); //음악 경로
context = new (window.AudioContext || window.webkitAudioContext)();
analyser = context.createAnalyser();


// audio.src = "/audio/hod/Hod battle1.mp3"; // 음악 파일 경로
source = context.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(context.destination);


frequency_array = new Uint8Array(analyser.frequencyBinCount);

audio.play(); //음악 재생
audio.loop = true; //음악 반복
audio.volume = 1; //음악 볼륨 절반
animationLooper(); //캔버스 호출
}
//========================================== 음악재생

//========================================== 캔버스
function animationLooper(){

//장치 크기로 설정
canvas = document.getElementById("renderer"); //html안에서 캔버스 찾기
canvas.width = window.innerWidth / 1.5; //창의 크기에 따라 가로 크기조절
canvas.height = window.innerHeight / 1.5; //창의 크기에 따라 세로 크기조절
ctx = canvas.getContext("2d");  //ctx = 캔버스

// 창의 중심을 찾아서 크기조절
center_x = canvas.width / 2; //캔버스의 크기 = 창 크기 / 2
center_y = canvas.height / 2;
radius = center_x / 3; // 원의 크기

// 배경스타일 지정
// var gradient = ctx.createLinearGradient(0,0,0,canvas.height);
// gradient.addColorStop(0,"skyblue");
// gradient.addColorStop(1,"#002A47");
// ctx.fillStyle = gradient;
// ctx.fillRect(0,0,canvas.width,canvas.height);

//원 그리기
ctx.beginPath();
ctx.arc(center_x,center_y,radius,0,2*Math.PI);

ctx.stroke(); // 그리기

analyser.getByteFrequencyData(frequency_array);
for(var i = 0; i < bars; i++){
    
    //원을 같은 부분으로 나눔
    rads = Math.PI * 2 / bars;
    
    bar_height = frequency_array[i]*0.5;
    
    // set coordinates 여긴 모름
    x = center_x + Math.cos(rads * i) * (radius);
y = center_y + Math.sin(rads * i) * (radius);
    x_end = center_x + Math.cos(rads * i)*(radius + bar_height);
    y_end = center_y + Math.sin(rads * i)*(radius + bar_height);
    
    //막대그리기, 막대그리는 함수 호출
    drawBar(x, y, x_end, y_end, bar_width,frequency_array[i]);

}
window.requestAnimationFrame(animationLooper);
}

// 막대그리기
function drawBar(x1, y1, x2, y2, width, frequency){

var lineColor = "rgb(" + frequency + ", " + frequency + ", " + frequency + ")";

ctx.strokeStyle = lineColor;
ctx.lineWidth = width;
ctx.beginPath();
ctx.moveTo(x1,y1);
ctx.lineTo(x2,y2);
ctx.stroke();
}

//========================================== 캔버스