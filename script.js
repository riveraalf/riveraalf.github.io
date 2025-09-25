// ===== Theme Toggle =====
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggleButton.textContent = '☀️ Light Mode';
}

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        toggleButton.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        toggleButton.textContent = '🌙 Dark Mode';
        localStorage.setItem('theme', 'light');
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

// ===== Multi-Category Filter =====
let selectedCategories = [];

document.querySelectorAll('.category-filters button').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        if (filter === 'All') {
            // Reset filter
            selectedCategories = [];
            document.querySelectorAll('.category-filters button').forEach(btn => btn.classList.remove('active'));
            businessList.querySelectorAll('.project-card').forEach(card => card.style.display = '');
            return;
        }

        // Toggle category selection
        if (selectedCategories.includes(filter)) {
            selectedCategories = selectedCategories.filter(f => f !== filter);
            button.classList.remove('active');
        } else {
            selectedCategories.push(filter);
            button.classList.add('active');
        }

        // Filter logic
        businessList.querySelectorAll('.project-card').forEach(card => {
            const cardCategories = card.dataset.category.split(',').map(c => c.trim());
            const matches = selectedCategories.some(cat => cardCategories.includes(cat));

            if (matches || selectedCategories.length === 0) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});