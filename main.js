        // --- Hamburger menu toggle logic ---
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    hamburger && hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('open');
    });
    // Close menu when a link is clicked (mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
        });
    });
});

// --- Video Carousel Logic ---
document.addEventListener('DOMContentLoaded', function() {
    const videoItems = Array.from(document.querySelectorAll('.video-carousel-track .video-item'));
    let currentCenter = 1; // Start with the second video as center (so 3 videos visible: 0,1,2)
    
    function renderCarousel() {
        videoItems.forEach((item, idx) => {
            item.classList.remove('center', 'left', 'right');
            item.style.display = 'none';
        });
        const total = videoItems.length;
        const leftIdx = (currentCenter - 1 + total) % total;
        const centerIdx = currentCenter;
        const rightIdx = (currentCenter + 1) % total;
        // For mobile, only show center
        if (window.innerWidth <= 900) {
            videoItems[centerIdx].classList.add('center');
            videoItems[centerIdx].style.display = 'block';
        } else {
            videoItems[leftIdx].classList.add('left');
            videoItems[leftIdx].style.display = 'block';
            videoItems[centerIdx].classList.add('center');
            videoItems[centerIdx].style.display = 'block';
            videoItems[rightIdx].classList.add('right');
            videoItems[rightIdx].style.display = 'block';
        }
    }
    
    // Arrow navigation
    const nextArrow = document.getElementById('video-arrow-next');
    const prevArrow = document.getElementById('video-arrow-prev');
    
    if (nextArrow && prevArrow) {
        nextArrow.addEventListener('click', function() {
            currentCenter = (currentCenter + 1) % videoItems.length;
            renderCarousel();
            if (window.attachVideoModalEvents) window.attachVideoModalEvents();
        });
        prevArrow.addEventListener('click', function() {
            currentCenter = (currentCenter - 1 + videoItems.length) % videoItems.length;
            renderCarousel();
            if (window.attachVideoModalEvents) window.attachVideoModalEvents();
        });
    }
    
    // Video modal logic
    videoItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only trigger modal if clicking center video
            if (!this.classList.contains('center')) return;
            const url = this.getAttribute('data-url');
            if (window.openModal) {
                window.openModal(url);
            } else {
                window.open(url, '_blank');
            }
        });
    });
    
    // Initial render
    renderCarousel();
    if (window.attachVideoModalEvents) window.attachVideoModalEvents();
    // Re-render on resize for responsiveness
    window.addEventListener('resize', renderCarousel);
});
// --- End Video Carousel Logic ---