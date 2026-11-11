
/* =========================================
   ZEE VENTURE - WEBSITE JAVASCRIPT
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

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        dots.forEach(dot => {
            dot.classList.remove("active");
        });

        currentSlide = index;

        slides[currentSlide].classList.add("active");

        if (dots[currentSlide]) {
            dots[currentSlide].classList.add("active");
        }
    }

    function nextSlide() {
        if (!slides.length) return;

        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function startSlideshow() {
        if (slides.length > 1) {
            clearInterval(slideTimer);
            slideTimer = setInterval(nextSlide, 5000);
        }
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            showSlide(index);
            startSlideshow();
        });
    });

    showSlide(0);
    startSlideshow();


    /* =====================================
       2. MOBILE NAVIGATION MENU
    ===================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            const isOpen = mainNav.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

        });

        // Close menu after clicking a navigation link.
        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", function () {

                mainNav.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");

            });

        });

    }


    /* =====================================
       3. FAQ ACCORDION
    ===================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        if (!question) return;

        question.addEventListener("click", function () {

            const isOpen = item.classList.contains("open");

            // Close all other FAQs.
            faqItems.forEach(faq => {
                faq.classList.remove("open");

                const button = faq.querySelector(".faq-question");

                if (button) {
                    button.setAttribute("aria-expanded", "false");
                }
            });

            // Open the selected FAQ if it was previously closed.
            if (!isOpen) {
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

        window.addEventListener("scroll", function () {

            if (window.scrollY > 400) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
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
       6. CLOSE MOBILE MENU ON OUTSIDE CLICK
    ===================================== */

    document.addEventListener("click", function (event) {

        if (!mainNav || !menuToggle) return;

        const clickedInsideMenu = mainNav.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            mainNav.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
        }

    });
    });

    /* =====================================
       7. GALLERY IMAGE FULL-SCREEN LIGHTBOX
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
                (index + galleryImages.length) % galleryImages.length;

            const selectedImage = galleryImages[currentImageIndex];

            lightboxImage.src = selectedImage.src;
            lightboxImage.alt = selectedImage.alt || "Project image";

            if (lightboxCaption) {
                lightboxCaption.textContent =
                    selectedImage.alt || "Zee Venture Project";
            }

            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        }

        function closeImage() {
            lightbox.classList.remove("active");
            document.body.style.overflow = "";
        }

        function showNextImage() {
            openImage(currentImageIndex + 1);
        }

        function showPreviousImage() {
            openImage(currentImageIndex - 1);
        }

        projectGrid.addEventListener("click", function (event) {
            const clickedImage = event.target.closest(".project-card img");

            if (!clickedImage) return;

            galleryImages = getGalleryImages();

            const clickedIndex = galleryImages.indexOf(clickedImage);

            if (clickedIndex !== -1) {
                openImage(clickedIndex);
            }
        });

        if (lightboxClose) {
            lightboxClose.addEventListener("click", closeImage);
        }

        if (lightboxNext) {
            lightboxNext.addEventListener("click", showNextImage);
        }

        if (lightboxPrev) {
            lightboxPrev.addEventListener("click", showPreviousImage);
        }

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeImage();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (!lightbox.classList.contains("active")) return;

            if (event.key === "Escape") closeImage();
            if (event.key === "ArrowRight") showNextImage();
            if (event.key === "ArrowLeft") showPreviousImage();
        });
    }


});
