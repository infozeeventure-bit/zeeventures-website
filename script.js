
/* =========================================
   ZEE VENTURE - WEBSITE JAVASCRIPT
   CORRECTED VERSION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       1. HERO IMAGE SLIDESHOW
    ===================================== */

    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");

    let currentSlide = 0;
    let slideTimer;

    function showSlide(index) {

        if (!slides.length) return;

        currentSlide =
            ((index % slides.length) + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentSlide);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function startSlideshow() {

        clearInterval(slideTimer);

        if (slides.length > 1) {
            slideTimer = setInterval(nextSlide, 5000);
        }
    }

    dots.forEach((dot, index) => {

        dot.addEventListener("click", function () {
            showSlide(index);
            startSlideshow();
        });

    });

    if (slides.length) {
        showSlide(0);
        startSlideshow();
    }


    /* =====================================
       2. MOBILE NAVIGATION MENU
    ===================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    function closeMobileMenu() {

        if (!menuToggle || !mainNav) return;

        mainNav.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );
    }

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            const isOpen = mainNav.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMobileMenu);

        });

        document.addEventListener("click", function (event) {

            const clickedInsideMenu =
                mainNav.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMobileMenu();
            }
        });
    }


    /* =====================================
       3. FAQ ACCORDION
    ===================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        if (!question) return;

        question.setAttribute(
            "aria-expanded",
            item.classList.contains("open") ? "true" : "false"
        );

        question.addEventListener("click", function () {

            const wasOpen = item.classList.contains("open");

            faqItems.forEach(faq => {

                faq.classList.remove("open");

                const button = faq.querySelector(".faq-question");

                if (button) {
                    button.setAttribute("aria-expanded", "false");
                }
            });

            if (!wasOpen) {

                item.classList.add("open");

                question.setAttribute("aria-expanded", "true");
            }
        });
    });


    /* =====================================
       4. BACK TO TOP BUTTON
    ===================================== */

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        function updateBackToTop() {

            backToTop.classList.toggle(
                "show",
                window.scrollY > 400
            );
        }

        let scrollScheduled = false;

        window.addEventListener("scroll", function () {

            if (scrollScheduled) return;

            scrollScheduled = true;

            window.requestAnimationFrame(function () {

                updateBackToTop();
                scrollScheduled = false;

            });

        }, { passive: true });

        updateBackToTop();

        backToTop.addEventListener("click", function () {

            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            window.scrollTo({
                top: 0,
                behavior: reduceMotion ? "auto" : "smooth"
            });
        });
    }


    /* =====================================
       5. AUTOMATIC COPYRIGHT YEAR
    ===================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }


    /* =====================================
       6. GALLERY IMAGE FULL-SCREEN LIGHTBOX
    ===================================== */

    const projectGrid = document.getElementById("projectGrid");
    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");

    if (projectGrid && lightbox && lightboxImage) {

        let currentImageIndex = 0;
        let galleryImages = [];

        function getGalleryImages() {

            return Array.from(
                projectGrid.querySelectorAll(".project-card img")
            );
        }

        function openImage(index) {

            galleryImages = getGalleryImages();

            if (!galleryImages.length) return;

            currentImageIndex =
                ((index % galleryImages.length) +
                galleryImages.length) % galleryImages.length;

            const selectedImage =
                galleryImages[currentImageIndex];

            lightboxImage.src = selectedImage.src;

            lightboxImage.alt =
                selectedImage.alt || "Project image";

            if (lightboxCaption) {

                lightboxCaption.textContent =
                    selectedImage.alt || "Zee Venture Project";
            }

            lightbox.classList.add("active");

            lightbox.setAttribute("aria-hidden", "false");

            document.body.style.overflow = "hidden";
        }

        function closeImage() {

            lightbox.classList.remove("active");

            lightbox.setAttribute("aria-hidden", "true");

            document.body.style.overflow = "";
        }

        function showNextImage() {
            openImage(currentImageIndex + 1);
        }

        function showPreviousImage() {
            openImage(currentImageIndex - 1);
        }

        projectGrid.addEventListener("click", function (event) {

            const clickedImage =
                event.target.closest(".project-card img");

            if (!clickedImage) return;

            galleryImages = getGalleryImages();

            const clickedIndex =
                galleryImages.indexOf(clickedImage);

            if (clickedIndex !== -1) {
                openImage(clickedIndex);
            }
        });

        if (lightboxClose) {

            lightboxClose.addEventListener(
                "click",
                closeImage
            );
        }

        if (lightboxNext) {

            lightboxNext.addEventListener(
                "click",
                showNextImage
            );
        }

        if (lightboxPrev) {

            lightboxPrev.addEventListener(
                "click",
                showPreviousImage
            );
        }

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeImage();
            }
        });

        document.addEventListener("keydown", function (event) {

            if (!lightbox.classList.contains("active")) {
                return;
            }

            if (event.key === "Escape") {
                closeImage();
            }

            if (event.key === "ArrowRight") {
                showNextImage();
            }

            if (event.key === "ArrowLeft") {
                showPreviousImage();
            }
        });
    }

});
