const CELL_SIZE = 20;
// Soal no 1: Set canvas size menjadi 600
const CANVAS_SIZE = 500;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
// Soal no 2: Pengaturan Speed (semakin kecil semakin cepat) ubah dari 150 ke 120
let MOVE_INTERVAL = 150;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,
        life: 3,
        speed: MOVE_INTERVAL,
    }
}

//draw life di pojok kiri atas
/*
function initLife() {
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");

    var img = document.getElementById("nyawa");
    ctx.drawImage(img, 0, 0, CELL_SIZE, CELL_SIZE);
}
*/

let snake1 = initSnake("purple");
//let lifes = initLife();
//let snake2 = initSnake("blue");
// Soal no 6: add snake3
//let snake3 = initSnake("black");

// Soal no 4: make apples array
let apples = [{
    color: "red",
    position: initPosition(),
},
{
    color: "green",
    position: initPosition(),
},
]

let nyawaa = [{
    color: "red",
    position: initPosition(),
},
]

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

// Soal no 6: Pada fungsi drawScore, tambahkan score3Board:
function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    }
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    //scoreCtx.fillStyle = snake.color;
    scoreCtx.font = "20px Arial";
    scoreCtx.fillText("Score", 10, 20);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function cekPrima(score) {
    var max = Math.sqrt(score);
    for( var i = 2;  i <= max;  i++ ) {
        if( score % i == 0 )
            return false;
    }
    return true;
}

function drawSpeed(snake) {
    let speedCanvas;
    if (snake.color == snake1.color) {
        speedCanvas = document.getElementById("moveSpeed");
        levelCanvas = document.getElementById("level"); //canvas level
    }
    let speedCtx = speedCanvas.getContext("2d");
    let levelCtx = levelCanvas.getContext("2d"); //canvas level

    speedCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    levelCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //rect level
    speedCtx.font = "30px Arial";
    //speedCtx.fillStyle = snake.color;
    
    //console.log(snake.score);
    //menentukan speed dan level berdasarkan score
    let scores = snake.score;
    if (scores >=0 && scores <5) {
        MOVE_INTERVAL = 150;
        levelCtx.font = "20px Arial";
        levelCtx.fillText("Level 1", 10, levelCanvas.scrollHeight / 2);
    } else if (scores >= 5 && scores < 10) {
        MOVE_INTERVAL = 130;
        levelCtx.font = "20px Arial";
        levelCtx.fillText("Level 2", 10, levelCanvas.scrollHeight / 2);
    } else if (scores >= 10 && scores < 15) {
        MOVE_INTERVAL = 110;
        levelCtx.font = "20px Arial";
        levelCtx.fillText("Level 3", 10, levelCanvas.scrollHeight / 2);
    } else if (scores >= 15 && scores < 20) {
        MOVE_INTERVAL = 90;
        levelCtx.font = "20px Arial";
        levelCtx.fillText("Level 4", 10, levelCanvas.scrollHeight / 2);
    } else if (scores >= 20) {
        MOVE_INTERVAL = 70;
        levelCtx.font = "20px Arial";
        levelCtx.fillText("Level 5", 10, levelCanvas.scrollHeight / 2);
    }

    if (scores >= 5 && scores % 5 === 0) {
        var audio = new Audio('assets/level_up.mp3');
        audio.loop = false;
        audio.play();
    }

    console.log(scores);
    console.log(cekPrima(scores));
    console.log(MOVE_INTERVAL);
    
    if (scores >= 2 && cekPrima(scores) === true) {
        setInterval(function() {
            let snakeCanvas = document.getElementById("snakeBoard");
            let ctx = snakeCanvas.getContext("2d");
    
            for (let i = 0; i < nyawaa.length; i++) {
                let nyawa = nyawaa[i];
    
                // Soal no 3: DrawImage nyawa dan gunakan image id:
                var img = document.getElementById("nyawa");
                ctx.drawImage(img, nyawa.position.x * CELL_SIZE, nyawa.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }, MOVE_INTERVAL);
    } 

    
        /*
        if (scores % 5 === 0) {
            snake.speed -=10;
            console.log(snake.speed);
            while (scores % 5 === 0) {
                MOVE_INTERVAL = snake.speed;
                console.log(snake.speed);
                console.log(MOVE_INTERVAL);
            }
        }*/
    //modulos = scores + 5;
    //console.log(modulos);
    speedCtx.font = "20px Arial";
    speedCtx.fillText("Speed", 10, 20);
    speedCtx.fillText(MOVE_INTERVAL, 10, speedCanvas.scrollHeight / 2);
}

function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        //drawCell(ctx, snake1.head.x, snake1.head.y, snake1.color);
        var img = document.getElementById("head");
        ctx.drawImage(img, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        for (let i = 1; i < snake1.body.length; i++) {
            //drawCell(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
            var img = document.getElementById("body");
            ctx.drawImage(img, snake1.body[i].x * CELL_SIZE, snake1.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }

        /*
        drawCell(ctx, snake2.head.x, snake2.head.y, snake2.color);
        for (let i = 1; i < snake2.body.length; i++) {
            drawCell(ctx, snake2.body[i].x, snake2.body[i].y, snake2.color);
        }

        // Soal no 6: Draw Player 3
        drawCell(ctx, snake3.head.x, snake3.head.y, snake3.color);
        for (let i = 1; i < snake3.body.length; i++) {
            drawCell(ctx, snake3.body[i].x, snake3.body[i].y, snake3.color);
        }
        */

        for (let i = 0; i < apples.length; i++) {
            let apple = apples[i];

            // Soal no 3: DrawImage apple dan gunakan image id:
            var img = document.getElementById("apple");
            ctx.drawImage(img, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            //drawCell(ctx, apple.position.x, apple.position.y, apple.color);
        }

        

        /*
        for (let i = 0; i < nyawaa.length; i++) {
            let nyawa = nyawaa[i];

            // Soal no 3: DrawImage nyawa dan gunakan image id:
            var img = document.getElementById("nyawa");
            ctx.drawImage(img, nyawa.position.x * CELL_SIZE, nyawa.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }  */

        drawScore(snake1);
        drawSpeed(snake1);
        //drawScore(snake2);
        // Soal no 6: Draw Player 3 Score:
        //drawScore(snake3);
    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

// Soal no 4: Jadikan apples array
function eat(snake, apples) {
    for (let i = 0; i < apples.length; i++) {
        let apple = apples[i];
        if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
            apple.position = initPosition();
            snake.score++;
            snake.body.push({x: snake.head.x, y: snake.head.y});
        }
    }
}

// Soal no 4: Jadikan nyawa array
function life(snake, nyawaa) {
    for (let i = 0; i < nyawaa.length; i++) {
        let nyawa = nyawaa[i];
        if (snake.head.x == nyawa.position.x && snake.head.y == nyawa.position.y) {
            nyawa.position = initPosition();
            snake.life++;
            snake.score++;
            //snake.body.push({x: snake.head.x, y: snake.head.y});
            console.log(snake.life);
        }
    }
}


function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apples);
    life(snake, nyawaa);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apples);
    life(snake, nyawaa);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apples);
    life(snake, nyawaa);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apples);
    life(snake, nyawaa);
}

