// ========================================
// SCRIPT.JS - Funcionalidad del Blog
// ========================================

// ========================================
// 1. EVENTO DE CARGA DEL DOCUMENTO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Blog de Grafos cargado correctamente');
    initializeNavigation();
    highlightCurrentPage();
    addSmoothScrolling();
});

// ========================================
// 2. NAVEGACIÓN ACTIVA
// ========================================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remover clase active de todos los links
            navLinks.forEach(l => l.classList.remove('active'));
            // Añadir clase active al link actual
            this.classList.add('active');
        });
    });
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ========================================
// 3. SCROLL SUAVE
// ========================================

function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// 4. ANIMACIÓN DE APARICIÓN AL SCROLL
// ========================================

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.post-card, .feature-card, .concept-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Llamar cuando el DOM está listo
document.addEventListener('DOMContentLoaded', observeElements);

// ========================================
// 5. TABLA DE CONTENIDOS INTERACTIVA
// ========================================

function makeTOCInteractive() {
    const tocLinks = document.querySelectorAll('.toc a');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Highlight el heading temporalmente
                targetElement.style.backgroundColor = '#fff3cd';
                setTimeout(() => {
                    targetElement.style.backgroundColor = '';
                }, 2000);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', makeTOCInteractive);

// ========================================
// 6. BOTÓN VOLVER AL INICIO
// ========================================

function addScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '⬆';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #3498db, #2c3e50);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollButton.addEventListener('mouseenter', () => {
        scrollButton.style.transform = 'scale(1.1)';
    });
    
    scrollButton.addEventListener('mouseleave', () => {
        scrollButton.style.transform = 'scale(1)';
    });
}

document.addEventListener('DOMContentLoaded', addScrollToTopButton);

// ========================================
// 7. BÚSQUEDA Y FILTRADO (OPCIONAL)
// ========================================

function implementSearch() {
    // Verificar si existe una barra de búsqueda
    const searchInput = document.querySelector('.search-input');
    const postCards = document.querySelectorAll('.post-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            postCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const excerpt = card.querySelector('.post-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0.5';
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', implementSearch);

// ========================================
// 8. COPIAR CÓDIGO A PORTAPAPELES
// ========================================

function addCopyCodeButtons() {
    const codeBoxes = document.querySelectorAll('.code-box');
    
    codeBoxes.forEach(box => {
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '📋 Copiar';
        copyButton.className = 'copy-button';
        copyButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #3498db;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;
            z-index: 10;
            transition: all 0.3s ease;
        `;
        
        box.style.position = 'relative';
        box.appendChild(copyButton);
        
        copyButton.addEventListener('click', () => {
            const code = box.innerText;
            navigator.clipboard.writeText(code).then(() => {
                const originalText = copyButton.innerHTML;
                copyButton.innerHTML = '✓ ¡Copiado!';
                copyButton.style.background = '#2ecc71';
                
                setTimeout(() => {
                    copyButton.innerHTML = originalText;
                    copyButton.style.background = '#3498db';
                }, 2000);
            });
        });
        
        copyButton.addEventListener('mouseenter', () => {
            copyButton.style.transform = 'translateY(-2px)';
            copyButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        });
        
        copyButton.addEventListener('mouseleave', () => {
            copyButton.style.transform = 'translateY(0)';
            copyButton.style.boxShadow = 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', addCopyCodeButtons);

// ========================================
// 9. CONTADOR DE LECTURA
// ========================================

function addReadingTime() {
    const post = document.querySelector('.post');
    if (post) {
        const text = post.innerText;
        const wordsPerMinute = 200;
        const words = text.split(/\s+/).length;
        const readingTime = Math.ceil(words / wordsPerMinute);
        
        const readingTimeElement = document.createElement('div');
        readingTimeElement.className = 'reading-time';
        readingTimeElement.innerHTML = `⏱ Tiempo de lectura: ~${readingTime} minutos`;
        readingTimeElement.style.cssText = `
            background: #ecf0f1;
            padding: 0.8rem 1.2rem;
            border-radius: 4px;
            color: #7f8c8d;
            font-size: 0.9rem;
            margin-bottom: 1.5rem;
            display: inline-block;
        `;
        
        const postHeader = document.querySelector('.post-header-article');
        if (postHeader) {
            postHeader.appendChild(readingTimeElement);
        }
    }
}

document.addEventListener('DOMContentLoaded', addReadingTime);

// ========================================
// 10. TABLA DE CONTENIDOS AUTOMÁTICA
// ========================================

function generateTableOfContents() {
    // Solo generar si no existe ya una TOC
    const existingTOC = document.querySelector('.toc');
    if (existingTOC) return;
    
    const post = document.querySelector('.post');
    if (!post) return;
    
    const headings = post.querySelectorAll('h2, h3');
    if (headings.length === 0) return;
    
    const toc = document.createElement('div');
    toc.className = 'toc';
    toc.innerHTML = '<h3>📋 Contenido</h3><ul>';
    
    headings.forEach((heading, index) => {
        if (!heading.id) {
            heading.id = `section-${index}`;
        }
        
        const li = document.createElement('li');
        if (heading.tagName === 'H3') {
            li.style.marginLeft = '1.5rem';
        }
        
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        
        li.appendChild(link);
        toc.querySelector('ul').appendChild(li);
    });
    
    toc.innerHTML += '</ul>';
    
    const postHeader = document.querySelector('.post-header-article');
    if (postHeader) {
        postHeader.parentNode.insertBefore(toc, postHeader.nextSibling);
    }
}

// document.addEventListener('DOMContentLoaded', generateTableOfContents);

// ========================================
// 11. ESTADÍSTICAS DEL BLOG
// ========================================

function displayBlogStats() {
    const postCards = document.querySelectorAll('.post-card');
    console.log(`📊 Blog Statistics:`);
    console.log(`   - Total Posts: ${postCards.length}`);
    console.log(`   - Total Topics: ${document.querySelectorAll('.topic').length}`);
    console.log(`   - Total Code Examples: ${document.querySelectorAll('.code-box').length}`);
}

document.addEventListener('DOMContentLoaded', displayBlogStats);

// ========================================
// 12. EFECTOS DE HOVER EN TARJETAS
// ========================================

function addCardEffects() {
    const cards = document.querySelectorAll('.post-card, .feature-card, .concept-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', addCardEffects);

// ========================================
// 13. VALIDACIÓN Y LOGGING
// ========================================

function validateBlogStructure() {
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const navbar = document.querySelector('.navbar');
    
    const isValid = header && footer && navbar;
    
    if (isValid) {
        console.log('✅ Estructura del blog válida');
    } else {
        console.warn('⚠️ Faltan elementos en la estructura del blog');
    }
    
    return isValid;
}

document.addEventListener('DOMContentLoaded', validateBlogStructure);

// ========================================
// 14. KEYBOARD SHORTCUTS
// ========================================

function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K para búsqueda (si existiera)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            console.log('🔍 Búsqueda activada');
        }
        
        // Home para ir al inicio
        if (e.key === 'Home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // End para ir al final
        if (e.key === 'End') {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', addKeyboardShortcuts);

// ========================================
// 15. MODO OSCURO (OPCIONAL)
// ========================================

function implementDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // Cargar preferencia guardada
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

document.addEventListener('DOMContentLoaded', implementDarkMode);

// ========================================
// UTILIDADES GENERALES
// ========================================

// Función para debug
function debugInfo() {
    return {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
    };
}

// Log de información
console.log('🎓 Blog Técnico de Grafos');
console.log('📚 Estructura de Datos 2');
console.log('🔗 GitHub: github.com/ydpedrozam-creator/proyecto-copilot');
