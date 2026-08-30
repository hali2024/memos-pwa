(function() {
const originalFetch = window.fetch;

window.fetch = async function(...args) {
const response = await originalFetch.apply(this, args);
const url = typeof args[0] === 'string' ? args[0] : (args[0]?.url || '');

if (url.includes('CreateMemo')) {
  setTimeout(showToast, 800);
  setTimeout(launchConfetti, 600);
}

return response;

};

function showToast() {
const old = document.getElementById('memo-toast');
if (old) old.remove();
const toast = document.createElement('div');
toast.id = 'memo-toast';
toast.textContent = '🧸 Another one for the archive!';
Object.assign(toast.style, {
position: 'fixed',
bottom: '48px',
left: '0',
right: '0',
margin: '0 auto',
width: 'fit-content',
maxWidth: '80vw',
backgroundColor: '#eddfc8',
color: '#7a3b1e',
padding: '12px 28px',
borderRadius: '30px',
border: '1px solid #d4a574',
fontFamily: "'Noto Serif SC', serif",
fontSize: '15px',
boxShadow: '0 4px 20px rgba(160,82,45,0.18)',
zIndex: '99999',
opacity: '0',
transition: 'opacity 0.35s ease, transform 0.35s ease',
pointerEvents: 'none',
textAlign: 'center',
transform: 'translateY(16px)',
});
document.body.appendChild(toast);
requestAnimationFrame(() => requestAnimationFrame(() => {
toast.style.opacity = '1';
toast.style.transform = 'translateY(0)';
}));
setTimeout(() => {
toast.style.opacity = '0';
toast.style.transform = 'translateY(16px)';
setTimeout(() => toast.remove(), 400);
}, 3000);
}

function launchConfetti() {
const colors = ['#d4a574','#e8c99a','#c49060','#f5ede0','#a0522d','#eddfc8'];
const symbols = ['❀','✿','✦','✧','⋆','★','✽','❋'];

for (let i = 0; i < 80; i++) {
  const useSymbol = Math.random() > 0.4;
  const el = document.createElement(useSymbol ? 'span' : 'div');

  if (useSymbol) {
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    Object.assign(el.style, {
      position: 'fixed',
      fontSize: (10 + Math.random() * 14) + 'px',
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100 + 'vw',
      top: '-20px',
      zIndex: '99998',
      pointerEvents: 'none',
      transition: `transform ${1.2 + Math.random()}s ease, opacity 1.5s ease`,
      opacity: '1',
      display: 'inline-block',
    });
  } else {
    const size = Math.random() * 8 + 4;
    Object.assign(el.style, {
      position: 'fixed',
      width: size + 'px',
      height: size + 'px',
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      left: Math.random() * 100 + 'vw',
      top: '-10px',
      zIndex: '99998',
      pointerEvents: 'none',
      transition: `transform ${1.2 + Math.random()}s ease, opacity 1.5s ease`,
      opacity: '1',
    });
  }

  document.body.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.transform = `translateY(${80 + Math.random() * 40}vh) rotate(${Math.random() * 720}deg)`;
    el.style.opacity = '0';
  }));
  setTimeout(() => el.remove(), 2500);
}

}
})();

document.addEventListener('click', function(e) {
const emojis = ['✦','✧','·','⋆','❀','✿'];
for (let i = 0; i < 6; i++) {
const el = document.createElement('span');
el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
const angle = (Math.PI * 2 / 6) * i;
const dist = 30 + Math.random() * 30;
Object.assign(el.style, {
position: 'fixed',
left: e.clientX + 'px',
top: e.clientY + 'px',
fontSize: (10 + Math.random() * 8) + 'px',
color: ['#d4a574','#c49060','#a0522d','#e8c99a'][Math.floor(Math.random()*4)],
pointerEvents: 'none',
zIndex: '99997',
transition: 'transform 0.6s ease, opacity 0.6s ease',
opacity: '1',
transform: 'translate(-50%, -50%)',
});
document.body.appendChild(el);
requestAnimationFrame(() => requestAnimationFrame(() => {
el.style.transform = "translate(calc(-50% + ${Math.cos(angle)*dist}px), calc(-50% + ${Math.sin(angle)*dist}px))";
el.style.opacity = '0';
}));
setTimeout(() => el.remove(), 700);
}
});

(function() {
const style = document.createElement('style');
style.textContent = ".memo-slide-in { opacity: 0; transform: translateY(24px); transition: opacity 0.5s ease, transform 0.5s ease; } .memo-slide-in.visible { opacity: 1; transform: translateY(0); }";
document.head.appendChild(style);

function animateCards() {
const cards = document.querySelectorAll('div[class*="rounded"][class*="border"]:not(button):not(input):not(nav):not(header)');
cards.forEach((card, i) => {
if (card.classList.contains('memo-slide-in')) return;
card.classList.add('memo-slide-in');
setTimeout(() => card.classList.add('visible'), i * 50);
});
}

setTimeout(animateCards, 300);
const observer = new MutationObserver(() => setTimeout(animateCards, 100));
observer.observe(document.body, { childList: true, subtree: true });
})();