function checkCollision(snake) {
    let isCollide = false;
    
    //this
    for (let i = 0; i < snake.length; i++) {
        for (let j = 0; j < snake.length; j++) {
            for (let k = 1; k < snake[j].body.length; k++) {
                if (snake[i].head.x == snake[j].body[k].x && snake[i].head.y == snake[j].body[k].y) {
                    isCollide = true;
                    
                    //console.log(snake.life);
                    
                    /*snake[i].life--;
                    if (snake[i].life === 0) {
                        isCollide = true;
                    } */
                    
                }
            }
        }
    }
    if (isCollide) {
        // Soal no 5: Add game over audio:
        alert("Game over");
        snake1 = initSnake("purple");
        var audio = new Audio('assets/game-over.mp3');
        audio.play();

        //snake2 = initSnake("blue");
    }
    return isCollide;
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    // Soal no 6: Check collision dengan snake3
    if (!checkCollision([snake1])) {
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        initGame();
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake1, DIRECTION.DOWN);
    }

    /*
    if (event.key === "a") {
        turn(snake2, DIRECTION.LEFT);
    } else if (event.key === "d") {
        turn(snake2, DIRECTION.RIGHT);
    } else if (event.key === "w") {
        turn(snake2, DIRECTION.UP);
    } else if (event.key === "s") {
        turn(snake2, DIRECTION.DOWN);
    }

    // Soal no 6: Add navigation snake3:
    if (event.key === "j") {
        turn(snake3, DIRECTION.LEFT);
    } else if (event.key === "l") {
        turn(snake3, DIRECTION.RIGHT);
    } else if (event.key === "i") {
        turn(snake3, DIRECTION.UP);
    } else if (event.key === "k") {
        turn(snake3, DIRECTION.DOWN);
    }
    */
})

function initGame() {
    move(snake1);
    //move(snake2);
    //move(snake3);
}

initGame();