// ===== Business Card Click Handler =====
const businessCards = document.querySelectorAll('.project-card');
const businessModal = document.createElement('div');
businessModal.className = 'business-modal';
businessModal.innerHTML = `
    <div class="business-modal-overlay"></div>
    <div class="business-modal-content">
        <button class="business-modal-close">&times;</button>
        <h2 class="business-modal-title"></h2>
        <img class="business-modal-image" src="" alt="">
        <p class="business-modal-description"></p>
    </div>
`;
document.body.appendChild(businessModal);

const modalOverlay = businessModal.querySelector('.business-modal-overlay');
const modalContent = businessModal.querySelector('.business-modal-content');
const modalClose = businessModal.querySelector('.business-modal-close');
const modalTitle = businessModal.querySelector('.business-modal-title');
const modalImage = businessModal.querySelector('.business-modal-image');
const modalDescription = businessModal.querySelector('.business-modal-description');

function openBusinessModal(businessId) {
    const card = Array.from(businessCards).find(card => card.dataset.businessId === businessId);
    
    if (card) {
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        const image = card.querySelector('img').src;
        
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalImage.src = image;
        
        businessModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

businessCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        const businessId = card.dataset.businessId;
        
        // Update URL with business ID using query parameter
        const url = new URL(window.location);
        url.searchParams.set('b', businessId);
        window.history.pushState({}, '', url);
        
        openBusinessModal(businessId);
    });
});

function closeModal() {
    businessModal.classList.remove('active');
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Remove query parameters from URL
    const url = new URL(window.location);
    url.searchParams.delete('b');
    url.searchParams.delete('v');
    window.history.pushState({}, '', url);
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (businessModal.classList.contains('active') || videoModal.classList.contains('active')) {
            closeModal();
        }
    }
});

// ===== Video Modal Handler =====
const videoCards = document.querySelectorAll('.video-card');
const videoModal = document.createElement('div');
videoModal.className = 'video-modal';
videoModal.innerHTML = `
    <div class="video-modal-overlay"></div>
    <div class="video-modal-content">
        <button class="video-modal-close">&times;</button>
        <h2 class="video-modal-title"></h2>
        <div class="video-modal-wrapper">
            <iframe width="560" height="315" 
                src="" 
                title="Video" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
        <p class="video-modal-description"></p>
    </div>
`;
document.body.appendChild(videoModal);

const videoModalOverlay = videoModal.querySelector('.video-modal-overlay');
const videoModalClose = videoModal.querySelector('.video-modal-close');
const videoModalTitle = videoModal.querySelector('.video-modal-title');
const videoModalIframe = videoModal.querySelector('iframe');
const videoModalDescription = videoModal.querySelector('.video-modal-description');

function openVideoModal(videoId, businessId) {
    const card = Array.from(videoCards).find(card => card.dataset.businessId === businessId);
    
    if (card) {
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        
        videoModalTitle.textContent = title;
        videoModalDescription.textContent = description;
        videoModalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

videoCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        const videoId = card.dataset.videoId;
        const businessId = card.dataset.businessId;
        
        // Update URL with business ID and video flag
        const url = new URL(window.location);
        url.searchParams.set('b', businessId);
        url.searchParams.set('v', 'true');
        window.history.pushState({}, '', url);
        
        openVideoModal(videoId, businessId);
    });
});

videoModalClose.addEventListener('click', () => {
    closeModal();
    // Stop video playback
    videoModalIframe.src = '';
});

videoModalOverlay.addEventListener('click', () => {
    closeModal();
    // Stop video playback
    videoModalIframe.src = '';
});

// Check URL on page load
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const businessId = urlParams.get('b');
    const isVideo = urlParams.get('v');
    
    if (businessId) {
        if (isVideo === 'true') {
            // Find the video card with this business ID
            const videoCard = Array.from(videoCards).find(card => card.dataset.businessId === businessId);
            if (videoCard) {
                const videoId = videoCard.dataset.videoId;
                openVideoModal(videoId, businessId);
            }
        } else {
            openBusinessModal(businessId);
        }
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const businessId = urlParams.get('b');
    const isVideo = urlParams.get('v');
    
    if (businessId) {
        if (isVideo === 'true') {
            // Find the video card with this business ID
            const videoCard = Array.from(videoCards).find(card => card.dataset.businessId === businessId);
            if (videoCard) {
                const videoId = videoCard.dataset.videoId;
                openVideoModal(videoId, businessId);
            }
        } else {
            openBusinessModal(businessId);
        }
    } else {
        // Close any open modals when navigating back to home
        if (businessModal.classList.contains('active')) {
            businessModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (videoModal.classList.contains('active')) {
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
            videoModalIframe.src = '';
        }
    }
});

// ===== FAQ Dropdown =====
document.querySelectorAll('.dropdown-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const dropdown = button.parentElement;
        dropdown.classList.toggle('open');
    });
});

// ===== Scroll-to-Top Button =====
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Search Filter =====
const searchBox = document.getElementById('search-box');

if (searchBox) {
    searchBox.addEventListener('input', () => {
        const term = searchBox.value.toLowerCase();
        
        // Search in Featured section
        const featuredSection = document.querySelector('.featured');
        if (featuredSection) {
            featuredSection.querySelectorAll('.project-card').forEach(card => {
                const text = card.innerText.toLowerCase();
                card.style.display = text.includes(term) ? '' : 'none';
            });
        }
        
        // Search in Video Adverts section
        const videoSection = document.querySelector('.video-adverts');
        if (videoSection) {
            videoSection.querySelectorAll('.video-card').forEach(card => {
                const text = card.innerText.toLowerCase();
                card.style.display = text.includes(term) ? '' : 'none';
            });
        }
        
        // Search in All Businesses section
        const businessList = document.getElementById('business-list');
        if (businessList) {
            businessList.querySelectorAll('.project-card').forEach(card => {
                const text = card.innerText.toLowerCase();
                card.style.display = text.includes(term) ? '' : 'none';
            });
        }
    });
}