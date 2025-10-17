document.addEventListener('DOMContentLoaded', function() {
    const platformButtons = document.querySelectorAll('.platform-btn');
    const generateBtn = document.getElementById('generateBtn');
    const resultsSection = document.getElementById('results');
    const platformResults = document.getElementById('platformResults');

    let selectedPlatform = 'all';

    platformButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            platformButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedPlatform = this.dataset.platform;
        });
    });

    generateBtn.addEventListener('click', generateLinks);

    function generateLinks() {
        const amazonUrl = document.getElementById('amazonUrl').value;
        const trackingId = document.getElementById('trackingId').value;
        const productName = document.getElementById('productName').value || 'Amazon Product';

        if (!amazonUrl || !trackingId) {
            alert('Please enter both Amazon URL and Tracking ID');
            return;
        }

        if (!amazonUrl.includes('amazon.')) {
            alert('Please enter a valid Amazon URL');
            return;
        }

        const affiliateLink = generateAffiliateLink(amazonUrl, trackingId);
        const platforms = selectedPlatform === 'all' 
            ? ['instagram', 'youtube', 'twitter', 'tiktok'] 
            : [selectedPlatform];

        displayResults(platforms, affiliateLink, productName);
    }

    function generateAffiliateLink(url, trackingId) {
        let cleanUrl = url.split('?')[0].split('&')[0];
        
        if (cleanUrl.includes('?')) {
            return `${cleanUrl}&tag=${trackingId}`;
        } else {
            return `${cleanUrl}?tag=${trackingId}`;
        }
    }

    function displayResults(platforms, affiliateLink, productName) {
        platformResults.innerHTML = '';
        
        platforms.forEach(platform => {
            const content = generatePlatformContent(platform, affiliateLink, productName);
            const platformCard = createPlatformCard(platform, content);
            platformResults.appendChild(platformCard);
        });

        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    function generatePlatformContent(platform, affiliateLink, productName) {
        const platforms = {
            instagram: {
                name: 'Instagram',
                icon: '📷',
                content: {
                    bio: `Check out ${productName}! 👉 ${affiliateLink}`,
                    story: `Swipe up for ${productName}! 🔥`,
                    caption: `Love this ${productName}! 💫\nLink in bio 👆\n\n#AmazonFind #ProductReview`
                }
            },
            youtube: {
                name: 'YouTube', 
                icon: '📺',
                content: `Products mentioned:\n\n${productName} - ${affiliateLink}\n\nAffiliate links - thanks for support! 👍`
            },
            twitter: {
                name: 'Twitter',
                icon: '🐦', 
                content: `Just found this amazing ${productName} on Amazon! 👀\n\n${affiliateLink}\n\n#AmazonFind #Deals`
            },
            tiktok: {
                name: 'TikTok',
                icon: '🎵',
                content: `This ${productName} is incredible! 🤯\nLink in bio! 👆\n\n#TikTokMadeMeBuyIt #AmazonFind`
            }
        };

        return platforms[platform];
    }

    function createPlatformCard(platform, content) {
        const card = document.createElement('div');
        card.className = 'platform-result-card';
        
        let cardContent = '';
        
        if (platform === 'instagram') {
            cardContent = `
                <div class="platform-header">
                    <h4>${content.icon} ${content.name}</h4>
                </div>
                <div class="content-section">
                    <strong>Bio Text:</strong>
                    <div class="generated-content">${content.content.bio}</div>
                    <button class="copy-btn" onclick="copyToClipboard('${content.content.bio.replace(/'/g, "\\'")}')">Copy Bio</button>
                </div>
                <div class="content-section">
                    <strong>Story Mention:</strong>
                    <div class="generated-content">${content.content.story}</div>
                    <button class="copy-btn" onclick="copyToClipboard('${content.content.story.replace(/'/g, "\\'")}')">Copy Story</button>
                </div>
                <div class="content-section">
                    <strong>Post Caption:</strong>
                    <div class="generated-content">${content.content.caption}</div>
                    <button class="copy-btn" onclick="copyToClipboard('${content.content.caption.replace(/'/g, "\\'")}')">Copy Caption</button>
                </div>
            `;
        } else {
            cardContent = `
                <div class="platform-header">
                    <h4>${content.icon} ${content.name}</h4>
                </div>
                <div class="generated-content">${content.content}</div>
                <button class="copy-btn" onclick="copyToClipboard('${content.content.replace(/'/g, "\\'")}')">Copy Content</button>
            `;
        }
        
        card.innerHTML = cardContent;
        return card;
    }
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard! ✅');
    }).catch(err => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Copied to clipboard! ✅');
    });
}
