// Define initial constants and "talk" with the DOM:
const balls = document.getElementsByClassName('ball');
const area_frame = document.getElementById('area_frame');
const area_rect = area_frame.getBoundingClientRect();

const height = document.getElementById('video_frame').clientHeight;
const width = document.getElementById('video_frame').clientWidth;
const rtop = area_rect.top;
const rleft = area_rect.left;

// DEBUG: output the position and size of the video area
console.log('Rtop: '+rtop);
console.log('Rleft: '+rleft);
console.log('Height: '+height);
console.log('Width: '+width);

// Takes the mouse movement and convert it to position, so the pupils appears to follow the mouse
document.onmousemove = (event) => {
    let xpos = event.clientX - rleft;
    let ypos = event.clientY - rtop;
    
    let x = (100 * Math.min(...[Math.max(...[0, xpos]), width]) / width) ;
    let y = (100 * Math.min(...[Math.max(...[0, ypos]), height]) / height) - 50;

    console.log('X: '+ x + '(L:' + (x*width/100) + ', W:' + (rleft+width) + ')');
    console.log('Y: '+ y + '(T:' + (y*height/100) + ', H:' + (rtop+height) + ')');
    
    for (let i=0; i<balls.length; i++) {
        balls[i].style.left = (2*x)  + 'px';
        balls[i].style.top = (y) + 'px';
        balls[i].transform = 'translate(-' + x + ',-' + y + ')';
    }
};

// Slider to resize the eyes:
var slider = document.querySelector('#sizeRange');
var leye = document.getElementById('leye');
var reye = document.getElementById('reye');
// The actual ratio to resize is taken from the initial width defined in the styles.css
slider.addEventListener('input', e => {
    leye.style.width = (e.target.value * 40 / 100) + '%';    
    reye.style.width = (e.target.value * 40 / 100) + '%';
    for (i=0; i<balls.length; i++) {
        balls[i].style.width = (e.target.value * 30 / 100) + '%';
        balls[i].style.height = e.target.value + '%';
    } 
})

// Get the eye colours from the colour picker
var eyeColour = document.querySelector('#colorpicker');
eyeColour.addEventListener('input', e => {
    console.log(e.target.value);
    for (i=0; i<balls.length; i++) {
        balls[i].style.background = e.target.value;
    }
});

// Focus on the video area
const videoFrame = document.getElementById('video_frame');
const canvasFrame = document.getElementById('canvas_frame');
const snapFrame = document.getElementById("snap_frame");
const errorMsgElement = document.querySelector('span#errorMsg');
// Video size
const constraints = {
    video: {
        width: 720
    }
};

// Check webcam access 
// The following sections were modified from:
// https://www.raulprietofernandez.net/blog/programacion/como-acceder-a-la-webcam-con-html5-y-javascript
async function start_cam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    } catch (e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    }
}

// If webcam ok, then start streaming:
async function handleSuccess(stream) {
    window.stream = stream;
    videoFrame.srcObject = stream;
}

// Added a stop button to stop the video stream (and close the webcam)
async function stop_cam() {
    let tracks = window.stream.getTracks();
    tracks.forEach(function (track) {
        track.stop();
        track.srcObject = null;
    });
}
