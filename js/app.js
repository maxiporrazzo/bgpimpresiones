document.addEventListener('DOMContentLoaded', () => {
            
    /* === 1. Lógica del Menú de Navegación === */
    const navbar = document.getElementById('nav-principal');
    const btnMenu = document.getElementById('boton-menu');
    const menuEnlaces = document.getElementById('enlaces-menu');
    const enlaces = document.querySelectorAll('.enlace-nav');

    // Cambio de estilo al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolleado');
        } else {
            navbar.classList.remove('scrolleado');
        }
    });

    // Toggle menú en móviles
    btnMenu.addEventListener('click', () => {
        menuEnlaces.classList.toggle('activa');
        // Cambiar ícono de hamburguesa a cruz
        if(menuEnlaces.classList.contains('activa')) {
            btnMenu.classList.replace('fa-bars', 'fa-times');
        } else {
            btnMenu.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Cerrar menú al clickear un enlace
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', () => {
            menuEnlaces.classList.remove('activa');
            btnMenu.classList.replace('fa-times', 'fa-bars');
        });
    });

    /* === 2. Animaciones al hacer Scroll (Intersection Observer) === */
    const elementosAnimables = document.querySelectorAll('.efecto-fade');
    
    const opcionesObserver = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observadorFade = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
                // Dejamos de observar una vez que aparece
                observador.unobserve(entrada.target); 
            }
        });
    }, opcionesObserver);

    elementosAnimables.forEach(elemento => {
        observadorFade.observe(elemento);
    });

    /* === 3. Animación de Contadores Numéricos === */
    const contadores = document.querySelectorAll('.contador-animado');
    let contadoresAnimados = false; // Bandera para animar solo una vez
    
    const animarNumeros = (entradas, observador) => {
        entradas.forEach(entrada => {
            if(entrada.isIntersecting && !contadoresAnimados) {
                contadores.forEach(contador => {
                    const meta = +contador.getAttribute('data-meta');
                    // Empezamos desde 0 y subimos
                    const actualizarContador = () => {
                        const valorActual = +contador.innerText;
                        const incremento = meta / 50; // Velocidad
                        
                        if (valorActual < meta) {
                            contador.innerText = Math.ceil(valorActual + incremento);
                            setTimeout(actualizarContador, 30);
                        } else {
                            // Aseguramos que termine en el número exacto
                            contador.innerText = meta; 
                        }
                    };
                    actualizarContador();
                });
                contadoresAnimados = true;
                observador.disconnect();
            }
        });
    };

    const observadorContadores = new IntersectionObserver(animarNumeros, {threshold: 0.5});
    // Observamos el contenedor padre de las estadísticas
    const contenedorStats = document.querySelector('.estadisticas-contenedor');
    if(contenedorStats) {
        observadorContadores.observe(contenedorStats);
    }

    /* === 4. Validación Básica del Formulario === */
    const formulario = document.getElementById('form-contacto');
    
    if(formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar recarga
            
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const mensaje = document.getElementById('mensaje');
            
            let esValido = true;

            // Ocultar mensajes previos
            document.querySelectorAll('.alerta-error').forEach(alerta => alerta.style.display = 'none');
            document.querySelectorAll('.campo-texto').forEach(campo => campo.style.borderColor = '');

            // Validar Nombre
            if (nombre.value.trim() === '') {
                document.getElementById('err-nombre').style.display = 'flex';
                nombre.style.borderColor = '#ff6b6b';
                esValido = false;
            }

            // Validar Email con Regex
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email.value.trim())) {
                document.getElementById('err-email').style.display = 'flex';
                email.style.borderColor = '#ff6b6b';
                esValido = false;
            }

            // Validar Mensaje
            if (mensaje.value.trim() === '') {
                document.getElementById('err-mensaje').style.display = 'flex';
                mensaje.style.borderColor = '#ff6b6b';
                esValido = false;
            }

            // Si todo es válido (Simulación de envío)
            if (esValido) {
                const btnSubmit = formulario.querySelector('button[type="submit"]');
                const textoOriginal = btnSubmit.innerHTML;
                
                btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                btnSubmit.style.opacity = '0.7';
                
                // Simular delay de red
                setTimeout(() => {
                    alert('¡Mensaje enviado con éxito! Nos comunicaremos a la brevedad.');
                    formulario.reset();
                    btnSubmit.innerHTML = textoOriginal;
                    btnSubmit.style.opacity = '1';
                }, 1500);
            }
        });
    }

    /* === 5. Establecer Año Actual en Footer === */
    const anioActual = document.getElementById('anio-actual');
    if(anioActual) {
        anioActual.textContent = new Date().getFullYear();
    }
});
