let game; // глобальная переменная для таймера

function startSnake() {
    // очищаем canvas и сбрасываем все переменные
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const box = 20;
    const canvasSize = 400;

    let snake = [];
    snake[0] = { x: 9 * box, y: 9 * box };

    let direction = "RIGHT";
    let food = {
        x: Math.floor(Math.random() * (canvasSize / box)) * box,
        y: Math.floor(Math.random() * (canvasSize / box)) * box
    };

    let score = 0;

    document.onkeydown = function(event) {
        if(event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
        if(event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
        if(event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
        if(event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    }

    function collision(head, array) {
        for(let i = 0; i < array.length; i++) {
            if(head.x === array[i].x && head.y === array[i].y) return true;
        }
        return false;
    }

    function draw() {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvasSize, canvasSize);

        for(let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i === 0) ? "lime" : "green";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
            ctx.strokeStyle = "#000";
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if(direction === "LEFT") snakeX -= box;
        if(direction === "RIGHT") snakeX += box;
        if(direction === "UP") snakeY -= box;
        if(direction === "DOWN") snakeY += box;

        if(snakeX === food.x && snakeY === food.y) {
            score++;
            food = {
                x: Math.floor(Math.random() * (canvasSize / box)) * box,
                y: Math.floor(Math.random() * (canvasSize / box)) * box
            };
        } else {
            snake.pop();
        }

        let newHead = { x: snakeX, y: snakeY };

        if(snakeX < 0 || snakeY < 0 || snakeX >= canvasSize || snakeY >= canvasSize || collision(newHead, snake)) {
            clearInterval(game);
            alert("Игра окончена! Счет: " + score);
        }

        snake.unshift(newHead);

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Счет: " + score, 10, 20);
    }

    clearInterval(game);
    game = setInterval(draw, 100);
}

// Запускаем игру при первой загрузке
startSnake();
