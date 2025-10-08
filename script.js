document.addEventListener('DOMContentLoaded', () => {

    // --- Variabel Global ---
    const header = document.querySelector('header');
    const nav = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');
    const logo = document.querySelector('.logo');

    // --- 1. Header berubah warna saat scroll ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Menu Mobile ---
    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    };
    hamburger.addEventListener('click', toggleMenu);

    // --- 3. Smooth Scrolling & Menutup Menu Mobile saat link diklik ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    logo.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            toggleMenu();
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // --- 4. Menyorot Menu Aktif saat Scroll (Active Link Highlighting) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4 
    };
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('data-section');
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if(link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- 5. Animasi Fade-in ---
    const faders = document.querySelectorAll('.fade-in');
    const faderOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        });
    }, faderOptions);
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    // --- 6. Efek Mengetik ---
    const typingElement = document.getElementById('typing-effect');
    if(typingElement){
        const roles = ["Performance Marketing", "Data Analyst", "Strategic Planner"];
        let roleIndex = 0;
        let charIndex = 0;
        function type() {
            if (charIndex < roles[roleIndex].length) {
                typingElement.textContent += roles[roleIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            } else {
                setTimeout(erase, 2000);
            }
        }
        function erase() {
            if (charIndex > 0) {
                typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 50);
            } else {
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, 500);
            }
        }
        type();
    }

    // --- 7. Logika untuk Modal/Lightbox Sertifikat ---
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const certificateImages = document.querySelectorAll(".cert-image-item");
    const closeModalBtn = document.querySelector(".close-modal");
    if (modal) {
        certificateImages.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                modal.style.display = "block";
                modalImg.src = imgSrc;
            });
        });

        const closeTheModal = () => {
            modal.style.display = "none";
        }

        closeModalBtn.addEventListener('click', closeTheModal);
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeTheModal();
            }
        });
    }
});