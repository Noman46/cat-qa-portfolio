
const canvas = document.getElementById("gameCanvas");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const qaTextValue = document.getElementById("qaText");
const devTextValue = document.getElementById("devText");
const ctx = canvas.getContext("2d");
const particles = [];

class Particle {
    constructor(x, y, radius, color, type) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.type = type; // 'water' or 'fire' or 'leaves'
        this.dx = (Math.random() - 0.5) * 2;
        this.dy = (Math.random() - 0.5) * 2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.dx = -this.dx;
        }

        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.dy = -this.dy;
        }
    }
}


// Create water droplets
for (let i = 0; i < 15; i++) {
    const radius = 10;
    const x = Math.random() * (canvas.width - 2 * radius) + radius;
    const y = Math.random() * (canvas.height - 2 * radius) + radius;
    const color = "blue";
    const type = 'water';
    particles.push(new Particle(x, y, radius, color, type));

}
// Create Fire droplets
for (let i = 0; i < 15; i++) {
    const radius = 10;
    const x = Math.random() * (canvas.width - 2 * radius) + radius;
    const y = Math.random() * (canvas.height - 2 * radius) + radius;
    const color = "red";
    const type = 'fire';
    particles.push(new Particle(x, y, radius, color, type));
}
// Create Leaves droplets
for (let i = 0; i < 15; i++) {
    const radius = 10;
    const x = Math.random() * (canvas.width - 2 * radius) + radius;
    const y = Math.random() * (canvas.height - 2 * radius) + radius;
    const color = "green";
    const type = 'leaves';
    particles.push(new Particle(x, y, radius, color, type));
}
function checkCollision(waterParticle, fireParticle) {
    const distance = Math.sqrt(
        Math.pow(waterParticle.x - fireParticle.x, 2) +
        Math.pow(waterParticle.y - fireParticle.y, 2)
    );

    return distance < waterParticle.radius + fireParticle.radius;

}

let water = 15;
let fire = 15;
let leaves = 15;
let animationId;
let animationBreaker = 0;

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        particle.update()
        particle.draw();
        // Check for collisions with other particles
        for (let i = 0; i < particles.length; i++) {
            if (i !== index) {
                const otherParticle = particles[i];

                if (particle.type === 'fire' && otherParticle.type === 'water' && checkCollision(particle, otherParticle)) {
                    // Transform water particle to fire particle
                    particle.type = 'water';
                    particle.color = 'blue';
                    water = water + 1;
                    fire = fire - 1;

                }
                if (particle.type === 'leaves' && otherParticle.type === 'fire' && checkCollision(particle, otherParticle)) {
                    // Transform water particle to fire particle
                    particle.type = 'fire';
                    particle.color = 'red';
                    fire = fire + 1;
                    leaves = leaves - 1
                }
                if (particle.type === 'water' && otherParticle.type === 'leaves' && checkCollision(particle, otherParticle)) {
                    // Transform water particle to fire particle
                    particle.type = 'leaves';
                    particle.color = 'green';
                    leaves = leaves + 1;
                    water = water - 1;
                }
            }
        }
        if (water === 45 || leaves === 45 || fire === 45) {
            let winner;
            animationBreaker = 45
            if (particle.type === qaTextValue.value.toLowerCase()) {
                winner = "The Winner Is:QA, It is a BUG idiot"
            } else if (particle.type === devTextValue.value.toLowerCase()) {
                winner = " The Winner Is: DEV, It is a feature idiot"
            }
            else {
                winner = "The Winner Is: PM, Let's have a meeting"
            }
            gameResult(winner)
        }
    });

    if (animationBreaker < 45) {
        animationId = requestAnimationFrame(gameLoop);

    }

}
function gameResult(winner) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(winner, canvas.width / 2, canvas.height / 2)
}
function startGame() {
    if (qaTextValue.value.length != 0 && devTextValue.value.length != 0 ) {
        gameLoop();
    } else {
        gameResult("Please Put QA and DEV Choice")
    }

    
}
function pauseGame() {
    cancelAnimationFrame(animationId);
}
function resetGame() {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

startButton.addEventListener("click", function () {
    startGame()
});
pauseButton.addEventListener("click", function () {
    pauseGame()
});
resetButton.addEventListener("click", function () {
    location.reload()
});