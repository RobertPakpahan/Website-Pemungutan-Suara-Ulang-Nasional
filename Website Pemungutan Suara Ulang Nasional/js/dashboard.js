// Load user data
function loadUserData() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (currentUser) {
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userRole').textContent = currentUser.role;
    }
}

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});

// Simpan dokumen di localStorage
let uploadedDocuments = JSON.parse(localStorage.getItem('documents')) || [];

// Tampilkan dokumen
function displayDocuments() {
    const documentsList = document.getElementById('documentsList');
    
    if (uploadedDocuments.length === 0) {
        documentsList.innerHTML = '<p class="empty-message">Belum ada dokumen yang diupload</p>';
        return;
    }
    
    documentsList.innerHTML = '';
    
    uploadedDocuments.forEach((doc, index) => {
        const docElement = document.createElement('div');
        docElement.className = 'document-item';
        docElement.innerHTML = `
            <div class="document-info">
                <i class="fas fa-file-${doc.type === 'pdf' ? 'pdf' : 'word'} document-icon"></i>
                <div>
                    <div class="document-name">${doc.name}</div>
                    <div class="document-size">${formatFileSize(doc.size)}</div>
                </div>
            </div>
            <div class="document-actions">
                <button class="document-btn download-btn" data-index="${index}">
                    <i class="fas fa-download"></i>
                </button>
                <button class="document-btn delete-btn" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        documentsList.appendChild(docElement);
    });
    
    // Tambahkan event listener untuk tombol
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            downloadDocument(index);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteDocument(index);
        });
    });
}

// Format ukuran file
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Handle upload form 1
document.getElementById('uploadForm1').addEventListener('submit', function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('document1');
    if (fileInput.files.length > 0) {
        uploadDocument(fileInput.files[0], 'Document 1');
        fileInput.value = '';
    }
});

// Handle upload form 2
document.getElementById('uploadForm2').addEventListener('submit', function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('document2');
    if (fileInput.files.length > 0) {
        uploadDocument(fileInput.files[0], 'Document 2');
        fileInput.value = '';
    }
});

// Upload dokumen
function uploadDocument(file, prefix) {
    const documentType = file.name.split('.').pop().toLowerCase();
    const documentName = `${prefix}_${new Date().toISOString().slice(0, 10)}.${documentType}`;
    
    const newDocument = {
        name: documentName,
        size: file.size,
        type: documentType,
        file: URL.createObjectURL(file),
        uploadDate: new Date().toISOString()
    };
    
    uploadedDocuments.unshift(newDocument);
    localStorage.setItem('documents', JSON.stringify(uploadedDocuments));
    displayDocuments();
    
    alert(`Dokumen ${documentName} berhasil diupload!`);
}

// Download dokumen
function downloadDocument(index) {
    const doc = uploadedDocuments[index];
    const a = document.createElement('a');
    a.href = doc.file;
    a.download = doc.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Hapus dokumen
function deleteDocument(index) {
    if (confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) {
        uploadedDocuments.splice(index, 1);
        localStorage.setItem('documents', JSON.stringify(uploadedDocuments));
        displayDocuments();
    }
}

// Initialize dashboard
window.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    displayDocuments();
});