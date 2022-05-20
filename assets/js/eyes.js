const balls = document.getElementsByClassName('ball');
const rtop = document.getElementById('area_frame').offsetTop;
const rleft = document.getElementById('area_frame').offsetLeft;
const height = document.getElementById('video_frame').offsetHeight;
const width = document.getElementById('video_frame').offsetWidth;
// const height = window.innerHeight;
// const width = window.innerWidth;

document.onmousemove = (event) => {
    const x = Math.min(...[(event.clientX * 100) / width, 100]) + '%'; 
    const y = Math.min(...[(event.clientY * 100) / height, 100]) + '%';
    // console.log('X: '+ event.clientX + '(L:' + rleft + ', W:' + (rleft+width) + ')');
    // console.log('Y: '+ event.clientY + '(T:' + rtop + ', H:' + (rtop+height) + ')');
    
    for (let i=0; i<balls.length; i++) {
        balls[i].style.left = x;
        balls[i].style.top = y;
        balls[i].transform = 'translate(-' + x + ',-' + y + ')';
    }
};

// JU added:
var slider = document.querySelector('#sizeRange') // getElementById("slidecontainer");
var leye = document.getElementById('leye');
var reye = document.getElementById('reye');
slider.addEventListener('input', e => {
    leye.style.width = e.target.value/4 + '%';    
    reye.style.width = e.target.value/4 + '%';
    for (i=0; i<balls.length; i++) {
        balls[i].style.width = e.target.value/2 + '%';
        balls[i].style.height = e.target.value + '%';
    } 
})
// Definimos las constantes que vamos a utilizar
const videoFrame = document.getElementById('video_frame');
const canvasFrame = document.getElementById('canvas_frame');
const snapFrame = document.getElementById("snap_frame");
const errorMsgElement = document.querySelector('span#errorMsg');

// Definimos tamaño del video y si queremos audio o no
const constraints = {
    audio: true,
    video: {
        width: 720, height: 405
    }
};

// Comprobamos acceso a la Webcam
async function start_cam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    } catch (e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    }
}

// En caso de que el acceso sea correcto, cargamos la webcam
async function handleSuccess(stream) {
    window.stream = stream;
    videoFrame.srcObject = stream;
}

// Enable stop button

// Iniciamos JS
// init();

// Hacemos captura de pantalla al hacer click
// var context = canvasFrame.getContext('2d');
// snapFrame.addEventListener("click", function() {
//     context.drawImage(videoFrame, 0, 0, 320, 140);
// });