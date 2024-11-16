const changelogData = [
    {
        version: "v4.8",
        changes: [
            "Upgraded image recognition on gpt-4o-mini",
            "Fixed some issues with Discord not sending subscription webhooks to our bot",
            "Assorted Bug Fixes"
        ]
    },
    {
        version: "v4.7",
        changes: [
            "Added OpenAI o1-preview and o1-mini",
            "Added Auto-Credit Refill, Features for Server Owners",
            "Bug Fixes, Improved Error Handling"
        ]
    },
    {
        version: "v4.6",
        changes: [
            "Added FLUX.1 and Google's Imagen 3 to /image command",
            "Various bug fixes"
        ]
    },
    {
        version: "v4.5.1",
        changes: [
            "Fixed image generation issues",
            "Resolved image rendering problems on certain clients"
        ]
    },
    {
        version: "v4.5 & Gemini v1.0",
        changes: [
            "Introduced ability to ping the bot for chat in any text channel",
            "Added new Gemini bot with free and Pro versions",
            "Various bug fixes"
        ]
    },
    {
        version: "v4.4",
        changes: [
            "Introduced XP Leveling system with rewards",
            "Fixed /settings in normal channels",
            "Upgraded ChatGPT to gpt-4o-mini",
            "Removed /assistant command"
        ]
    },
    {
        version: "v4.3",
        changes: [
            "Added ChatGPT Advanced tier ($5.99/month, 50,000 credits)",
            "Fixed User Apps: Summarize Message and Respond with GPT",
            "Backend upgrades"
        ]
    },
    {
        version: "v4.2",
        changes: [
            "Introduced LLaMA 3 model",
            "Upgraded Stable Diffusion and Claude models",
            "Added multi-line code support for ChatGPT",
            "Performance, backend, and visual improvements",
            "Removed deprecated image models",
            "Fixed various bugs (/video, Image/Video Gen plugin, etc.)"
        ]
    },
    {
        version: "v4.1",
        changes: [
            "Reintroduced /music command with new features",
            "Added video recognition support for GPT-4 Omni",
            "Enabled bot usage throughout Discord (limited features)",
            "Fixed issues with DMs"
        ]
    },
    {
        version: "v4.0",
        changes: [
            "Introduced /home command for chat management",
            "Added User Default Settings",
            "Enabled chat import from OpenAI",
            "Added new chat models (GPT-4o, Claude 3 Opus, Cohere, etc.)",
            "Reintroduced Video Generation feature",
            "Added Stable Diffusion 3 and Turbo models",
            "Numerous bug fixes and performance improvements",
            "Increased starting credits for new users",
            "Reduced ad rates by 50%"
        ]
    }
];


let currentPage = 0;

function displayChangelog(page) {
    const changelogContent = document.getElementById('changelog-content');
    const entry = changelogData[page];

    const versionId = entry.version.replace(/[^\w.]/g, '').toLowerCase();

    const entryHtml = `
        <div id="${versionId}" class="changelog-card">
            <h2>${entry.version}</h2>
            <ul>
                ${entry.changes.map(change => `<li>${change}</li>`).join('')}
            </ul>
        </div>
    `;
    changelogContent.innerHTML = entryHtml;

    updatePagination();
}

function updatePagination() {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageNumbers = document.getElementById('page-numbers');

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === changelogData.length - 1;

    pageNumbers.innerHTML = '';
    for (let i = 0; i < changelogData.length; i++) {
        const pageNumber = document.createElement('a');
        pageNumber.textContent = i + 1;
        pageNumber.classList.add('page-number');
        if (i === currentPage) {
            pageNumber.classList.add('active');
        }
        const versionId = changelogData[i].version.replace(/[^\w.]/g, '').toLowerCase();
        pageNumber.href = `#${versionId}`;
        pageNumber.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            displayChangelog(currentPage);
            window.history.pushState(null, '', `#${versionId}`);
        });
        pageNumbers.appendChild(pageNumber);
    }
}

function navigateToHash() {
    const hash = window.location.hash.substring(1);
    const index = changelogData.findIndex(entry => entry.version.replace(/[^\w.]/g, '').toLowerCase() === hash);
    if (index !== -1) {
        currentPage = index;
        displayChangelog(currentPage);
    }
}

window.addEventListener('load', navigateToHash);

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        displayChangelog(currentPage);
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    if (currentPage < changelogData.length - 1) {
        currentPage++;
        displayChangelog(currentPage);
    }
});

displayChangelog(currentPage);