(function() {
const io = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = '1';
entry.target.style.transform = 'translateY(0)';
io.unobserve(entry.target);
}
});
}, { threshold: 0.1 });

function observe() {
document.querySelectorAll('div[class*="rounded"][class*="border"]:not(button):not(input):not(nav):not(header)').forEach(el => {
if (el.dataset.observed) return;
el.dataset.observed = '1';
el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
el.style.opacity = '0';
el.style.transform = 'translateY(20px)';
io.observe(el);
});
}

setTimeout(observe, 500);
new MutationObserver(() => setTimeout(observe, 100)).observe(document.body, { childList: true, subtree: true });
})();

(function() {
if (document.getElementById('custom-cat-bubble')) return;

const style = document.createElement('style');
style.innerHTML = `
  #custom-cat-bubble {
    position: fixed; bottom: 120px; right: 20px; width: 140px;
    background-color: rgba(253, 246, 235, 0.95) !important;
    border: 1.5px solid rgba(210, 180, 140, 0.8) !important;
    color: #5c4033 !important; border-radius: 12px; font-size: 13px;
    padding: 10px 12px; box-shadow: 0 4px 15px rgba(92, 64, 51, 0.08) !important;
    font-family: 'Noto Serif SC', serif; z-index: 999999;
    opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
  }
  #custom-cat-bubble::after {
    content: ''; position: absolute; bottom: -10px; right: 25px;
    border-width: 10px 10px 0; border-style: solid;
    border-color: rgba(210, 180, 140, 0.8) transparent transparent transparent;
  }
  #custom-cat-bubble::before {
    content: ''; position: absolute; bottom: -8px; right: 27px;
    border-width: 8px 8px 0; border-style: solid;
    border-color: rgba(253, 246, 235, 1) transparent transparent transparent; z-index: 1;
  }
`;
document.head.appendChild(style);

const bubble = document.createElement('div');
bubble.id = 'custom-cat-bubble';
document.body.appendChild(bubble);

const petsConfig = [
    {
        name: 'Tororo (傲娇白猫)',
        modelPath: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-tororo/assets/tororo.model.json',
        greeting: '喵~ 你来啦！🐈',
        sleepMsg: '好啦好啦，原谅你了 \n(本喵要去睡午觉了)',
        wakeupMsg: '呼~ 睡得好饱！我回来啦 🐈',
        idleMessages: [
            '盯——（它正看着你）👀', '今天有给我准备小鱼干吗？🐟',
            '你在写什么？让本喵康康~', '好困哦……打了个哈欠 ',
            '（甩尾巴）别光看我，快去发帖！'
        ],
        pokeReactions: [
            '喵呜~ 摸摸头 🐾', '好舒服，但你要专心记录哦~ ✨',
            '怎么还在戳，本喵要生气了哦！', '干嘛一直戳我！💢',
            '再戳我咬你了哦！🐾', '讨厌！把你的手拿开啦！😾', '……'
        ]
    },
    {
        name: 'Wanko (憨厚修勾)',
        modelPath: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko/assets/wanko.model.json',
        greeting: '汪汪！主人你来啦！',
        sleepMsg: '汪呜...头好晕 💫\n(狗狗趴在地上睡着了)',
        wakeupMsg: '汪！我又充满活力啦！',
        idleMessages: [
            '（吐舌头）哈呼哈呼~ ', '要一起丢飞盘吗？🥏',
            '主人打字的声音真好听！', '有什么开心的事要记录下来吗？',
            '汪汪！今天也是元气满满的一天！'
        ],
        pokeReactions: [
            '汪？（歪头）', '嘿嘿，好痒呀~ ',
            '主人是在跟我玩吗？', '汪汪！我也要摸摸主人的手！',
            '呜...一直摸头会变笨的 ', '（委屈巴巴）要秃了要秃了...', '（趴下呜咽）呜呜呜...'
        ]
    }
];

const currentPet = petsConfig[Math.floor(Math.random() * petsConfig.length)];

let bubbleTimeout;
let idleInterval;
let pokeCount = 0;
let lastPokeTime = 0;
let pokeMemoryTimer;
let isSilentMode = false;

function petSpeak(text, duration = 4000) {
    bubble.innerText = text;
    bubble.style.opacity = 1;

    clearTimeout(bubbleTimeout);
    bubbleTimeout = setTimeout(() => { bubble.style.opacity = 0; }, duration);

    if (!isSilentMode) {
        clearInterval(idleInterval);
        idleInterval = setInterval(randomIdleSpeak, 15000);
    }
}

function randomIdleSpeak() {
    if (isSilentMode) return;
    const randomMsg = currentPet.idleMessages[Math.floor(Math.random() * currentPet.idleMessages.length)];
    petSpeak(randomMsg, 5000);
}

setTimeout(() => { petSpeak(currentPet.greeting, 4000); }, 3000);

const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/live2d-widget@3.1.4/lib/L2Dwidget.min.js';
script.onload = () => {
    window.L2Dwidget.init({
        model: { jsonPath: currentPet.modelPath },
        display: { position: 'right', width: 110, height: 110, hOffset: 10, vOffset: -10 },
        mobile: { show: true, scale: 1 },
        react: { opacityDefault: 1, opacityOnHover: 1 }
    });
};
document.body.appendChild(script);

function handleVirtualPoke(e) {
    if (isSilentMode) return;

    let clientX, clientY;
    if (e.type === 'touchstart') {
        clientX = e.touches[0].clientX; clientY = e.touches[0].clientY;
    } else if (e.type === 'click') {
        clientX = e.clientX; clientY = e.clientY;
    } else return;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (screenWidth - clientX <= 130 && screenHeight - clientY <= 130) {
        const now = Date.now();
        if (now - lastPokeTime < 400) return;
        lastPokeTime = now;

        pokeCount++;

        clearTimeout(pokeMemoryTimer);
        pokeMemoryTimer = setTimeout(() => { pokeCount = 0; }, 10000);

        const reactions = currentPet.pokeReactions;

        if (pokeCount === 1) petSpeak(reactions[0], 3000);
        else if (pokeCount === 2) petSpeak(reactions[1], 3000);
        else if (pokeCount === 3) petSpeak(reactions[2], 3000);
        else if (pokeCount === 4) petSpeak(reactions[3], 3000);
        else if (pokeCount === 5) petSpeak(reactions[4], 3000);
        else if (pokeCount === 6) petSpeak(reactions[5], 3000);
        else if (pokeCount > 6 && pokeCount < 10) petSpeak(reactions[6], 2000);
        else {
            petSpeak(currentPet.sleepMsg, 5000);
            pokeCount = 0;
            isSilentMode = true;
            clearInterval(idleInterval);

            setTimeout(() => {
                isSilentMode = false;
                petSpeak(currentPet.wakeupMsg, 4000);
                idleInterval = setInterval(randomIdleSpeak, 15000);
            }, 300000);
        }
    }
}

window.addEventListener('touchstart', handleVirtualPoke, { passive: true });
window.addEventListener('click', handleVirtualPoke, true);

})();

