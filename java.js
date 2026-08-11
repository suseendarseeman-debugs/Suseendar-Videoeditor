/* =========================================================
   SUSEENDAR PORTFOLIO — JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PRELOADER
       ===================================================== */

    const preloader = document.querySelector(".preloader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add("hidden");
            }
        }, 700);
    });


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    const header = document.querySelector(".header");

    function handleHeader() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeader);
    handleHeader();


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            navLinks.classList.toggle("active");
            document.body.classList.toggle("menu-open");

        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                navLinks.classList.remove("active");
                document.body.classList.remove("menu-open");

            });

        });
    }


    /* =====================================================
       SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .skill-card"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       PORTFOLIO FILTER
       ===================================================== */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter = button.dataset.filter;

            portfolioItems.forEach(item => {

                const category = item.dataset.category;

                if (
                    filter === "all" ||
                    category === filter
                ) {

                    item.style.display = "block";

                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "translateY(0)";
                    }, 20);

                } else {

                    item.style.opacity = "0";
                    item.style.transform = "translateY(15px)";

                    setTimeout(() => {
                        item.style.display = "none";
                    }, 300);

                }

            });

        });

    });


    /* =====================================================
       VIDEO MODAL
       ===================================================== */

    const modal = document.querySelector(".video-modal");
    const modalVideo = document.querySelector(".video-modal video");
    const closeModal = document.querySelector(".close-modal");

    const videoButtons = document.querySelectorAll(
        "[data-video]"
    );

    videoButtons.forEach(button => {

        button.addEventListener("click", () => {

            const videoURL = button.dataset.video;

            if (!modal || !modalVideo || !videoURL) return;

            modalVideo.src = videoURL;

            modal.classList.add("active");

            document.body.style.overflow = "hidden";

            modalVideo.play().catch(() => {});

        });

    });

    function closeVideoModal() {

        if (!modal) return;

        modal.classList.remove("active");

        document.body.style.overflow = "";

        if (modalVideo) {

            modalVideo.pause();

            modalVideo.currentTime = 0;

            modalVideo.removeAttribute("src");

            modalVideo.load();

        }

    }

    if (closeModal) {
        closeModal.addEventListener(
            "click",
            closeVideoModal
        );
    }

    if (modal) {

        modal.addEventListener("click", event => {

            if (event.target === modal) {
                closeVideoModal();
            }

        });

    }

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeVideoModal();
        }

    });


    /* =====================================================
       ANIMATED NUMBER COUNTERS
       ===================================================== */

    const counters = document.querySelectorAll(
        "[data-counter]"
    );

    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                const target = parseFloat(
                    counter.dataset.counter
                );

                const suffix =
                    counter.dataset.suffix || "";

                const duration = 1800;

                let start = 0;

                const startTime = performance.now();

                function updateCounter(currentTime) {

                    const progress = Math.min(
                        (currentTime - startTime) / duration,
                        1
                    );

                    const eased =
                        1 - Math.pow(1 - progress, 3);

                    const value =
                        start + (target - start) * eased;

                    if (target % 1 !== 0) {
                        counter.textContent =
                            value.toFixed(1) + suffix;
                    } else {
                        counter.textContent =
                            Math.floor(value) + suffix;
                    }

                    if (progress < 1) {
                        requestAnimationFrame(
                            updateCounter
                        );
                    }

                }

                requestAnimationFrame(
                    updateCounter
                );

                counterObserver.unobserve(counter);

            });

        },
        {
            threshold: 0.7
        }
    );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    const contactForm =
        document.querySelector("#contactForm");

    const formMessage =
        document.querySelector(".form-message");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const name =
                    document.querySelector("#name")?.value.trim();

                const email =
                    document.querySelector("#email")?.value.trim();

                const service =
                    document.querySelector("#service")?.value;

                const message =
                    document.querySelector("#message")?.value.trim();

                if (!name || !email || !service || !message) {

                    showFormMessage(
                        "Please fill in all the required fields.",
                        false
                    );

                    return;

                }

                if (!validateEmail(email)) {

                    showFormMessage(
                        "Please enter a valid email address.",
                        false
                    );

                    return;

                }

                /*
                    Instead of sending to a backend,
                    this creates a WhatsApp inquiry.
                */

                const whatsappMessage =
                    `Hi Suseendar,

My name is ${name}.

Email: ${email}

I'm interested in: ${service}

Project details:
${message}

I'd like to discuss the project and pricing.`;

                const whatsappURL =
                    "https://wa.me/917397150268?text=" +
                    encodeURIComponent(
                        whatsappMessage
                    );

                showFormMessage(
                    "Opening WhatsApp... 🚀",
                    true
                );

                setTimeout(() => {

                    window.open(
                        whatsappURL,
                        "_blank"
                    );

                }, 700);

            }
        );

    }


    function validateEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            email
        );

    }


    function showFormMessage(message, success = true) {

        if (!formMessage) return;

        formMessage.textContent = message;

        formMessage.classList.add("show");

        if (!success) {

            formMessage.style.background =
                "rgba(255,70,70,0.1)";

            formMessage.style.color =
                "#ff8585";

        } else {

            formMessage.style.background =
                "rgba(37,211,102,0.1)";

            formMessage.style.color =
                "#7ff2a7";

        }

        setTimeout(() => {

            formMessage.classList.remove("show");

        }, 5000);

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const targetID =
                        this.getAttribute("href");

                    if (
                        !targetID ||
                        targetID === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetID
                        );

                    if (!target) return;

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight -
                        20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navItems =
        document.querySelectorAll(
            ".nav-links a[href^='#']"
        );

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;

                    const id =
                        entry.target.getAttribute(
                            "id"
                        );

                    navItems.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                        if (
                            link.getAttribute(
                                "href"
                            ) === `#${id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                rootMargin:
                    "-30% 0px -60% 0px"
            }
        );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* =====================================================
       TYPING EFFECT
       ===================================================== */

    const typingElement =
        document.querySelector(
            "[data-typing]"
        );

    if (typingElement) {

        const words = [
            "Video Editor",
            "Reel Editor",
            "Content Creator",
            "Social Media Strategist"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord =
                words[wordIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        charIndex + 1
                    );

                charIndex++;

                if (
                    charIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1500
                    );

                    return;

                }

            } else {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        charIndex - 1
                    );

                charIndex--;

                if (charIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) %
                        words.length;

                }

            }

            setTimeout(
                typeEffect,
                deleting ? 50 : 90
            );

        }

        typeEffect();

    }


    /* =====================================================
       WHATSAPP CTA BUTTONS
       ===================================================== */

    const whatsappButtons =
        document.querySelectorAll(
            "[data-whatsapp]"
        );

    whatsappButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const customMessage =
                    button.dataset.whatsapp ||
                    "Hi Suseendar, I would like to discuss my project.";

                const url =
                    "https://wa.me/917397150268?text=" +
                    encodeURIComponent(
                        customMessage
                    );

                window.open(
                    url,
                    "_blank"
                );

            }
        );

    });


    /* =====================================================
       CURSOR GLOW — DESKTOP
       ===================================================== */

    const cursorGlow =
        document.querySelector(
            ".cursor-glow"
        );

    if (
        cursorGlow &&
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        window.addEventListener(
            "mousemove",
            event => {

                cursorGlow.style.transform =
                    `translate(${event.clientX}px, ${event.clientY}px)`;

            }
        );

    }

});