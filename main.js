        // --- Video Carousel Logic ---
        document.addEventListener('DOMContentLoaded', function() {
            const videoItems = Array.from(document.querySelectorAll('.video-carousel-track .video-item'));
            let currentCenter = 1; // Start with the second video as center
            
            function renderCarousel() {
                videoItems.forEach((item, idx) => {
                    item.classList.remove('center', 'left', 'right');
                    item.style.display = 'block'; // Always keep all items in DOM
                });
                
                // Only style 3 items at a time (left, center, right)
                if (currentCenter > 0) {
                    videoItems[currentCenter - 1].classList.add('left');
                }
                
                videoItems[currentCenter].classList.add('center');
                
                if (currentCenter < videoItems.length - 1) {
                    videoItems[currentCenter + 1].classList.add('right');
                }
                
                // Calculate transform value to keep current item centered
                const translateX = -currentCenter * 33.333 + 33.333; // Adjust for flex value
                document.querySelector('.video-carousel-track').style.transform = `translateX(${translateX}%)`;
            }
            
            // Arrow navigation
            const nextArrow = document.getElementById('video-arrow-next');
            const prevArrow = document.getElementById('video-arrow-prev');
            
            if (nextArrow && prevArrow) {
                nextArrow.addEventListener('click', function() {
                    if (currentCenter < videoItems.length - 1) {
                        currentCenter++;
                        renderCarousel();
                    }
                });
            
                prevArrow.addEventListener('click', function() {
                    if (currentCenter > 0) {
                        currentCenter--;
                        renderCarousel();
                    }
                });
            }
            
            // Video modal logic
            videoItems.forEach(item => {
                item.addEventListener('click', function() {
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
        });
// --- End Video Carousel Logic ---