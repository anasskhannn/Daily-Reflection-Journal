document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Function to update zero-md theme based on current mode
    function applyZeroMdTheme() {
        const zeroMd = document.querySelector("zero-md");
        if (!zeroMd) return;

        // Wait for zero-md's "zero-md-rendered" event
        if (zeroMd.shadowRoot) {
            updateZeroMdStyles(zeroMd.shadowRoot);
        } else {
            // If not yet rendered, set up the event listener
            zeroMd.addEventListener("zero-md-rendered", () => {
                updateZeroMdStyles(zeroMd.shadowRoot);
            });
        }
    }

    // Helper function to update styles in shadow DOM
    function updateZeroMdStyles(shadowRoot) {
        if (!shadowRoot) return;
    
        // Find or create style element
        let styleTag = shadowRoot.querySelector("#zero-md-dark-mode-style");
        if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = "zero-md-dark-mode-style";
            shadowRoot.appendChild(styleTag);
        }
    
        // Apply appropriate styles based on dark mode state
        if (body.classList.contains("dark-mode")) {
            styleTag.textContent = `
                .markdown-body {
                    background-color: #1e1e1e !important;
                    color: #e0e0e0 !important;
                }
                .markdown-body a {
                    color: #4fc3f7 !important;
                }
                .markdown-body code {
                    background-color: #333 !important;
                    color: #ffcc00 !important;
                }
                .markdown-body pre {
                    background-color: #2d2d2d !important;
                }
                .markdown-body blockquote {
                    border-left-color: #555 !important;
                    color: #aaa !important;
                }
                .markdown-body table {
                    border-collapse: collapse !important;
                    margin-bottom: 16px !important;
                }
                .markdown-body table th {
                    background-color: #2d2d2d !important;
                    color: #e0e0e0 !important;
                    border-color: #444 !important;
                    padding: 6px 13px !important;
                }
                .markdown-body table td {
                    background-color: #1e1e1e !important;
                    color: #e0e0e0 !important;
                    border-color: #444 !important;
                    padding: 6px 13px !important;
                }
                .markdown-body table tr:nth-child(2n) td {
                    background-color: #252525 !important;
                }
                .markdown-body hr {
                    background-color: #444 !important;
                }
            `;
        } else {
            // Reset to default or light theme
            styleTag.textContent = '';
        }
    }

    // Apply stored dark mode preference on page load
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        // Update button text to reflect current state
        toggleButton.textContent = "☀️ Light Mode";
    } else {
        toggleButton.textContent = "🌙 Dark Mode";
    }

    // Toggle button event handler
    toggleButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // Store preference in localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
            toggleButton.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("dark-mode", "disabled");
            toggleButton.textContent = "🌙 Dark Mode";
        }

        applyZeroMdTheme();
    });

    // Apply theme on initial load
    applyZeroMdTheme();
});