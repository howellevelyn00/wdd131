const projects = [
    {
        title: "Personal Blog",
        description: "A responsive blog layout featuring semantic HTML and custom CSS grid styling for article management.",
        imgSrc: "images/blog_project.jpg",
        imgAlt: "Screenshot of blog project",
        tech: "HTML, CSS, JS",
        link: " https://howellevelyn00.github.io/wdd131/Prove/blog/index.html"
    },
    {
        title: "Mission Statement",
        description: "A professional landing page focused on typography and clean design to highlight core values and goals.",
        imgSrc: "images/mission_project.jpg",
        imgAlt: "Mission statement page preview",
        tech: "HTML, CSS",
        link: " https://howellevelyn00.github.io/wdd131/Prove/mission/index.html"
    },
    {
        title: "Recipe Site",
        description: "An interactive recipe database using the Amatic SC font and JS to filter ingredients and cooking steps.",
        imgSrc: "images/recipes_project.jpg",
        imgAlt: "Recipe website interface",
        tech: "HTML, CSS, JS",
        link: " https://howellevelyn00.github.io/wdd131/Prove/recipes/index.html"
    },
    {
        title: "Character Card",
        description: "A dynamic UI component that displays character stats and images using JavaScript object manipulation.",
        imgSrc: "images/character.jpg",
        imgAlt: "Digital character card",
        tech: "JS, CSS Flexbox",
        link: " https://howellevelyn00.github.io/wdd131/Prove/week8/charactercard.html"
    },
    {
        title: "Final Project for CSE 210",
        description: "A comprehensive project showcasing the integration of different concepts learned throughout the course.",
        imgSrc: "images/final_project.png",
        imgAlt: "Final Project Thumbnail",
        tech: "C#, JSON",
        link: "https://github.com/howellevelyn00/cse210-projects/tree/main/final/FinalProject"
    },
    {
        title: "Goal Manager",
        description: "A simple web application for setting and tracking personal goals using object-oriented principles.",
        imgSrc: "images/goal_manager.png",
        imgAlt: "Goal Manager Thumbnail",
        tech: "Python, classes",
        link: "https://github.com/howellevelyn00/cse210-projects/tree/main/prove/Develop05"
    }
];
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const modeLabel = document.getElementById('mode-label');
const body = document.body;
const projectsGrid = document.querySelector('#projects-grid');

// Function to change theme and label text
function switchTheme(e) {
    if (e.target.checked) {
        body.classList.add('dark-mode');
        modeLabel.textContent = "Light Mode"; // Show "Light Mode" when in Dark
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        modeLabel.textContent = "Dark Mode"; // Show "Dark Mode" when in Light
        localStorage.setItem('theme', 'light');
    }    
}

// Event listener for the switch
toggleSwitch.addEventListener('change', switchTheme, false);

// Check local storage for existing preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        body.classList.add('dark-mode');
        modeLabel.textContent = "Light Mode";
    }
}

function displayProjects(projectList) {
    projectsGrid.innerHTML = ""; // Clear existing content

    projectList.forEach(project => {
        const article = document.createElement('article');
        article.className = 'project-card'; // Keeps your existing CSS styling

        article.innerHTML = `
            <div class="card-header">
                <img src="${project.imgSrc}" alt="${project.imgAlt}" loading="lazy">
            </div>
            <div class="card-body">
                <h3>${project.title}</h3>
                <p><strong>Technologies:</strong> ${project.tech}</p>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" class="project-link">View Github Code →</a>
            </div>
        `;
        
        projectsGrid.appendChild(article);
    });
}

if (projectsGrid) {
    displayProjects(projects);
}