(function () {
const PROCESSED_ATTR = 'data-enhanced';

const mediaRules = [
    {
        name: "YouTube",
        regex: /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
        getEmbed: (match) => {
            const vid = match[1];
            const iframeHTML = `<div class="media-embed-wrapper video"><iframe src="https://www.youtube.com/embed/${vid}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;

            const maxResThumb = `https://i.ytimg.com/vi/${vid}/maxresdefault.jpg`;
            const hqThumb = `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`;

            return `
            <div class="yt-facade" title="点击播放 YouTube 视频" onclick='this.outerHTML=${JSON.stringify(iframeHTML)}'>
                <img src="${maxResThumb}" onerror="this.onerror=null;this.src='${hqThumb}';" alt="YouTube Cover">
                <div class="yt-play-btn"></div>
            </div>
            `;
        }
    },
    {
        name: "Bilibili-Long",
        regex: /(?:bilibili\.com\/video\/)(BV[a-zA-Z0-9]+)/,
        getEmbed: (match) => `<div class="media-embed-wrapper video"><iframe src="//player.bilibili.com/player.html?bvid=${match[1]}&page=1&high_quality=1&danmaku=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen referrerpolicy="no-referrer"></iframe></div>`
    },
    {
        name: "Spotify",
        regex: /open\.spotify\.com\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/,
        getEmbed: (match) => `<div class="media-embed-wrapper spotify"><iframe src="https://open.spotify.com/embed/${match[1]}/${match[2]}" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe></div>`
    }
];

async function resolveShortLink(url, linkElement) {
    const originalText = linkElement.innerText;
    try {
        linkElement.style.opacity = '0.5';
        linkElement.innerText = '🎬 正在解析短链...';

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch(`https://unshorten.me/json/${encodeURIComponent(url)}`, { signal: controller.signal });
        clearTimeout(timeoutId);

        const data = await response.json();

        if (data.success && data.resolved_url) {
            const match = data.resolved_url.match(/(BV[a-zA-Z0-9]+)/);
            if (match) {
                const bvid = match[1];
                linkElement.outerHTML = `<div class="media-embed-wrapper video"><iframe src="//player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen referrerpolicy="no-referrer"></iframe></div>`;
                return;
            }
        }
        throw new Error("解析失败");
    } catch (error) {
        linkElement.style.opacity = '1';
        linkElement.innerText = originalText;
    }
}

const apiBlacklist = ['bilibili.com', 'b23.tv', 'weibo.com', 'zhihu.com'];

async function createLinkPreview(url, linkElement) {
    try {
        const hostname = new URL(url).hostname;
        if (apiBlacklist.some(domain => hostname.includes(domain))) return;

        linkElement.style.opacity = '0.5';
        const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.status === 'success' && data.data.title && data.data.image?.url && !data.data.title.includes(url)) {
            const info = data.data;
            const publisher = info.publisher || hostname;
            const cardHTML = `
                <a href="${url}" target="_blank" rel="noopener noreferrer" class="link-preview-card" ${PROCESSED_ATTR}="true">
                    <div class="link-preview-info">
                        <div class="link-preview-title" title="${info.title}">${info.title}</div>
                        <div class="link-preview-domain">
                            ${info.logo?.url ? `<img src="${info.logo.url}" referrerpolicy="no-referrer" alt="logo">` : ''}
                            <span>${publisher}</span>
                        </div>
                    </div>
                    <img src="${info.image.url}" class="link-preview-image" referrerpolicy="no-referrer" alt="cover">
                </a>
            `;
            linkElement.outerHTML = cardHTML;
        } else {
            linkElement.style.opacity = '1';
        }
    } catch (error) {
        linkElement.style.opacity = '1';
    }
}

function processLinks() {
    const links = document.querySelectorAll(`a:not([${PROCESSED_ATTR}="true"])`);

    links.forEach(link => {
        const url = link.href;
        const text = link.textContent.trim();

        link.setAttribute(PROCESSED_ATTR, 'true');
        if (!url.startsWith('http') || url.includes(window.location.hostname)) return;

        let isDirectMedia = false;
        for (const rule of mediaRules) {
            const match = url.match(rule.regex);
            if (match) {
                link.outerHTML = rule.getEmbed(match);
                isDirectMedia = true;
                break;
            }
        }
        if (isDirectMedia) return;

        if (url.includes('b23.tv')) {
            resolveShortLink(url, link);
            return;
        }

        if (text === url || url.includes(text)) {
            createLinkPreview(url, link);
        }
    });
}

const observer = new MutationObserver(() => {
    clearTimeout(window.memosEmbedTimer);
    window.memosEmbedTimer = setTimeout(processLinks, 300);
});

observer.observe(document.body, { childList: true, subtree: true });
setTimeout(processLinks, 500);

})();

