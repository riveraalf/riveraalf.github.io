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

function openBusinessModal(businessName) {
    const card = Array.from(businessCards).find(card => {
        const title = card.querySelector('h3').textContent;
        return title === businessName;
    });
    
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
        const title = card.querySelector('h3').textContent;
        
        // Update URL with business name
        const url = new URL(window.location);
        url.searchParams.set('business', title);
        window.history.pushState({}, '', url);
        
        openBusinessModal(title);
    });
});

function closeModal() {
    businessModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Remove business parameter from URL
    const url = new URL(window.location);
    url.searchParams.delete('business');
    window.history.pushState({}, '', url);
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && businessModal.classList.contains('active')) {
        closeModal();
    }
});

// Check URL on page load
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const businessName = urlParams.get('business');
    
    if (businessName) {
        openBusinessModal(businessName);
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const businessName = urlParams.get('business');
    
    if (businessName) {
        openBusinessModal(businessName);
    } else {
        if (businessModal.classList.contains('active')) {
            businessModal.classList.remove('active');
            document.body.style.overflow = '';
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
const businessList = document.getElementById('business-list');

if (searchBox) {
    searchBox.addEventListener('input', () => {
        const term = searchBox.value.toLowerCase();
        businessList.querySelectorAll('.project-card').forEach(card => {
            const text = card.innerText.toLowerCase();
            card.style.display = text.includes(term) ? '' : 'none';
        });
    });
}