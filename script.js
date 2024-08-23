document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('petalsCanvas');
    const ctx = canvas.getContext('2d');
    const petals = [];
    const numPetals = 20;

    // Taille du canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Créer des pétales de cerisier
    function createPetals() {
        for (let i = 0; i < numPetals; i++) {
            petals.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 5 + 5,
                speed: Math.random() * 0.5 + 0.3,
                angle: Math.random() * 360,
                spin: Math.random() * 0.1 - 0.05
            });
        }
    }

    // Dessiner les pétales
    function drawPetals() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffb7c5';
        petals.forEach(petal => {
            ctx.save();
            ctx.translate(petal.x, petal.y);
            ctx.rotate(petal.angle * Math.PI / 180);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(petal.size, -petal.size, 0, -petal.size * 2);
            ctx.quadraticCurveTo(-petal.size, -petal.size, 0, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        });
    }

    // Mettre à jour les positions des pétales
    function updatePetals() {
        petals.forEach(petal => {
            petal.y += petal.speed;
            petal.angle += petal.spin;
            if (petal.y > canvas.height) {
                petal.y = 0 - petal.size;
                petal.x = Math.random() * canvas.width;
            }
        });
    }

    // Animation des pétales
    function animate() {
        drawPetals();
        updatePetals();
        requestAnimationFrame(animate);
    }

    // Initialiser
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createPetals();
    animate();

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

