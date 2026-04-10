/**
 * Psicoguía - Interacciones Core
 * Desarrollado con IntersectionObserver para máximo rendimiento.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Configuración del observador para animar elementos y cambiar el menú lateral
    const sections = document.querySelectorAll('.snap-section');
    const navDots = document.querySelectorAll('.dot');
    const scrollContainer = document.querySelector('.snap-container');

    // Opciones para detectar cuándo una sección entra en el viewport
    const observerOptions = {
        root: scrollContainer,
        rootMargin: '0px',
        threshold: 0.5 // Se activa cuando al menos el 50% de la sección es visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // A) Activa las animaciones CSS añadiendo la clase 'is-visible' a la sección
                entry.target.classList.add('is-visible');

                // B) Actualiza el indicador lateral (los puntitos)
                // Obtenemos el ID de la sección (ej: 'punto-1') y sacamos el número
                const sectionId = entry.target.id;
                const index = parseInt(sectionId.replace('punto-', '')) - 1;

                // Quitamos la clase active de todos los puntos y se la ponemos al actual
                navDots.forEach(dot => dot.classList.remove('active'));
                if (navDots[index]) {
                    navDots[index].classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Iniciar la observación de cada sección
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 2. Click en los puntos laterales para navegar a esa sección
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const targetSection = document.getElementById(`punto-${index + 1}`);
            if (targetSection) {
                // Hacemos scroll suave hacia esa sección dentro del contenedor
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});