        // --- Video Carousel Logic ---
        const videoTrack = document.querySelector('.video-carousel-track');
        const videoItems = document.querySelectorAll('.video-item');
        const prevVideoBtn = document.querySelector('.prev-video');
        const nextVideoBtn = document.querySelector('.next-video');

        if (videoTrack && videoItems.length > 0 && prevVideoBtn && nextVideoBtn) {
            const itemsToShow = 3; // Number of items visible at once
            const totalItems = videoItems.length;
            const itemWidth = videoItems[0].offsetWidth + 10; // Width + margin (5px each side)
            let currentVideoIndex = 0;

            function updateVideoCarousel() {
                const offset = -currentVideoIndex * itemWidth;
                videoTrack.style.transform = `translateX(${offset}px)`;

                // Disable/Enable buttons at ends
                prevVideoBtn.disabled = currentVideoIndex === 0;
                nextVideoBtn.disabled = currentVideoIndex >= totalItems - itemsToShow;
            }

            nextVideoBtn.addEventListener('click', () => {
                if (currentVideoIndex < totalItems - itemsToShow) {
                    currentVideoIndex++;
                    updateVideoCarousel();
                }
            });

            prevVideoBtn.addEventListener('click', () => {
                if (currentVideoIndex > 0) {
                    currentVideoIndex--;
                    updateVideoCarousel();
                }
            });

            // Initial setup
            updateVideoCarousel();

            // Optional: Recalculate on resize
            window.addEventListener('resize', () => {
                // Basic recalculation - might need debouncing for performance
                 const newItemWidth = videoItems[0].offsetWidth + 10;
                 if (newItemWidth !== itemWidth) { // Recalculate only if width changed
                     itemWidth = newItemWidth;
                     updateVideoCarousel(); // Reapply transform based on new width
                 }
            });
        }
            function updateVideoClasses() {
            document.querySelectorAll('.video-item').forEach((item, idx) => {
                item.classList.toggle('center', idx === currentVideoIndex + 1); // +1 if 3 shown, center is middle
            });
        }
        // --- End Video Carousel Logic ---