(function() {
const USERS = {
me: {
name: "浦肯野纤维",
lat: 28.19, lon: 112.94
},
friend: {
name: "Marisol",
lat: 26.88, lon: 112.63
}
};

let weatherCache = { me: "🌤️ --°C", friend: "🌤️ --°C" };

const getWeatherEmoji = (code) => {
    if ([0].includes(code)) return '☀️';
    if ([1, 2].includes(code)) return '🌤️';
    if ([3].includes(code)) return '☁️';
    if ([45, 48].includes(code)) return '🌫️';
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return '🌧️';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️';
    if ([95, 96, 99].includes(code)) return '⛈️';
    return '🌈';
};

const fetchWeather = async (userKey) => {
    try {
        const { lat, lon } = USERS[userKey];
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await response.json();
        weatherCache[userKey] = `${getWeatherEmoji(data.current_weather.weathercode)} ${Math.round(data.current_weather.temperature)}°C`;
    } catch (e) {}
};

const applyWeatherTags = () => {
    document.querySelectorAll('.cyber-weather-tag').forEach(e => e.remove());

    const nameElements = document.querySelectorAll('span, a');
    nameElements.forEach(el => {
        const text = el.innerText.trim();
        let matchedUser = text === USERS.me.name ? 'me' : (text === USERS.friend.name ? 'friend' : null);

        if (matchedUser) {
            const timeElement = el.nextElementSibling;

            if (timeElement && !timeElement.querySelector('.pure-weather-text')) {
                const tag = document.createElement('span');
                tag.className = 'pure-weather-text';
                tag.style.cssText = "background: transparent !important; border: none !important; padding: 0 !important; margin: 0 0 0 6px !important; box-shadow: none !important; font-size: inherit !important; color: inherit !important; display: inline !important;";
                tag.innerHTML = `·&nbsp;${weatherCache[matchedUser]}`;

                timeElement.appendChild(tag);
            }
        }
    });
};

const init = async () => {
    await fetchWeather('me');
    await fetchWeather('friend');
    applyWeatherTags();
    setInterval(applyWeatherTags, 2000);
};

setTimeout(init, 1000);

})();

