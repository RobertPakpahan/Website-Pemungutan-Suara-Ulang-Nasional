// Data dokumen contoh
const sampleDocuments = [
    {
        id: 1,
        name: "Document_1_2023.pdf",
        type: "pdf",
        size: 2456789,
        user: "Manager",
        status: "approved",
        uploadDate: "2023-06-15",
        comment: "Dokumen lengkap dan valid"
    },
    {
        id: 2,
        name: "Document_2_2023.docx",
        type: "docx",
        size: 1876543,
        user: "Supervisor",
        status: "pending",
        uploadDate: "2023-06-16",
        comment: "Menunggu verifikasi"
    },
    {
        id: 3,
        name: "Lampiran_Proyek.pdf",
        type: "pdf",
        size: 3456789,
        user: "Staff",
        status: "rejected",
        uploadDate: "2023-06-14",
        comment: "Format tidak sesuai"
    }
];

// Load admin data
function loadAdminData() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (currentUser) {
        document.getElementById('adminName').textContent = currentUser.name;
        
        // Hanya admin yang bisa akses
        if (currentUser.role !== 'admin') {
            window.location.href = 'dashboard.html';
        }
    } else {
        window.location.href = 'login.html';
    }
}

// Tampilkan dokumen di admin
function renderAdminDocuments(documents = sampleDocuments) {
    const container = document.getElementById('adminDocumentList');
    container.innerHTML = '';
    
    if (documents.length === 0) {
        container.innerHTML = '<div class="empty-message">Tidak ada dokumen</div>';
        return;
    }
    
    documents.forEach(doc => {
        const docElement = document.createElement('div');
        docElement.className = `admin-document-item ${doc.status}`;
        
        // Status icon
        let statusIcon, statusClass;
        switch(doc.status) {
            case 'approved':
                statusIcon = '<i class="fas fa-check-circle"></i>';
                statusClass = 'approved';
                break;
            case 'rejected':
                statusIcon = '<i class="fas fa-times-circle"></i>';
                statusClass = 'rejected';
                break;
            default:
                statusIcon = '<i class="fas fa-clock"></i>';
                statusClass = 'pending';
        }
        
        docElement.innerHTML = `
            <div class="status-icon ${statusClass}">
                ${statusIcon}
                <span class="status-text">${doc.status === 'approved' ? 'Disetujui' : doc.status === 'rejected' ? 'Ditolak' : 'Menunggu'}</span>
            </div>
            <div class="admin-document-info">
                <i class="fas fa-file-${doc.type === 'pdf' ? 'pdf' : 'word'} document-icon"></i>
                <div>
                    <div class="document-name">${doc.name}</div>
                    <div class="document-meta">
                        <span>${formatFileSize(doc.size)}</span>
                        <span>•</span>
                        <span>${doc.uploadDate}</span>
                    </div>
                </div>
            </div>
            <div class="admin-document-user">
                <span>${doc.user}</span>
                <small>${doc.comment}</small>
            </div>
            <div class="admin-actions">
                <button class="admin-btn view" data-id="${doc.id}">
                    <i class="fas fa-eye"></i> Lihat
                </button>
                ${doc.status !== 'approved' ? 
                    `<button class="admin-btn approve" data-id="${doc.id}">
                        <i class="fas fa-check"></i> Setuju
                    </button>` : ''
                }
                ${doc.status !== 'rejected' ? 
                    `<button class="admin-btn reject" data-id="${doc.id}">
                        <i class="fas fa-times"></i> Tolak
                    </button>` : ''
                }
            </div>
        `;
        
        container.appendChild(docElement);
    });
    
    // Tambahkan event listeners
    document.querySelectorAll('.admin-btn.view').forEach(btn => {
        btn.addEventListener('click', function() {
            const docId = this.getAttribute('data-id');
            viewDocument(docId);
        });
    });
    
    document.querySelectorAll('.admin-btn.approve').forEach(btn => {
        btn.addEventListener('click', function() {
            const docId = this.getAttribute('data-id');
            updateDocumentStatus(docId, 'approved');
        });
    });
    
    document.querySelectorAll('.admin-btn.reject').forEach(btn => {
        btn.addEventListener('click', function() {
            const docId = this.getAttribute('data-id');
            updateDocumentStatus(docId, 'rejected');
        });
    });
}

// View document
function viewDocument(docId) {
    const doc = sampleDocuments.find(d => d.id == docId);
    alert(`Melihat dokumen: ${doc.name}\nStatus: ${doc.status}\nKomentar: ${doc.comment}`);
}

// Update document status
function updateDocumentStatus(docId, status) {
    const doc = sampleDocuments.find(d => d.id == docId);
    if (doc) {
        doc.status = status;
        doc.comment = status === 'approved' ? 'Dokumen telah disetujui' : 'Dokumen ditolak';
        renderAdminDocuments();
        alert(`Status dokumen ${doc.name} telah diupdate menjadi ${status}`);
    }
}

// Filter documents
document.getElementById('statusFilter').addEventListener('change', function() {
    const status = this.value;
    if (status === 'all') {
        renderAdminDocuments();
    } else {
        const filtered = sampleDocuments.filter(doc => doc.status === status);
        renderAdminDocuments(filtered);
    }
});

// Search documents
document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filtered = sampleDocuments.filter(doc => 
        doc.name.toLowerCase().includes(query) || 
        doc.user.toLowerCase().includes(query)
    );
    renderAdminDocuments(filtered);
});

// Initialize admin dashboard
window.addEventListener('DOMContentLoaded', function() {
    loadAdminData();
    renderAdminDocuments();
});