// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Animation on scroll
const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.section-title, .section-subtitle, .about-image, .about-text, .news-card, .download-card').forEach(el => {
        observer.observe(el);
    });
}

// Set active nav link based on current page
const setActiveNavLink = () => {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    setActiveNavLink();
});

// Data provinsi Indonesia
const provinsi = [
    "Kab. Siak", "Kab. Barito Utara", "Kab. Magetan", "Kab. Bangka Barat", "Kab. Buru",
    "Kota Sabang", "Kab. Banggai", "Kab. Pulau Taliabu","Kab. kepulauan Talaud", "Kab. Bungo",
    "Kab. Serang", "Kota Banjar Baru", "Kab. pasaman", "Kab. Tasikmalaya", "Kab. Empat Lawang",
    "Kab. Kutai kartanegara", "Kab. Gorontalo Utara", "Kab. Bengkulu Selatan", "Kab. Parigi Moutong", "Kab. Pesarawan",
    "Kota Palopo", "Kab. Mahakam Ulu", "Prov. Papua", "Kab. Boven Digoel",
    "Kota Pangkal Pinang", "Kab. Bangka"
];

// Fungsi untuk mendapatkan status acak
function getRandomStatus() {
    const statuses = ['approved', 'rejected', 'warning'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

// Fungsi untuk menampilkan list daerah
function displayDaerahList() {
    const daerahList = document.getElementById('daerahList');
    
    provinsi.forEach((prov, index) => {
        const row = document.createElement('tr');
        
        // Generate random status for each document type
        const nphdStatus = getRandomStatus();
        const sp2dStatus = getRandomStatus();
        const psuStatus = getRandomStatus();
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${prov}</td>
            <td>
                <div class="status-icon status-${nphdStatus}">
                    <i class="fas fa-${nphdStatus === 'approved' ? 'check' : nphdStatus === 'rejected' ? 'times' : 'exclamation'}"></i>
                </div>
            </td>
            <td>
                <div class="status-icon status-${sp2dStatus}">
                    <i class="fas fa-${sp2dStatus === 'approved' ? 'check' : sp2dStatus === 'rejected' ? 'times' : 'exclamation'}"></i>
                </div>
            </td>
            <td>
                <div class="status-icon status-${psuStatus}">
                    <i class="fas fa-${psuStatus === 'approved' ? 'check' : psuStatus === 'rejected' ? 'times' : 'exclamation'}"></i>
                </div>
            </td>
        `;
        
        daerahList.appendChild(row);
    });
}

// Panggil fungsi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    setActiveNavLink();
    displayDaerahList(); // Tambahkan ini
});