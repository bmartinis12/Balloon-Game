/* Game Variables */

let stop = false;
let count = 0;
let total = 100;
let screenHeight;
let screenWidth;
let gameScreen;
let startMenu;
let balloon;
let scoreText;
let startMenuMoveInterval;
let currentBallon = 0;
let speed = 1;
let width = 100;
let height = 200;
let lPopup;
let finalScore;
let wPopup;
let winScore;

window.addEventListener('load', function() {
    /* Get HTML Elements as variables */

    gameScreen = document.querySelector('.wrapper')
    let start = document.getElementById("start");
    startMenu = document.querySelector(".start-menu")
    let score = document.querySelector(".counter-block")
    scoreText = document.getElementById('score');
    lPopup = document.querySelector('#lossScreen');
    wPopup = document.querySelector('#winScreen');
    finalScore = document.querySelector('.final-score');
    let again = document.querySelector('.again');
    let home = document.querySelector('.home');
    let replay = document.querySelector('.replay');
    let back = document.querySelector('.back');
    winScore = document.querySelector('.win-score');


    /* Game calculations */

    screenWidth = document.body.clientWidth;
    screenHeight = document.body.clientHeight;

    window.addEventListener('resize', function(){
        screenWidth = document.body.clientWidth;
        screenHeight = document.body.clientHeight;
    });

    let startMenuInterval= setInterval(startMenuBalloons, 500);

    /* How to play popup screen */

    let infoButton = document.getElementById('info-button');
    let info = document.getElementById('info');
    let infoExit = document.getElementById('exit-info');

    infoButton.addEventListener('click', function() {
        info.style.display = 'block';
    });

    infoExit.addEventListener('click', function() {
        info.style.display = 'none';
    });

     /* customization popup screen */

     let customizeButton = document.getElementById('customize-button');
     let customize = document.getElementById('customize');
     let customizeExit = document.getElementById('exit-customize');
     let goal = document.getElementById('goal');
     let speedValue = document.getElementById('speed');
     let balloonHeight = document.getElementById('balloon-height');
     let balloonWidth = document.getElementById('balloon-width');
 
     customizeButton.addEventListener('click', function() {
        customize.style.display = 'block';
     });
 
     customizeExit.addEventListener('click', function() {
        customize.style.display = 'none';
        total = Number(goal.value);
        speed = (speedValue.value / 10)* (-1);
        height = (balloonHeight.value/10) * 200;
        width = (balloonWidth.value/10) * 100;
     });

    /* Start game */

    start.addEventListener('click', function(){
        startMenu.style.display = 'none';
        score.style.display = 'block';
        clearInterval(startMenuMoveInterval);
        scoreText.textContent = `You popped ${count} / ${total} ballons!`
    });

    /* Add balloons */

    start.addEventListener('click', function(){
        startGame();
        document.querySelector('.bg-music').play();
    });

    /* Pop balloon */

    document.addEventListener('click', function(event){
        if(event.target.classList.contains('balloon')){
            deleteBalloon(event.target);
        }
    });

    /* Press replay */

    again.addEventListener('click', function(){
        reset();
    });

    replay.addEventListener('click', function(){
        reset();
    });

    /* Press home */
    home.addEventListener('click', function(){
        lPopup.style.display = 'none';
        startMenu.style.display = 'block';
        score.style.display = 'none';
    });

    back.addEventListener('click', function(){
        wPopup.style.display = 'none';
        startMenu.style.display = 'block';
        score.style.display = 'none';
    });
});

/* Start Game */

function startGame() {
    let timeout = 0
    let ballonInterval = setInterval(function() {
        timeout = Math.floor(Math.random() * 600 - 100);
        if(stop == false && count !== total){
            createBalloons();
        } else if (count == total) {
            console.log('win')
            winScreen()
            clearInterval(ballonInterval);
        } else if(stop == true && count != total) {
            lossScreen()
            clearInterval(ballonInterval);
        }
    }, 800 + timeout);
}

/* Create Balloons */

function createBalloons(){
    if(stop == false){
        let xCord = (Math.random() * (screenWidth - 250)) + width;
        let balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.classList.add(color());
        balloon.style.width = `${width}px`;
        balloon.style.height = `${height}px`;
        balloon.style.left = `${xCord}px`;
        balloon.dataset.number = currentBallon;
	    currentBallon++;

        gameScreen.appendChild(balloon);
        move(balloon, screenHeight);
    }
}


/* balloon color function */

function color(){
    let random = Math.floor(Math.random() * 5);
    if(random == 0){
        return 'blue';
    } else if(random == 1) {
        return 'fiolet';
    } else if(random == 2) {
        return 'green';
    } else if(random == 3) {
        return 'red';
    } else {
        return 'yellow';
    }
}


/* ballon move function */

function move(element, distance) {
    let random = Math.floor(Math.random() * 6 - 3);
	let interval = setInterval(moveAFrame, (12 - Math.floor(count / 10) + random) * speed);

    let pos = 0;
    let destination = pos - (distance + height)
    function moveAFrame() {
        if (pos==destination && (document.querySelector('[data-number="'+element.dataset.number+'"]') !== null)) {
            clearInterval(interval);
            stop = true;
            element.remove();
        } else {
                pos--;
                element.style.top = (screenHeight + pos) + "px";
        }
    }
}

/* Delete ballon function */

function deleteBalloon(element) {
    element.remove();
    if(count != 100){
        count++;
    }
    updateScore();
    popSound();
}

/* update score function */

function updateScore(){
    scoreText.textContent = `You popped ${count} / ${total} ballons!`
}

/* pop sound function */

function popSound(){
	let audio = document.createElement('audio');
	audio.src = '../sounds/pop.mp3';
	audio.play();
}

/* reset game function */

function reset(){
    let forRemoving = document.querySelectorAll('.balloon');
	for(let i = 0; i < forRemoving.length; i++){
		forRemoving[i].remove();
	}
    count = 0;
    stop = false;
    updateScore();
    lPopup.style.display = 'none';
    wPopup.style.display = 'none';
    startGame();
}

/* Start-menu backgorund */

function startMenuBalloons(){
        let xCord = (Math.random() * (screenWidth - 250)) + width;
        let startMenuBalloon = document.createElement('div');
        startMenuBalloon.classList.add('balloonStart');
        startMenuBalloon.classList.add(color());
        startMenuBalloon.style.left = `${xCord}px`
        startMenu.appendChild(startMenuBalloon);
        startMenuMove(startMenuBalloon, screenHeight);
}

function startMenuMove(element, distance) {
    let random = Math.floor(Math.random() * 6 - 3);
	let startMenuMoveInterval = setInterval(moveAFrame, 12 - Math.floor(count / 10) + random);

    let pos = 0;
    let destination = pos - (distance+200)
    function moveAFrame() {
        if (pos==destination) {
            element.remove();
        } else {
                pos--;
                element.style.top = (screenHeight + pos) + "px";
        }
    }
}

/* Losing scren function */

function lossScreen(){
    lPopup.style.display = 'flex';
    finalScore.textContent = `You popped ${count} ballons.`;
}

/* Win Screen function */

function winScreen(){
    winScore.textContent = `You popped ${count} ballons.`;
    wPopup.style.display = 'flex';
}