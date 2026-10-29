document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fa-solid fa-xmark"></i>' 
            : '<i class="fa-solid fa-bars"></i>';
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });

    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / 50; 

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 40);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        }
    }, { threshold: 0.5 });
    
    const sobreSection = document.getElementById('sobre');
    if (sobreSection) counterObserver.observe(sobreSection);

    const ctx = document.getElementById('economiaChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [
                    {
                        label: 'Sem Energia Solar (R$)',
                        data: [500, 520, 510, 580, 600, 650, 700, 720, 680, 650, 620, 590],
                        borderColor: '#E74C3C', 
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Com Energia Solar (R$)',
                        data: [270, 230, 225, 253, 250, 222, 283, 292, 302, 262, 272, 232],
                        borderColor: '#27AE60', 
                        backgroundColor: 'rgba(39, 174, 96, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#fff' } }
                },
                scales: {
                    y: { ticks: { color: '#ccc' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                    x: { ticks: { color: '#ccc' }, grid: { color: 'rgba(255,255,255,0.1)' } }
                }
            }
        });
    }

    const btnSimular = document.getElementById('btnSimular');
    const inputValor = document.getElementById('contaValor');
    const resBox = document.getElementById('simuladorResultado');
    const ecoMensal = document.getElementById('ecoMensal');
    const ecoAnual = document.getElementById('ecoAnual');

    if (btnSimular) {
        btnSimular.addEventListener('click', () => {
            const valor = parseFloat(inputValor.value);
            
            if (isNaN(valor) || valor < 50) {
                alert('Por favor, insira um valor válido para a sua conta de luz.');
                return;
            }

            
            const economiaMes = valor * 0.52;
            const economiaAno = economiaMes * 12;

            const formatBR = (num) => num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            ecoMensal.innerText = formatBR(economiaMes);
            ecoAnual.innerText = formatBR(economiaAno);

            resBox.classList.remove('hide');
        });
    }

    const modal = document.getElementById('offerModal');
    const closeBtns = document.querySelectorAll('.close-btn, .close-text');
    
    if (modal) {
        setTimeout(() => {
            if (!sessionStorage.getItem('popupFechado')) {
                modal.classList.add('show');
            }
        }, 10000); 

        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.remove('show');
                sessionStorage.setItem('popupFechado', 'true');
            });
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                sessionStorage.setItem('popupFechado', 'true');
            }
        });
    }
});