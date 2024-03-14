let canvas;
let world;
let ctx;
let keyboard = new Keyboard();
let startscreenIMG = new Backgroundobject('img/9_intro_outro_screens/start/startscreen_1.png', 0);
let messageAppeared = false;

/**
 * Loads the world and starts the touch 
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    initialicetouch();
}

/**
 * function for full Screen 
 */
function fullScreen() {
    canvas.requestFullscreen();
}

/**
 * Starts the touch eventlistener 
 */
function initialicetouch() {
    document.getElementById('movingLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('movingLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });


    document.getElementById('movingright').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });


    document.getElementById('movingright').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });


    document.getElementById('throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });


    document.getElementById('jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });


    document.getElementById('jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('start').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.ENTER = true;
        firststart = false;
    });
}

/**
 * Eventlistener for pressed key 
 */
document.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
        keyboard.ENTER = true;
        firststart = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true
    }
    if (e.keyCode == 38) {
        keyboard.UP = true
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true
    }
    if (e.keyCode == 68) {
        keyboard.D = true
    }
});

/**
 * Eventlistener for letting key go  
 */
document.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false
    }
    if (e.keyCode == 38) {
        keyboard.UP = false
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false
    }
    if (e.keyCode == 68) {
        keyboard.D = false
    }
});

screenRotation();

/**
 * checks if the screen needs to be rotated 
 */
function screenRotation() {
    setInterval(() => {
        if (window.innerHeight > window.innerWidth && !messageAppeared) {
            document.getElementById('screen-rotation-container').innerHTML = /*html*/`
          <div class="rotate-bg">
            <img src="img/icons/rotate.svg" alt="rotate your phone" class="rotate-phone">
          </div>
        `
            messageAppeared = true;
        } else if (window.innerHeight < window.innerWidth) {
            messageAppeared = false;
            document.getElementById('screen-rotation-container').innerHTML = '';
        }
    }, 1000);
}