(function() {
const TAG_TRIGGER = '#secret';

function initScratchCard(imgElement) {
    if (imgElement.dataset.scratchInit === 'true') return;
    imgElement.dataset.scratchInit = 'true';

    const container = document.createElement('div');
    container.className = 'scratch-container';
    imgElement.parentNode.insertBefore(container, imgElement);
    container.appendChild(imgElement);

    const canvas = document.createElement('canvas');
    canvas.className = 'scratch-canvas';
    container.appendChild(canvas);

    const width = imgElement.offsetWidth || imgElement.clientWidth;
    const height = imgElement.offsetHeight || imgElement.clientHeight;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#E3D5CA');
    gradient.addColorStop(1, '#D6C3B3');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(0, 0, width, height);

    const fontSize = Math.max(18, Math.min(width / 6, 32));
    const fontFamily = `"Dancing Script", "Snell Roundhand", "Bradley Hand", cursive`;

    const drawTextAndShow = () => {
        ctx.fillStyle = '#5A4332';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.85)';
        ctx.shadowBlur = 8;

        ctx.font = `bold ${fontSize}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(' Try it', width / 2, height / 2);

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        setTimeout(() => {
            imgElement.style.opacity = '1';
        }, 50);
    };

    if (document.fonts) {
        document.fonts.load(`bold ${fontSize}px "Dancing Script"`).then(() => {
            drawTextAndShow();
        }).catch(() => {
            drawTextAndShow();
        });
    } else {
        drawTextAndShow();
    }

    let isDrawing = false;

    function checkFogClearanceStrict() {
        try {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            let transparentPixels = 0;
            let checkedPixels = 0;

            for (let i = 3; i < data.length; i += 4 * 10) {
                if (data[i] < 50) {
                    transparentPixels++;
                }
                checkedPixels++;
            }

            if (transparentPixels / checkedPixels > 0.90) {
                canvas.style.pointerEvents = 'none';
            }
        } catch (err) {}
    }

    function getCoordinates(e) {
        const rect = canvas.getBoundingClientRect();
        let clientX = e.clientX;
        let clientY = e.clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX; clientY = e.touches[0].clientY;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
            clientX = e.changedTouches[0].clientX;
            clientY = e.changedTouches[0].clientY;
        }
        const scaleX = width / rect.width;
        const scaleY = height / rect.height;
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    }

    function scratch(e) {
        if (!isDrawing) return;
        if (e.cancelable) e.preventDefault();
        const { x, y } = getCoordinates(e);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
    }

    canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
    canvas.addEventListener('mousemove', scratch);

    window.addEventListener('mouseup', () => {
        if (isDrawing) { isDrawing = false; checkFogClearanceStrict(); }
    });

    canvas.addEventListener('mouseleave', () => {
        if (isDrawing) { isDrawing = false; checkFogClearanceStrict(); }
    });

    canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });

    window.addEventListener('touchend', () => {
        if (isDrawing) { isDrawing = false; checkFogClearanceStrict(); }
    });

    canvas.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

const observer = new MutationObserver(() => {
    const images = document.querySelectorAll('img:not(.scratch-target-img)');

    images.forEach(img => {
        const parentMemo = img.closest('article, .memo-wrapper, div[class*="memo"]');
        if (!parentMemo || !parentMemo.innerText.includes(TAG_TRIGGER)) return;

        const src = (img.src || '').toLowerCase();
        const alt = (img.alt || '').toLowerCase();
        const className = (img.className || '').toLowerCase();
        const parentClass = (img.parentElement && img.parentElement.className) ? img.parentElement.className.toLowerCase() : '';

        if (src.includes('avatar') || alt.includes('avatar') || className.includes('avatar') || parentClass.includes('avatar')) {
            return;
        }

        img.style.opacity = '0';
        img.classList.add('scratch-target-img');

        const processLoadedImage = () => {
            const realWidth = img.naturalWidth || img.clientWidth;
            if (realWidth > 0 && realWidth < 100) {
                img.style.opacity = '1';
                return;
            }
            initScratchCard(img);
        };

        if (img.complete && img.naturalWidth > 0) {
            processLoadedImage();
        } else {
            img.addEventListener('load', processLoadedImage, { once: true });
            setTimeout(() => {
                if (!img.dataset.scratchInit && img.style.opacity === '0') {
                    img.style.opacity = '1';
                }
            }, 2000);
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });

})();

(function() {
document.addEventListener('click', function(e) {
const target = e.target;
if (target.tagName === 'IMG') {
const isAvatar = target.clientWidth < 65 || target.className.includes('avatar') || target.style.borderRadius === '50%';
if (!isAvatar && target.style.opacity !== '0') {
e.stopPropagation();
e.stopImmediatePropagation();
e.preventDefault();
openSuperViewer(target.src);
}
}
}, true);

function openSuperViewer(src) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.9); z-index: 9999999;
        display: flex; justify-content: center; align-items: center;
        overflow: hidden; touch-action: none; opacity: 0;
        transition: opacity 0.2s ease;
    `;

    const closeBtn = document.createElement('div');
    closeBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    `;
    closeBtn.style.cssText = `
        position: absolute; top: 20px; right: 20px;
        width: 44px; height: 44px; display: flex;
        justify-content: center; align-items: center;
        background: rgba(255, 255, 255, 0.15); border-radius: 50%;
        cursor: pointer; z-index: 10000000; transition: background 0.2s;
    `;
    closeBtn.onmouseenter = () => closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
    closeBtn.onmouseleave = () => closeBtn.style.background = 'rgba(255, 255, 255, 0.15)';

    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = `
        max-width: 95%; max-height: 95%; object-fit: contain;
        cursor: grab; transform: translate(0px, 0px) scale(1);
        transition: transform 0.15s ease-out;
        user-select: none; -webkit-user-drag: none;
    `;

    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    setTimeout(() => overlay.style.opacity = '1', 10);

    let scale = 1, tx = 0, ty = 0;
    let isDragging = false, startX = 0, startY = 0;
    let lastDist = 0;
    let hasMoved = false;

    function closeViewer() {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 200);
    }

    closeBtn.addEventListener('click', closeViewer);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay && !hasMoved) {
            closeViewer();
        }
    });

    overlay.addEventListener('wheel', (e) => {
        e.preventDefault();
        img.style.transition = 'transform 0.1s ease-out';
        const zoomAmount = (e.deltaY < 0 ? 1 : -1) * 0.15;
        scale += zoomAmount;
        if (scale < 0.5) scale = 0.5;
        if (scale > 10) scale = 10;
        img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    }, { passive: false });

    img.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
        hasMoved = false;
        startX = e.clientX - tx;
        startY = e.clientY - ty;
        img.style.cursor = 'grabbing';
        img.style.transition = 'none';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        hasMoved = true;
        tx = e.clientX - startX;
        ty = e.clientY - startY;
        img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        img.style.cursor = 'grab';
    });

    overlay.addEventListener('touchstart', (e) => {
        hasMoved = false;
        img.style.transition = 'none';
        if (e.touches.length === 1) {
            isDragging = true;
            startX = e.touches[0].clientX - tx;
            startY = e.touches[0].clientY - ty;
        } else if (e.touches.length === 2) {
            isDragging = false;
            lastDist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
        }
    }, { passive: false });

    overlay.addEventListener('touchmove', (e) => {
        e.preventDefault();
        hasMoved = true;
        if (e.touches.length === 1 && isDragging) {
            tx = e.touches[0].clientX - startX;
            ty = e.touches[0].clientY - startY;
            img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
        } else if (e.touches.length === 2) {
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const zoomAmount = (dist - lastDist) * 0.012;
            scale += zoomAmount;
            if (scale < 0.5) scale = 0.5;
            if (scale > 10) scale = 10;
            lastDist = dist;
            img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
        }
    }, { passive: false });

    overlay.addEventListener('touchend', () => {
        isDragging = false;
    });

    let lastTap = 0;
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        if (hasMoved) return;

        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
            img.style.transition = 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)';
            if (scale > 1 || tx !== 0 || ty !== 0) {
                scale = 1; tx = 0; ty = 0;
            } else {
                scale = 2.5;
            }
            img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
        }
        lastTap = currentTime;
    });
}

})();

(function() {
const glowDiv = document.createElement('div');
glowDiv.id = 'resonance-glow';
document.body.appendChild(glowDiv);

let myDeviceId = localStorage.getItem('memos_device_id');
if (!myDeviceId) {
    myDeviceId = 'device_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('memos_device_id', myDeviceId);
}

const script = document.createElement('script');
script.src = 'https://unpkg.com/mqtt/dist/mqtt.min.js';
document.body.appendChild(script);

script.onload = () => {
    const secretRoomId = 'memos-resonance-' + btoa(window.location.host).substring(0, 15);

    const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt');
    let friendDisconnectTimer;

    client.on('connect', () => {
        console.log("🌌 微光共振：已连接星际网络");
        client.subscribe(secretRoomId);

        setInterval(() => {
            client.publish(secretRoomId, JSON.stringify({ deviceId: myDeviceId }));
        }, 4000);
    });

    client.on('message', (topic, message) => {
        try {
            const data = JSON.parse(message.toString());

            if (data.deviceId && data.deviceId !== myDeviceId) {
                document.body.classList.add('resonance-active');

                clearTimeout(friendDisconnectTimer);
                friendDisconnectTimer = setTimeout(() => {
                    document.body.classList.remove('resonance-active');
                }, 12000);
            }
        } catch (e) {}
    });
};

})();

(function() {
const style = document.createElement('style');
style.innerHTML = `
#pet-food-addon {
position: fixed; bottom: 25px; right: 5px; z-index: 999998;
display: flex;
flex-direction: column;
align-items: center;
background: transparent !important; border: none; padding: 0;
cursor: pointer; box-shadow: none !important; backdrop-filter: none !important;
transition: transform 0.2s ease; user-select: none; opacity: 0; pointer-events: none;
}
#pet-food-addon.active { opacity: 1; pointer-events: auto; }
#pet-food-addon:hover { transform: scale(1.1) translateX(-2px); }
#pet-food-addon:active { transform: scale(0.95); }

  .food-item {
      font-size: 16px;
      margin-top: -8px;
      filter: drop-shadow(0px -1px 2px rgba(0,0,0,0.15));
  }

  #pet-food-addon > div:first-child { margin-top: 0; }

  .food-item:nth-child(odd) { transform: rotate(15deg); }
  .food-item:nth-child(even) { transform: rotate(-15deg); }

  .empty-food {
      font-size: 15px; opacity: 0.4; filter: grayscale(100%);
  }

  .food-plus {
      font-size: 12px; color: #c49a76; font-weight: 900;
      font-family: 'Nunito', sans-serif; margin-bottom: 2px;
  }

  @keyframes floatHeartAddon {
      0% { opacity: 0.8; transform: translateY(0) scale(0.6) rotate(-10deg); }
      50% { opacity: 0.6; transform: translateY(-30px) scale(0.8) rotate(10deg); }
      100% { opacity: 0; transform: translateY(-60px) scale(0.9) rotate(-5deg); }
  }

  .floating-heart-addon {
      position: fixed; font-size: 14px; z-index: 999999; pointer-events: none;
      animation: floatHeartAddon 1.2s ease-out forwards;
  }
`;
document.head.appendChild(style);

const foodContainer = document.createElement('div');
foodContainer.id = 'pet-food-addon';
document.body.appendChild(foodContainer);

let activePetType = null;
const foodConfig = {
    cat: { key: 'memos_fish_stock', icon: '🐟', name: '小鱼干', rxp: ['吧唧吧唧...好好吃！喵~ 😻', '谢谢你的小鱼干！🐟', '闻到鱼干的味道，瞬间清醒！'] },
    dog: { key: 'memos_bone_stock', icon: '🦴', name: '肉骨头', rxp: ['嗷呜！骨头好香！谢谢！🐶', '吧唧吧唧...尾巴摇成螺旋桨~ 🐕', '闻到骨头香，瞬间充满活力！'] }
};

function renderFood(count, icon) {
    if (count === 0) {
        return `<div class="empty-food">${icon}</div>`;
    } else {
        let html = '';
        if (count > 50) {
            html += `<div class="food-plus">+</div>`;
        }
        let displayCount = Math.min(count, 50);
        for(let i = 0; i < displayCount; i++) {
            html += `<div class="food-item">${icon}</div>`;
        }
        return html;
    }
}

let externalBubbleTimer;
function forcePetSpeak(text) {
    const bubble = document.getElementById('custom-cat-bubble');
    if (!bubble) return;
    bubble.innerText = text;
    bubble.style.opacity = 1;
    clearTimeout(externalBubbleTimer);
    externalBubbleTimer = setTimeout(() => { bubble.style.opacity = 0; }, 4000);
}

function spawnHeart() {
    const heart = document.createElement('div');
    heart.innerText = '💖';
    heart.className = 'floating-heart-addon';
    heart.style.right = '15px';
    heart.style.bottom = '80px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
}

const spyTimer = setInterval(() => {
    const bubble = document.getElementById('custom-cat-bubble');
    if (bubble && bubble.innerText) {
        const words = bubble.innerText;
        if (words.includes('喵') || words.includes('猫') || words.includes('🐈')) {
            setupFoodSystem('cat');
            clearInterval(spyTimer);
        } else if (words.includes('汪') || words.includes('狗') || words.includes('修勾')) {
            setupFoodSystem('dog');
            clearInterval(spyTimer);
        }
    }
}, 500);

function setupFoodSystem(type) {
    activePetType = type;
    const cfg = foodConfig[type];

    let currentStock = parseInt(localStorage.getItem(cfg.key) || '0');

    foodContainer.innerHTML = renderFood(currentStock, cfg.icon);
    foodContainer.title = `喂食 ${cfg.name}`;
    foodContainer.classList.add('active');

    foodContainer.onclick = () => {
        if (currentStock > 0) {
            currentStock--;
            localStorage.setItem(cfg.key, currentStock);

            foodContainer.innerHTML = renderFood(currentStock, cfg.icon);

            const reply = cfg.rxp[Math.floor(Math.random() * cfg.rxp.length)];
            forcePetSpeak(reply);
            spawnHeart();
        } else {
            forcePetSpeak(`空空如也！快去发帖赚${cfg.name}啦！`);
        }
    };

    const previousFetch = window.fetch;
    window.fetch = async function(...args) {
        const response = await previousFetch.apply(this, args);
        try {
            const clonedRes = response.clone();
            const url = typeof args[0] === 'string' ? args[0] : (args[0]?.url || '');
            const options = args[1] || {};

            if (options.method === 'POST' && (url.includes('/api/v1/memo') || url.includes('CreateMemo')) && clonedRes.ok) {
                currentStock++;
                localStorage.setItem(cfg.key, currentStock);

                foodContainer.innerHTML = renderFood(currentStock, cfg.icon);

                foodContainer.style.transform = 'translateY(-5px) scale(1.05)';
                setTimeout(() => { foodContainer.style.transform = 'translateY(0) scale(1)'; }, 300);

                setTimeout(() => { forcePetSpeak(`地上的 ${cfg.name} 变多啦！`); }, 1500);
            }
        } catch (err) { console.error("Pet addon err:", err); }
        return response;
    };
}

})();

(function() {
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Nunito:wght@600&display=swap';
fontLink.crossOrigin = 'anonymous';
document.head.appendChild(fontLink);
})();

(function() {
if (document.getElementById('cat-paw-btt')) return;

const btn = document.createElement('div');
btn.id = 'cat-paw-btt';

btn.innerHTML = `
    <svg viewBox="0 0 80 80" width="24" height="24" fill="currentColor">
        <ellipse cx="40" cy="58" rx="18" ry="16"/>
        <ellipse cx="14" cy="42" rx="9" ry="10"/>
        <ellipse cx="30" cy="30" rx="9" ry="10"/>
        <ellipse cx="50" cy="30" rx="9" ry="10"/>
        <ellipse cx="66" cy="42" rx="9" ry="10"/>
    </svg>
`;

const size = 36;
btn.style.cssText = `
    position: fixed;
    width: ${size}px; height: ${size}px;
    display: flex; justify-content: center; align-items: center;
    border-radius: 50%; z-index: 99998;
    color: rgba(196, 164, 120, 0.45); background: transparent;
    opacity: 0; pointer-events: none;
    transition: opacity 0.4s, background 0.3s, color 0.3s, transform 0.2s;
    -webkit-tap-highlight-color: transparent;
    touch-action: none;
    cursor: grab;
`;

const savedPos = localStorage.getItem('catpaw_pos');
if (savedPos) {
    const pos = JSON.parse(savedPos);
    btn.style.left = pos.left;
    btn.style.top = pos.top;
} else {
    btn.style.right = '12px';
    btn.style.bottom = '160px';
}

document.body.appendChild(btn);

btn.onmouseenter = () => {
    if(!isDragging) {
        btn.style.color = 'rgba(196, 164, 120, 0.9)';
        btn.style.background = 'rgba(247, 236, 215, 0.75)';
    }
};

btn.onmouseleave = () => {
    if(!isDragging) {
        btn.style.color = 'rgba(196, 164, 120, 0.45)';
        btn.style.background = 'transparent';
    }
};

let isDragging = false;
let hasMoved = false;
let startX, startY, initialLeft, initialTop;

const dragStart = (e) => {
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    startX = clientX;
    startY = clientY;

    const rect = btn.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;

    btn.style.left = initialLeft + 'px';
    btn.style.top = initialTop + 'px';
    btn.style.right = 'auto';
    btn.style.bottom = 'auto';

    isDragging = true;
    hasMoved = false;
    btn.style.transition = 'none';
    btn.style.cursor = 'grabbing';
    btn.style.color = 'rgba(196, 164, 120, 0.9)';
};

const dragMove = (e) => {
    if (!isDragging) return;

    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

    const dx = clientX - startX;
    const dy = clientY - startY;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        hasMoved = true;
        if (e.cancelable) e.preventDefault();
    }

    if (hasMoved) {
        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;

        const maxX = window.innerWidth - size;
        const maxY = window.innerHeight - size;
        newLeft = Math.max(0, Math.min(newLeft, maxX));
        newTop = Math.max(0, Math.min(newTop, maxY));

        btn.style.left = newLeft + 'px';
        btn.style.top = newTop + 'px';
    }
};

const dragEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    btn.style.transition = 'opacity 0.4s, background 0.3s, color 0.3s, transform 0.2s';
    btn.style.cursor = 'grab';
    btn.style.color = 'rgba(196, 164, 120, 0.45)';

    if (hasMoved) {
        localStorage.setItem('catpaw_pos', JSON.stringify({
            left: btn.style.left,
            top: btn.style.top
        }));
    }
};

btn.addEventListener('mousedown', dragStart);
window.addEventListener('mousemove', dragMove, { passive: false });
window.addEventListener('mouseup', dragEnd);

btn.addEventListener('touchstart', dragStart, { passive: true });
window.addEventListener('touchmove', dragMove, { passive: false });
window.addEventListener('touchend', dragEnd);

btn.addEventListener('click', (e) => {
    if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
        return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    btn.style.transform = 'scale(0.7)';
    setTimeout(() => btn.style.transform = 'scale(1)', 200);
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
    } else {
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
    }
}, { passive: true });

})();