// --- Jumping Man Game --- //
const canvas = document.getElementById('gameCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('start-btn');
    const overlay = document.getElementById('game-overlay');
    const scoreVal = document.getElementById('score-val');
    const highScoreVal = document.getElementById('high-score-val');
    const gameOverText = document.getElementById('game-over-text');

    let isGameRunning = false;
    let gameLoopId;
    let score = 0;
    let highScore = localStorage.getItem('jumpingGameHighScore') || 0;
    if (highScoreVal) highScoreVal.textContent = Math.floor(highScore);

    let frameCount = 0;
    let obstacles = [];

    // Player properties
    const groundHeight = 20;
    const player = {
        x: 50,
        width: 20,
        height: 40,
        baseHeight: 40,
        duckHeight: 20,
        y: canvas.height - 40 - groundHeight,
        baseY: canvas.height - 40 - groundHeight,
        dy: 0,
        jumpForce: 10,
        gravity: 0.6,
        isJumping: false,
        isDucking: false
    };

    let gameSpeed = 5;

    function resetGame() {
        score = 0;
        frameCount = 0;
        gameSpeed = 5;
        obstacles = [];
        player.y = player.baseY;
        player.dy = 0;
        player.isJumping = false;
        player.isDucking = false;
        player.height = player.baseHeight;
        scoreVal.textContent = Math.floor(score);
        overlay.style.display = 'none';
        isGameRunning = true;
        gameLoop();
    }

    function spawnObstacle() {
        // Decide if it's a ground obstacle or flying obstacle
        const isFlying = Math.random() > 0.5;
        const obstacle = {
            x: canvas.width,
            width: 20 + Math.random() * 20, // Random width 20-40
            height: isFlying ? 20 : 20 + Math.random() * 20,
            y: 0,
            passed: false
        };
        
        if (isFlying) {
            // High enough to duck under, low enough to hit if standing
            obstacle.y = canvas.height - groundHeight - player.baseHeight - 5;
        } else {
            // Ground obstacle
            obstacle.y = canvas.height - groundHeight - obstacle.height;
        }
        obstacles.push(obstacle);
    }

    function detectCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    function draw() {
        // Clear canvas softly to allow theme changing support
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw ground line
        ctx.fillStyle = body.classList.contains('dark-mode') ? '#444' : '#ccc';
        ctx.fillRect(0, canvas.height - groundHeight, canvas.width, 2);

        // Draw Player
        ctx.fillStyle = body.classList.contains('dark-mode') ? '#4db8ff' : '#2596be';
        ctx.fillRect(player.x, player.y, player.width, player.height);
        
        // Player Eye
        ctx.fillStyle = body.classList.contains('dark-mode') ? '#121212' : '#041014';
        const eyeY = player.isDucking ? 4 : 8;
        ctx.fillRect(player.x + 12, player.y + eyeY, 4, 4);

        // Draw Obstacles
        ctx.fillStyle = body.classList.contains('dark-mode') ? '#ff5555' : '#d9534f';
        obstacles.forEach(obs => {
            ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        });
    }

    function update() {
        // Physics
        player.y += player.dy;
        if (player.y < player.baseY && !player.isDucking) {
            player.dy += player.gravity;
        } else if (!player.isDucking) {
            player.dy = 0;
            player.y = player.baseY;
            player.isJumping = false;
        }

        // Deal with ducking specifically
        if (player.isDucking) {
             const duckY = canvas.height - groundHeight - player.duckHeight;
             if (player.y < duckY) {
                 player.dy += player.gravity; // Still in the air but ducking
             } else {
                 player.dy = 0;
                 player.y = duckY;
                 player.isJumping = false;
             }
        }

        // Game progression
        score += 0.05 * (gameSpeed / 5);
        scoreVal.textContent = Math.floor(score);
        frameCount++;

        if (frameCount % Math.max(30, 100 - Math.floor(score/2)) === 0) {
            spawnObstacle();
        }

        // Move obstacles
        for (let i = 0; i < obstacles.length; i++) {
            let obs = obstacles[i];
            obs.x -= gameSpeed;

            // Collision check
            if (detectCollision(player, obs)) {
                isGameRunning = false;
                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem('jumpingGameHighScore', highScore);
                    if (highScoreVal) highScoreVal.textContent = Math.floor(highScore);
                }
            }

            // Clean up old obstacles
            if (obs.x + obs.width < 0) {
                obstacles.splice(i, 1);
                i--;
            }
        }
        
        // Speed up over time
        gameSpeed += 0.002;
    }

    function gameLoop() {
        if (!isGameRunning) {
            gameOverText.textContent = "Game Over!";
            overlay.style.display = 'flex';
            startBtn.textContent = "Play Again";
            return;
        }

        update();
        draw();
        gameLoopId = requestAnimationFrame(gameLoop);
    }

    startBtn.addEventListener('click', () => {
        resetGame();
    });

    // Controls
    document.addEventListener('keydown', (e) => {
        if (!isGameRunning) {
            // Restart with spacebar
            if (e.code === 'Space') {
                e.preventDefault();
                resetGame();
            }
            return;
        }
        
        if (e.code === 'Space' || e.code === 'ArrowUp') {
            e.preventDefault(); // Stop page scrolling
            if (!player.isJumping) {
                player.dy = -player.jumpForce;
                player.isJumping = true;
                if (player.isDucking) {
                   player.isDucking = false;
                   player.height = player.baseHeight;
                }
            }
        } else if (e.code === 'ArrowDown') {
            e.preventDefault();
            if (!player.isDucking && !player.isJumping) {
                player.isDucking = true;
                player.height = player.duckHeight;
                player.y = canvas.height - groundHeight - player.duckHeight;
            } else if (player.isJumping) {
                // Fast fall
                player.dy += player.gravity * 3;
            }
        }
    });

    document.addEventListener('keyup', (e) => {
        if (!isGameRunning) return;
        if (e.code === 'ArrowDown') {
            e.preventDefault();
            player.isDucking = false;
            player.height = player.baseHeight;
            // readjust position if on ground
            if (!player.isJumping) {
                 player.y = player.baseY;
            }
        }
    });
    
    // Draw initial state before starting
    draw();
}
