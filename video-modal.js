// Video Modal Logic
(function() {
    // Create modal HTML if not present
    let modal = document.getElementById('videoModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'videoModal';
        modal.innerHTML = `
            <div class="video-modal-overlay"></div>
            <div class="video-modal-content">
                <button class="video-modal-close">&times;</button>
                <div class="video-modal-iframe-wrapper"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const overlay = modal.querySelector('.video-modal-overlay');
    const closeBtn = modal.querySelector('.video-modal-close');
    const iframeWrapper = modal.querySelector('.video-modal-iframe-wrapper');

    function openModal(videoUrl) {
        // Extract only the video id from the url (YouTube)
        let embedUrl = videoUrl;
        if (videoUrl.includes('youtube.com/watch')) {
            const match = videoUrl.match(/v=([^&]+)/);
            if (match) {
                embedUrl = `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
            }
        } else if (videoUrl.includes('youtu.be/')) {
            const match = videoUrl.match(/youtu\.be\/([^?&]+)/);
            if (match) {
                embedUrl = `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
            }
        }
        modal.classList.add('open');
        iframeWrapper.innerHTML = `<iframe width="100%" height="400" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        iframeWrapper.innerHTML = '';
        document.body.style.overflow = '';
    }

    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });

    // Attach click to all .video-item a
    function attachVideoModalEvents() {
        document.querySelectorAll('.video-item a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(this.href);
            });
        });
    }

    // Initial attach
    attachVideoModalEvents();
    // If carousel changes, you may want to re-attach events
    window.attachVideoModalEvents = attachVideoModalEvents;
    window.openModal = openModal;
})();
