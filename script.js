// Dynamique du portfolio
fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        const grid = document.getElementById('portfolio-grid');
        data.forEach(project => {
            const item = document.createElement('div');
            item.className = 'portfolio-item';
            item.dataset.category = project.category || 'all';
            item.innerHTML = `
                    <img src="${project.image}" alt="${project.title}">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank" class="btn-primary">Voir sur GitHub</a>
                `;
            grid.appendChild(item);
        });

        // Gestion des filtres
        const buttons = document.querySelectorAll('.filters button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                document.querySelectorAll('.portfolio-item').forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    });

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');

    // Cacher l'écran de chargement après le chargement complet de la page
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0'; // Démarrer la transition d'opacité
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500); // Durée de la transition d'opacité
        }, 1000); // Délai avant de commencer la transition
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) { // Afficher le bouton après 300px de défilement
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Petal {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.size = Math.random() * 15 + 10; // Taille du pétale
        this.speed = Math.random() * 1 + 0.1; // Vitesse de chute
        this.angle = Math.random() * 360; // Angle de rotation initial
        this.spin = Math.random() * 2 - 1; // Vitesse de rotation
        this.opacity = Math.random() * 0.5 + 0.5; // Opacité du pétale
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);

        // Dessin du pétale avec une forme plus ovale
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-this.size / 2, -this.size / 2, 0, -this.size);
        ctx.quadraticCurveTo(this.size / 2, -this.size / 2, 0, 0);
        ctx.closePath();

        ctx.fillStyle = `rgba(255, 182, 193, ${this.opacity})`; // Rose clair
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.y += this.speed;
        this.angle += this.spin;

        if (this.y > canvas.height + this.size) {
            this.x = Math.random() * canvas.width;
            this.y = -this.size;
        }
    }
}

let petalsArray = [];

function init() {
    petalsArray = [];
    for (let i = 0; i < 25; i++) { // Ajuster le nombre de pétales
        petalsArray.push(new Petal());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    petalsArray.forEach(petal => {
        petal.update();
        petal.draw();
    });

    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
