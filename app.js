document.addEventListener("DOMContentLoaded", () => {
    
    // ----------------------------------------------------
    // 1. App Navigation Setup (Single Page Application UX)
    // ----------------------------------------------------
    const navItems = document.querySelectorAll('.nav-links li');
    const viewSections = document.querySelectorAll('.view-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove 'active' state from all tabs
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Set current tab to active
            item.classList.add('active');

            // Hide all main content views smoothly
            viewSections.forEach(section => {
                section.classList.remove('active-view');
            });

            // Target the linked ID and reveal it
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active-view');

            // Close sidebar automatically on mobile
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('open');
            }
        });
    });

    // ----------------------------------------------------
    // 2. Mobile Sidebar Drawer Logic
    // ----------------------------------------------------
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.getElementById('sidebar');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }

    // ----------------------------------------------------
    // 3. Reports Chart Rendering (Chart.js Injection)
    // ----------------------------------------------------
    
    // Render: Cost Distribution Pie Chart
    const pieCtxEl = document.getElementById('costPieChart');
    if (pieCtxEl) {
        const pieCtx = pieCtxEl.getContext('2d');
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['Material Cost', 'Labor Cost', 'Overhead', 'Transport Logistics'],
                datasets: [{
                    data: [18450, 12600, 2600, 1100],
                    backgroundColor: [
                        '#2563eb', // primary blue
                        '#10b981', // green success
                        '#f59e0b', // warm overlay
                        '#64748b'  // grey tone
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        position: 'bottom',
                        labels: { padding: 20 }
                    }
                }
            }
        });
    }

    // Render: Historical Comparison Bar Chart
    const barCtxEl = document.getElementById('costBarChart');
    if (barCtxEl) {
        const barCtx = barCtxEl.getContext('2d');
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
                datasets: [
                    {
                        label: 'Projected Base Cost ($)',
                        data: [13000, 15500, 14200, 13800],
                        backgroundColor: '#e2e8f0',
                        borderRadius: 4
                    },
                    {
                        label: 'Optimized Cost (Post Analysis) ($)',
                        data: [11500, 12250, 11000, 10480],
                        backgroundColor: '#1e3a8a',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) { return '$' + value; }
                        }
                    }
                },
                plugins: {
                    legend: { 
                        position: 'bottom',
                        labels: { padding: 20 }
                    }
                }
            }
        });
    }

});
