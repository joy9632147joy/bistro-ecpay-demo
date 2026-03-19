// ===== 導覽列滾動效果 =====
window.addEventListener('scroll', function () {
    let navbar = document.querySelector('.navbar');
    if (window.scrollY > 200) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function checkScroll() {
    let myBtn = document.getElementById("myBtn");
    if (document.documentElement.scrollTop > 600) {
        myBtn.classList.add('visible');
    } else {
        myBtn.classList.remove('visible');
    }
}


// ===== 酒類「我的最愛」=====
let favorites = [];

function toggleFavorite(productId) {
    let product = products.find(p => p.id.trim() === productId.trim());
    if (!product) return;

    let idx = favorites.findIndex(f => f.id.trim() === productId.trim());
    if (idx >= 0) {
        favorites.splice(idx, 1);
    } else {
        favorites.push({ ...product });
    }
    renderFavorites();
    updateFavBtn(productId);
    updateFavCount();
}

function updateFavBtn(productId) {
    let btn = document.querySelector(`.fav-btn[data-id="${productId.trim()}"]`);
    if (!btn) return;
    let isFav = favorites.some(f => f.id.trim() === productId.trim());
    if (isFav) {
        btn.innerHTML = '<i class="bi bi-heart-fill"></i> 已收藏';
        btn.classList.add('favorited');
    } else {
        btn.innerHTML = '<i class="bi bi-heart"></i> 收藏';
        btn.classList.remove('favorited');
    }
}

function updateFavCount() {
    let badge = document.getElementById('fav-count');
    badge.textContent = favorites.length;
    badge.style.display = favorites.length > 0 ? 'flex' : 'none';
}

function renderFavorites() {
    let favItems = document.getElementById('fav-items');
    if (favorites.length === 0) {
        favItems.innerHTML = `<div class="panel-empty">尚無收藏的酒 🍺<br><small>點擊酒單上的愛心加入</small></div>`;
        return;
    }
    favItems.innerHTML = favorites.map(item => `
        <div class="fav-item">
            <img src="${item.image}" alt="${item.name}" class="panel-item-img">
            <div class="panel-item-info">
                <div class="panel-item-name">${item.name}</div>
                <div class="panel-item-sub">${item.volume} | ABV ${item.abv}</div>
                <div class="panel-item-price">$ ${item.price}</div>
            </div>
            <button class="remove-btn" onclick="toggleFavorite('${item.id.trim()}')">
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
    `).join('');
}

function copyFavorites() {
    if (favorites.length === 0) return;
    let lines = favorites.map(item => `・${item.name}　${item.volume} / ABV ${item.abv}　$${item.price}`);
    let text = `🍺 我的預點清單\n${'─'.repeat(22)}\n${lines.join('\n')}\n${'─'.repeat(22)}\n\n※ 到店出示清單，服務人員為您準備`;

    navigator.clipboard.writeText(text).then(() => {
        let btn = document.getElementById('fav-copy-btn');
        btn.textContent = '已複製 ✓';
        btn.style.backgroundColor = '#5a8a5a';
        setTimeout(() => {
            btn.innerHTML = '<i class="bi bi-clipboard me-1"></i>複製清單';
            btn.style.backgroundColor = '';
        }, 2000);
    }).catch(() => { alert(text); });
}

function openFavPanel() {
    document.getElementById('fav-panel').classList.add('open');
    document.getElementById('panel-overlay').classList.add('open');
}

function closeFavPanel() {
    document.getElementById('fav-panel').classList.remove('open');
    if (!document.getElementById('cart-panel').classList.contains('open')) {
        document.getElementById('panel-overlay').classList.remove('open');
    }
}


// ===== 周邊「購物車」=====
let cart = [];

function addToCart(productId) {
    let product = products.find(p => p.id.trim() === productId.trim());
    if (!product) return;

    let existing = cart.find(item => item.id.trim() === productId.trim());
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    renderCart();
    openCartPanel();
    showCartFeedback(productId);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id.trim() !== productId.trim());
    renderCart();
}

function changeQty(productId, delta) {
    let item = cart.find(i => i.id.trim() === productId.trim());
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(productId);
    } else {
        renderCart();
    }
}

