        // --- Video Carousel Logic ---
document.addEventListener('DOMContentLoaded', function() {
    const videoItems = Array.from(document.querySelectorAll('.video-carousel-track .video-item'));
    let currentCenter = 1; // Start with the second video as center (so 3 videos visible: 0,1,2)
    
    function renderCarousel() {
        videoItems.forEach((item, idx) => {
            item.classList.remove('center', 'left', 'right');
            item.style.display = 'none';
        });
        // Show 3 videos: left, center, right (looping)
        const total = videoItems.length;
        const leftIdx = (currentCenter - 1 + total) % total;
        const centerIdx = currentCenter;
        const rightIdx = (currentCenter + 1) % total;
        videoItems[leftIdx].classList.add('left');
        videoItems[leftIdx].style.display = 'block';
        videoItems[centerIdx].classList.add('center');
        videoItems[centerIdx].style.display = 'block';
        videoItems[rightIdx].classList.add('right');
        videoItems[rightIdx].style.display = 'block';
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
});
// --- End Video Carousel Logic ---