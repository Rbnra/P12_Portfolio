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

