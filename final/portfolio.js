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
