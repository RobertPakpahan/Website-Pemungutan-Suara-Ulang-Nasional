// Akun default
const defaultAccounts = [
    {
        email: "jakarta",
        password: "jakarta123",
        role: "Jakarta",
        name: "Daerah Khusus Ibu Kota Jakarta"
    },
    {
        email: "manager@xxx.id",
        password: "manager123",
        role: "manager",
        name: "Manager"
    }
];

// Handle form login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Cek akun
    const user = defaultAccounts.find(account => 
        account.email === email && account.password === password);
    
    if (user) {
        // Simpan data user di sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirect ke dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Email atau password salah!');
    }
});

// Cek jika sudah login
function checkAuth() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser && window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'login.html';
    }
}

// Panggil fungsi checkAuth saat halaman dimuat
window.addEventListener('DOMContentLoaded', checkAuth);// ... (kode sebelumnya tetap sama)

// Cek jika sudah login
function checkAuth() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser) {
        if (window.location.pathname.includes('dashboard.html') || 
            window.location.pathname.includes('admin.html')) {
            window.location.href = 'login.html';
        }
    } else {
        // Redirect berdasarkan role
        if (currentUser.role === 'admin' && window.location.pathname.includes('dashboard.html')) {
            window.location.href = 'admin.html';
        } else if (currentUser.role !== 'admin' && window.location.pathname.includes('admin.html')) {
            window.location.href = 'dashboard.html';
        }
    }
}