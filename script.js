// Mobile Navigation Drawer Toggle
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
const mobileNavBackdrop = document.getElementById("mobile-nav-backdrop");

function closeMobileMenu() {
    if (!menuToggle || !mobileNav) return;
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("active");
    mobileNav.setAttribute("aria-hidden", "true");
    if (mobileNavBackdrop) {
        mobileNavBackdrop.classList.remove("active");
    }
    document.body.style.overflow = "";
}

function openMobileMenu() {
    if (!menuToggle || !mobileNav) return;
    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    mobileNav.classList.add("active");
    mobileNav.setAttribute("aria-hidden", "false");
    if (mobileNavBackdrop) {
        mobileNavBackdrop.classList.add("active");
    }
    document.body.style.overflow = "hidden";
}

if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
        const isCurrentlyActive = menuToggle.classList.contains("active");
        if (isCurrentlyActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    if (mobileNavBackdrop) {
        mobileNavBackdrop.addEventListener("click", closeMobileMenu);
    }

    // Close on Escape key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && menuToggle.classList.contains("active")) {
            closeMobileMenu();
        }
    });
}

// Smooth scroll with dynamic sticky header offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#") return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();

            // Close mobile menu if open
            closeMobileMenu();

            const headerEl = document.querySelector("header");
            const headerOffset = headerEl ? headerEl.offsetHeight + 10 : 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Update active navigation links on scroll (Desktop + Mobile)
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    const headerOffset = document.querySelector("header")?.offsetHeight || 70;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerOffset - 40;
        const sectionHeight = section.offsetHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });

    mobileNavLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
}, { passive: true });

// Prevent scroll restoration on page refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Scroll to top on page load
window.addEventListener('load', () => {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
});