function renderCart() {
    let cartItems = document.getElementById('cart-items');
    let cartCount = document.getElementById('cart-count');
    let cartTotal = document.getElementById('cart-total');

    let totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
    let totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    cartCount.textContent = totalQty;
    cartCount.style.display = totalQty > 0 ? 'flex' : 'none';
    cartTotal.textContent = `$ ${totalPrice}`;

    if (cart.length === 0) {
        cartItems.innerHTML = `<div class="panel-empty">購物車是空的 🛍<br><small>至周邊商品選購</small></div>`;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="panel-item-img">
            <div class="panel-item-info">
                <div class="panel-item-name">${item.name}</div>
                <div class="panel-item-price">$ ${item.price} × ${item.qty}</div>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="changeQty('${item.id.trim()}', -1)">−</button>
                <span class="qty-num">${item.qty}</span>
                <button class="qty-btn" onclick="changeQty('${item.id.trim()}', 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart('${item.id.trim()}')">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function openCartPanel() {
    document.getElementById('cart-panel').classList.add('open');
    document.getElementById('panel-overlay').classList.add('open');
}

function closeCartPanel() {
    document.getElementById('cart-panel').classList.remove('open');
    if (!document.getElementById('fav-panel').classList.contains('open')) {
        document.getElementById('panel-overlay').classList.remove('open');
    }
}

function showCartFeedback(productId) {
    let btn = document.querySelector(`.add-to-cart-btn[data-id="${productId.trim()}"]`);
    if (!btn) return;
    btn.innerHTML = '已加入 ✓';
    btn.classList.add('added');
    setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-cart-plus"></i> 加入購物車';
        btn.classList.remove('added');
    }, 1200);
}


