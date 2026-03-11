import { dataList } from "./dataStore.js";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Theme Toggle Logic
    const themeToggle = document.getElementById("themeToggle");
    const moonIcon = document.getElementById("moonIcon");
    const sunIcon = document.getElementById("sunIcon");

    const getPreferredTheme = () => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) return storedTheme;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };

    const setTheme = (theme) => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        if (theme === "dark") {
            moonIcon.style.display = "none";
            sunIcon.style.display = "block";
        } else {
            moonIcon.style.display = "block";
            sunIcon.style.display = "none";
        }
    };

    setTheme(getPreferredTheme());

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        setTheme(currentTheme === "dark" ? "light" : "dark");
    });

    // 2. Set Current Year in Footer
    document.getElementById("currentYear").textContent = new Date().getFullYear();

    // 3. Render Content and Sidebar
    const contentWrapper = document.querySelector(".content-wrapper");
    const sidebarList = document.getElementById("sidebarList");
    const noResultsMessage = document.getElementById("noResultsMessage");

    const renderSections = () => {
        dataList.forEach(data => {
            // Anchor ID
            const sectionId = `section-${data.id}`;

            // --- Build Section Content ---
            const section = document.createElement("section");
            section.className = "section-child";
            section.id = sectionId;
            section.setAttribute("data-search", `${data.heading.toLowerCase()} ${data.subHeading.toLowerCase()} ${data.content.toLowerCase()}`);

            const headingContainer = document.createElement("div");
            headingContainer.className = "heading-container";

            const h1 = document.createElement("h1");
            h1.className = "main-heading";
            h1.textContent = data.heading;

            const h3 = document.createElement("h3");
            h3.className = "sub-heading";
            h3.textContent = data.subHeading;

            headingContainer.appendChild(h1);
            headingContainer.appendChild(h3);

            const contentDiv = document.createElement("div");
            contentDiv.className = "section-child-content";

            const pContainer = document.createElement("div");
            pContainer.className = "content";
            pContainer.innerHTML = data.content; // Render HTML

            contentDiv.appendChild(pContainer);

            // Code Block (if any)
            if (data.code) {
                const pre = document.createElement("pre");
                pre.className = "code-content";

                // Code Block wrapper
                const codeNode = document.createElement("div");
                const code = document.createElement("code");
                code.id = "code";
                // Escape html tags to display properly
                code.innerHTML = data.code.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
                codeNode.appendChild(code);

                const copyBtn = document.createElement("button");
                copyBtn.className = "copy-btn";
                copyBtn.setAttribute("aria-label", "Copy code");
                // Copy Icon SVG
                copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;

                copyBtn.addEventListener("click", async () => {
                    try {
                        await navigator.clipboard.writeText(data.code.trim());
                        // Check Icon SVG
                        copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-color);"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                        setTimeout(() => {
                            copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
                        }, 2000);
                    } catch (err) {
                        console.error("Failed to copy:", err);
                        alert("Clipboard API not supported");
                    }
                });

                pre.appendChild(copyBtn);
                pre.appendChild(codeNode);
                contentDiv.appendChild(pre);
            }

            section.appendChild(headingContainer);
            section.appendChild(contentDiv);
            contentWrapper.appendChild(section);

            // --- Build Sidebar Link ---
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.className = "sidebar-list-item";
            a.href = `#${sectionId}`;
            a.textContent = data.heading;
            
            // Smooth scroll adjustment
            a.addEventListener("click", (e) => {
                e.preventDefault();
                const target = document.getElementById(sectionId);
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            });

            li.appendChild(a);
            sidebarList.appendChild(li);
        });
    };

    renderSections();

    // 4. Scroll Spy (Highlight active sidebar link)
    const sections = document.querySelectorAll(".section-child");
    const navLinks = document.querySelectorAll(".sidebar-list-item");

    window.addEventListener("scroll", () => {
        let current = "";
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Activate state when scrolled past header threshold
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // 5. Search Functionality
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        let hasVisibleSection = false;

        sections.forEach(section => {
            const searchText = section.getAttribute("data-search");
            // Sidebar syncing
            const sectionId = section.getAttribute("id");
            const sideLink = document.querySelector(`a[href="#${sectionId}"]`).parentElement;

            if (searchText.includes(query) || query === "") {
                section.style.display = "block";
                sideLink.style.display = "block";
                hasVisibleSection = true;
            } else {
                section.style.display = "none";
                sideLink.style.display = "none";
            }
        });

        // Show/hide no results message
        if (!hasVisibleSection) {
            noResultsMessage.style.display = "block";
        } else {
            noResultsMessage.style.display = "none";
        }
    });

    // Trigger scroll event on load to set initial active nav state
    window.dispatchEvent(new Event("scroll"));
});