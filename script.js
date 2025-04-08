// Sample data - in a real site, this would come from an API or JSON file
const logEntries = [
    {
        id: 1,
        title: "Started New Project",
        date: "2023-05-15",
        category: "work",
        content: "Today I began working on a new web development project using React and Node.js."
    },
    {
        id: 2,
        title: "Learning Journey Update",
        date: "2023-05-10",
        category: "personal",
        content: "Completed the advanced JavaScript course. Next up: diving deeper into algorithms."
    },
    {
        id: 3,
        title: "Project Milestone",
        date: "2023-05-05",
        category: "projects",
        content: "Reached the first major milestone in my personal website redesign."
    }
];

const documents = [
    {
        id: 1,
        title: "RSS and Hindutva Right Wings - A Threat to Indian Democracy",
        type: "pdf",
        date: "2023-05-12",
        size: "70 kb",
        url: "rss_threat_to_indian_unity.pdf"
    },
    {
        id: 2,
        title: "Palestinian-Israeli Conflict - A Historical Overview",
        type: "doc",
        date: "2023-05-08",
        size: "69 kb",
        url: "palestine_israel_conflict.pdf"
    }
];

// DOM elements
const contentSections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('nav a');
const recentPostsContainer = document.getElementById('recent-posts');
const logEntriesContainer = document.getElementById('log-entries');
const documentListContainer = document.getElementById('document-list');
const logSearch = document.getElementById('log-search');
const logFilter = document.getElementById('log-filter');
const docSearch = document.getElementById('doc-search');
const docFilter = document.getElementById('doc-filter');
const currentYear = document.getElementById('current-year');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();
    
    // Load initial content
    loadRecentPosts();
    loadLogEntries();
    loadDocuments();
    
    // Set up navigation
    setupNavigation();
    
    // Set up search/filter functionality
    setupFilters();
});

function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Show the corresponding content section
            const targetSection = document.querySelector(this.getAttribute('href'));
            targetSection.classList.add('active');
            
            // Smooth scroll to section
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
}

function loadRecentPosts() {
    // Sort logs by date (newest first)
    const sortedLogs = [...logEntries].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display the 3 most recent posts
    const recentLogs = sortedLogs.slice(0, 3);
    
    recentPostsContainer.innerHTML = recentLogs.map(log => `
        <div class="update-item">
            <h3 class="log-title">${log.title}</h3>
            <div class="log-meta">
                <span>${formatDate(log.date)}</span>
                <span class="log-category">${log.category}</span>
            </div>
            <p>${log.content}</p>
        </div>
    `).join('');
}

function loadLogEntries(filter = '', category = 'all') {
    let filteredLogs = [...logEntries];
    
    // Apply filters if provided
    if (filter) {
        const searchTerm = filter.toLowerCase();
        filteredLogs = filteredLogs.filter(log => 
            log.title.toLowerCase().includes(searchTerm) || 
            log.content.toLowerCase().includes(searchTerm)
        );
    }
    
    if (category !== 'all') {
        filteredLogs = filteredLogs.filter(log => log.category === category);
    }
    
    // Sort by date (newest first)
    filteredLogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display logs
    logEntriesContainer.innerHTML = filteredLogs.map(log => `
        <div class="log-entry">
            <h3 class="log-title">${log.title}</h3>
            <div class="log-meta">
                <span>${formatDate(log.date)}</span>
                <span class="log-category">${log.category}</span>
            </div>
            <p>${log.content}</p>
        </div>
    `).join('');
    
    if (filteredLogs.length === 0) {
        logEntriesContainer.innerHTML = '<p>No log entries found matching your criteria.</p>';
    }
}

function loadDocuments(filter = '', type = 'all') {
    let filteredDocs = [...documents];
    
    // Apply filters if provided
    if (filter) {
        const searchTerm = filter.toLowerCase();
        filteredDocs = filteredDocs.filter(doc => 
            doc.title.toLowerCase().includes(searchTerm)
        );
    }
    
    if (type !== 'all') {
        filteredDocs = filteredDocs.filter(doc => doc.type === type);
    }
    
    // Display documents
    documentListContainer.innerHTML = filteredDocs.map(doc => `
        <div class="document-card">
            <div class="document-thumbnail">
                <i class="${getDocumentIcon(doc.type)}"></i>
            </div>
            <div class="document-info">
                <h3 class="document-title">${doc.title}</h3>
                <div class="document-meta">
                    <span>${formatDate(doc.date)}</span>
                    <span>${doc.size}</span>
                </div>
                <a href="${doc.url}" class="download-btn" download>Download</a>
            </div>
        </div>
    `).join('');
    
    if (filteredDocs.length === 0) {
        documentListContainer.innerHTML = '<p>No documents found matching your criteria.</p>';
    }
}

function setupFilters() {
    // Log search/filter
    logSearch.addEventListener('input', function() {
        loadLogEntries(this.value, logFilter.value);
    });
    
    logFilter.addEventListener('change', function() {
        loadLogEntries(logSearch.value, this.value);
    });
    
    // Document search/filter
    docSearch.addEventListener('input', function() {
        loadDocuments(this.value, docFilter.value);
    });
    
    docFilter.addEventListener('change', function() {
        loadDocuments(docSearch.value, this.value);
    });
}

// Helper functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function getDocumentIcon(type) {
    const icons = {
        pdf: 'far fa-file-pdf',
        doc: 'far fa-file-word',
        code: 'far fa-file-code'
    };
    return icons[type] || 'far fa-file';
}