// ===== 初始化 UI =====
function initPanelsUI() {
    const html = `
        <div id="panel-overlay" onclick="closeFavPanel(); closeCartPanel();"></div>

        <button id="fav-float-btn" onclick="openFavPanel()" title="我的最愛">
            <i class="bi bi-heart"></i>
            <span id="fav-count" style="display:none;">0</span>
        </button>

        <button id="cart-float-btn" onclick="openCartPanel()" title="購物車">
            <i class="bi bi-cart3"></i>
            <span id="cart-count" style="display:none;">0</span>
        </button>

        <div id="fav-panel">
            <div class="panel-header">
                <h5 class="panel-title"><i class="bi bi-heart-fill me-2" style="color:#e87070;"></i>我的最愛</h5>
                <button class="panel-close-btn" onclick="closeFavPanel()"><i class="bi bi-x-lg"></i></button>
            </div>
            <div id="fav-items" class="panel-items-list">
                <div class="panel-empty">尚無收藏的酒 🍺<br><small>點擊酒單上的愛心加入</small></div>
            </div>
            <div class="panel-footer">
                <p class="panel-note">收藏喜歡的酒，到店再點！</p>
                <button id="fav-copy-btn" class="panel-action-btn" onclick="copyFavorites()">
                    <i class="bi bi-clipboard me-1"></i>複製清單
                </button>
                <p class="panel-note mt-2">※ 到店出示清單，服務人員為您準備</p>
            </div>
        </div>

        <div id="cart-panel">
            <div class="panel-header">
                <h5 class="panel-title"><i class="bi bi-cart3 me-2" style="color:#C5A059;"></i>購物車</h5>
                <button class="panel-close-btn" onclick="closeCartPanel()"><i class="bi bi-x-lg"></i></button>
            </div>
            <div id="cart-items" class="panel-items-list">
                <div class="panel-empty">購物車是空的 🛍<br><small>至周邊商品選購</small></div>
            </div>
            <div class="panel-footer">
                <div class="cart-total-row">
                    <span>合計</span>
                    <span id="cart-total">$ 0</span>
                </div>
                <button class="panel-action-btn checkout" onclick="alert('金流串接中，敬請期待！')">
                    <i class="bi bi-credit-card me-1"></i>前往結帳
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
}


// ===== 產品資料 =====
let category = [
    { type: "national", label: "進口精釀啤酒" },
    { type: "domestic", label: "國產精釀啤酒" },
    { type: "rice", label: "小米氣泡酒" },
    { type: "japan", label: "日系啤酒" },
    { type: "grapewine", label: "紅白酒" },
    { type: "special", label: "隱藏版調酒" },
    { type: "merch", label: "周邊商品" }
];

let products = [
    // --- 進口精釀啤酒 ---
    { id: "n-1", name: "女皇爵黑啤", category: "national", volume: "330ml", abv: "6.2%", price: 180, image: "./productsImg/IMG_4645.jpg" },
    { id: "n-3", name: "泡泡-雪酪酸啤酒", category: "national", volume: "440ml", abv: "6.1%", price: 380, image: "./productsImg/IMG_4611.jpg" },
    { id: "n-4", name: "小白兔-白巧克力酸啤酒", category: "national", volume: "440ml", abv: "6.8%", price: 380, image: "./productsImg/IMG_4610.jpg" },
    { id: "n-5", name: "極致混濁IPA", category: "national", volume: "355ml", abv: "6.5%", price: 280, image: "./productsImg/IMG_4617.jpg" },
    { id: "n-6", name: "KAIJU拉格", category: "national", volume: "375ml", abv: "4.4%", price: 220, image: "./productsImg/拉格.jpg" },
    { id: "n-7", name: "克蘇魯", category: "national", volume: "375ml", abv: "6.5%", price: 300, image: "./productsImg/IMG_4639.jpg" },
    { id: "n-8", name: "金斧頭-蘋果", category: "national", volume: "375ml", abv: "5%", price: 220, image: "./productsImg/IMG_4640.jpg" },
    { id: "n-9", name: "周末震盪IPA", category: "national", volume: "473ml", abv: "6.8%", price: 300, image: "./productsImg/IMG_4634.jpg" },
    { id: "n-10", name: "白日夢遊IPA", category: "national", volume: "440ml", abv: "9%", price: 380, image: "./productsImg/IMG_4632.jpg" },
    { id: "n-11", name: "高帽肥貓", category: "national", volume: "440ml", abv: "6.8%", price: 380, image: "./productsImg/IMG_4633.jpg" },
    { id: "n-12", name: "起司你好派", category: "national", volume: "330ml", abv: "5.5%", price: 250, image: "./productsImg/IMG_4641.jpg" },
    { id: "n-13", name: "快樂海茲淡艾爾", category: "national", volume: "330ml", abv: "5%", price: 180, image: "./productsImg/001.jpg" },
    { id: "n-14", name: "鹽漬白桃酸啤酒", category: "national", volume: "330ml", abv: "2.9%", price: 180, image: "./productsImg/002.jpg" },
    { id: "n-15", name: "酸黃瓜酸啤酒", category: "national", volume: "330ml", abv: "4.3%", price: 180, image: "./productsImg/003.jpg" },
    { id: "n-16", name: "液體補給紐西蘭IPA", category: "national", volume: "330ml", abv: "5.6%", price: 180, image: "./productsImg/004.jpg" },

    // --- 國產精釀啤酒 ---
    { id: "d-1", name: "紅心芭樂（野原廣志限定款）", category: "domestic", volume: "330ml", abv: "3.5%", price: 180, image: "./productsImg/13.jpg" },
    { id: "d-2", name: "清甜蜜桃（野原美冴限定款）", category: "domestic", volume: "330ml", abv: "3.5%", price: 180, image: "./productsImg/14.jpg" },
    { id: "d-3", name: "乳酸多多（高倉文太限定款）", category: "domestic", volume: "330ml", abv: "3.5%", price: 180, image: "./productsImg/13.jpg" },
    { id: "d-8", name: "醜啤", category: "domestic", volume: "330ml", abv: "4.5%", price: 160, image: "./productsImg/12.jpg" },
    { id: "d-5", name: "甜蜜蜜番茄梅古斯", category: "domestic", volume: "330ml", abv: "5%", price: 200, image: "./productsImg/1-2.jpg" },
    { id: "d-6", name: "不朽西西里啤酒", category: "domestic", volume: "330ml", abv: "5%", price: 200, image: "./productsImg/2-10.jpg" },
    { id: "d-7", name: "嫉妒巧克力斯陶特", category: "domestic", volume: "330ml", abv: "5.5%", price: 200, image: "./productsImg/2-2.jpg" },
    { id: "d-18", name: "紅茶艾爾", category: "domestic", volume: "330ml", abv: "5%", price: 200, image: "./productsImg/2-9.jpg" },
    { id: "d-9", name: "撥雲霧見蓬萊仙島", category: "domestic", volume: "330ml", abv: "6.5%", price: 200, image: "./productsImg/99.jpg" },
    { id: "d-10", name: "怠惰社交型IPA", category: "domestic", volume: "330ml", abv: "5%", price: 250, image: "./productsImg/lazy.jpg" },
    { id: "d-11", name: "雙喜雙倍IPA啤酒", category: "domestic", volume: "330ml", abv: "8.8%", price: 210, image: "./productsImg/96.jpg" },
    { id: "d-12", name: "傲慢檸檬海鹽拉格", category: "domestic", volume: "330ml", abv: "5%", price: 250, image: "./productsImg/95.jpg" },
    { id: "d-13", name: "芭樂鹽小麥啤酒", category: "domestic", volume: "330ml", abv: "5.2%", price: 180, image: "./productsImg/98.jpg" },
    { id: "d-14", name: "海灘貓貓", category: "domestic", volume: "330ml", abv: "6.9%", price: 200, image: "./productsImg/IMG_4510.jpg" },
    { id: "d-15", name: "琥珀拉格", category: "domestic", volume: "330ml", abv: "5.5%", price: 200, image: "./productsImg/IMG_4503.jpg" },
    { id: "d-16", name: "金荒烈愛爾", category: "domestic", volume: "330ml", abv: "5%", price: 200, image: "./productsImg/IMG_4502.jpg" },
    { id: "d-17", name: "蜜桃紅茶蘋果酒", category: "domestic", volume: "330ml", abv: "3.5%", price: 200, image: "./productsImg/蜜桃.png" },
    { id: "d-4", name: "暴食蜂蜜小麥", category: "domestic", volume: "330ml", abv: "5%", price: 200, image: "./productsImg/1-1.jpg" },

    // --- 小米氣泡酒 ---
    { id: "r-1", name: "小米水蜜桃氣泡酒", category: "rice", volume: "330ml", abv: "8%", price: 250, image: "./productsImg/1.jpg" },
    { id: "r-2", name: "小米青梅氣泡酒", category: "rice", volume: "330ml", abv: "6.9%", price: 250, image: "./productsImg/3.jpg" },
    { id: "r-3", name: "小米椪柑氣泡酒", category: "rice", volume: "330ml", abv: "8%", price: 250, image: "./productsImg/2.jpg" },
    { id: "r-4", name: "小米紅烏龍氣泡酒", category: "rice", volume: "330ml", abv: "8%", price: 250, image: "./productsImg/4.jpg" },
    { id: "r-5", name: "小米柚子氣泡酒", category: "rice", volume: "330ml", abv: "8%", price: 250, image: "./productsImg/5.jpg" },

    // --- 日系啤酒 ---
    { id: "j-1", name: "吟香清酒啤酒", category: "japan", volume: "330ml", abv: "4%", price: 230, image: "./productsImg/6.jpg" },
    { id: "j-2", name: "白柚艾爾啤酒", category: "japan", volume: "330ml", abv: "5%", price: 230, image: "./productsImg/7.jpg" },
    { id: "j-3", name: "阿爾特啤酒", category: "japan", volume: "330ml", abv: "5%", price: 230, image: "./productsImg/8.jpg" },
    { id: "j-4", name: "Asahi朝日啤酒", category: "japan", volume: "633ml", abv: "5%", price: 160, image: "./productsImg/IMG_4622.jpg" },
    { id: "j-5", name: "SAPPRORO黑標", category: "japan", volume: "633ml", abv: "5%", price: 200, image: "./productsImg/IMG_4620.jpg" },

    // --- 紅白酒 ---
    { id: "g-1", name: "阿莫酒莊 蚱蜢紅酒 2022", category: "grapewine", volume: "750ml", abv: "12.5%", price: 1150, image: "./productsImg/蚱蜢.jpg" },
    { id: "g-2", name: "蝌蚪陶甕白酒 2022", category: "grapewine", volume: "750ml", abv: "12.5%", price: 1150, image: "./productsImg/蝌蚪.jpg" },
    { id: "g-3", name: "勃根地-阿里哥蝶", category: "grapewine", volume: "750ml", abv: "12.5%", price: 1350, image: "./productsImg/小蝴蝶.jpg" },
    { id: "g-4", name: "勃根地-咕嚕咕嚕", category: "grapewine", volume: "750ml", abv: "12.5%", price: 1500, image: "./productsImg/咕嚕咕嚕.jpg" },

    // --- 隱藏版調酒 ---
    { id: "s-1", name: "梅酒來一杯", category: "special", volume: "120ml", abv: "15%", price: 250, image: "./productsImg/row-1-column-1.jpg" },
    { id: "s-2", name: "Ho闆娘特調Highball", category: "special", volume: "350ml", abv: "7%", price: 350, image: "./productsImg/row-1-column-2.jpg" },
    { id: "s-3", name: "奔瑞喜歡自由古巴", category: "special", volume: "300ml", abv: "10%", price: 350, image: "./productsImg/row-1-column-3.jpg" },
    { id: "s-4", name: "Hey Gin Tonic", category: "special", volume: "300ml", abv: "12%", price: 350, image: "./productsImg/row-1-column-4.jpg" },
    { id: "s-5", name: "威士忌單杯", category: "special", volume: "60ml", abv: "40%", price: 350, image: "./productsImg/row-2-column-1.jpg" },
    { id: "s-6", name: "妹子最愛蘋果琴人", category: "special", volume: "250ml", abv: "8%", price: 350, image: "./productsImg/row-2-column-2.jpg" },
    { id: "s-7", name: "哈密瓜特調", category: "special", volume: "250ml", abv: "12%", price: 350, image: "./productsImg/row-2-column-3.jpg" },
    { id: "s-8", name: "想帶你環遊世界", category: "special", volume: "300ml", abv: "25%", price: 420, image: "./productsImg/row-2-column-4.jpg" },

    // --- 周邊商品 ---
    { id: "m-1", name: "HoLin53 品牌品脫杯", category: "merch", price: 350, image: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?auto=format&fit=crop&w=500&q=80", desc: "精緻玻璃品脫杯，印有品牌Logo" },
    { id: "m-2", name: "HoLin53 馬克杯", category: "merch", price: 280, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=500&q=80", desc: "陶瓷馬克杯，早餐咖啡到宵夜都適合" },
    { id: "m-3", name: "皮革杯墊（2入）", category: "merch", price: 220, image: "https://media.istockphoto.com/id/495954440/zh/%E7%85%A7%E7%89%87/collection-of-various-table-coasters.jpg?s=612x612&w=0&k=20&c=ogTHIwNYeuMEUm0Mu4TuMEkXZp7E-CxNO7NGHVBr0AE=", desc: "真皮壓印Logo杯墊，質感滿點" },
    { id: "m-4", name: "帆布托特包", category: "merch", price: 480, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80", desc: "厚磅帆布，大容量日用托特包" },
    { id: "m-5", name: "品牌貼紙組（6入）", category: "merch", price: 120, image: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=500&q=80", desc: "防水貼紙，各款設計隨機附上" },
    { id: "m-6", name: "不鏽鋼開瓶器鑰匙圈", category: "merch", price: 180, image: "https://media.istockphoto.com/id/535942817/zh/%E7%85%A7%E7%89%87/heart-shaped-bottle-opener-keychain-isolated.jpg?s=612x612&w=0&k=20&c=iO8dkfOdPayMv3jAcgcP82V2UnRRNqnvDN8aJkhRTKc=", desc: "隨身開瓶器，印有53字樣" },
    { id: "m-7", name: "HoLin53 帽T", category: "merch", price: 980, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80", desc: "寬版帽T，胸前刺繡Logo" },
    { id: "m-8", name: "頸掛式背帶杯套", category: "merch", price: 320, image: "https://media.istockphoto.com/id/1502659573/zh/%E7%85%A7%E7%89%87/crochet-yeti-bag-handmade-background-texture-abstract-for-decoration.jpg?s=612x612&w=0&k=20&c=PY8IS7KFidnePISixRkyKcxQMWnuSSYjAcm6-_yZ-Bo=", desc: "帆布頸掛背帶，可掛350-500ml罐裝" },
    { id: "m-9", name: "原木單瓶酒架", category: "merch", price: 550, image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=500&q=80", desc: "原木材質酒瓶展示架，居家擺設首選" },
    { id: "m-10", name: "限定帆布杯袋", category: "merch", price: 150, image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=500&q=80", desc: "裝罐裝或瓶裝都OK，印有53字樣" }
];

// ===== 渲染產品 =====
let container = document.getElementById('product-container');

function renderProducts(data) {
    let htmlContent = '';

    data.forEach(product => {
        const safeId = product.id.trim();
        const isMerch = product.category === 'merch';

        if (isMerch) {
            htmlContent += `
            <div class="col-12 col-md-6 col-lg-3 mb-4">
                <div class="product-card">
                    <div class="beer-box">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="text-box">
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-specs">${product.desc || ''}</div>
                        <p class="price">$ ${product.price}</p>
                        <button class="add-to-cart-btn" data-id="${safeId}" onclick="addToCart('${safeId}')">
                            <i class="bi bi-cart-plus"></i> 加入購物車
                        </button>
                    </div>
                </div>
            </div>`;
        } else {
            const isFav = favorites.some(f => f.id.trim() === safeId);
            htmlContent += `
            <div class="col-12 col-md-6 col-lg-3 mb-4">
                <div class="product-card">
                    <div class="beer-box">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="text-box">
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-specs">
                            <span>${product.volume}</span> | <span>ABV ${product.abv}</span>
                        </div>
                        <p class="price">$ ${product.price}</p>
                        <button class="fav-btn ${isFav ? 'favorited' : ''}" data-id="${safeId}" onclick="toggleFavorite('${safeId}')">
                            <i class="bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}"></i> ${isFav ? '已收藏' : '收藏'}
                        </button>
                    </div>
                </div>
            </div>`;
        }
    });

    container.innerHTML = htmlContent;
}

function filterProducts(category, btnElement) {
    if (btnElement) {
        let buttons = document.querySelectorAll('.btn-custom');
        buttons.forEach(btn => btn.classList.remove('active'));
        btnElement.classList.add('active');
    }
    let filtered = products.filter(item => item.category === category);
    renderProducts(filtered);
}

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    initPanelsUI();
    filterProducts("national");
    renderCart();
    renderFavorites();
});