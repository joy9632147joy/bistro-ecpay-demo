// 導覽列  監聽網頁滾動事件
window.addEventListener('scroll', function () {
    let navbar = document.querySelector('.navbar');
    if (window.scrollY > 200) {
        navbar.classList.add('scrolled'); 
    } else {
        navbar.classList.remove('scrolled'); 
    }
});



// 至頂
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






let category = [
    { id: "fried", label: "各式炸物" },
    { id: "pizza", label: "經典PIZZA" },
    { id: "dumpling", label: "冰花煎餃" },

]

let food = [

    //--- 各式炸物 (id="fried") ---
    {
        id: "f-1",
        name: "美式炸薯條",
        category: "fried",
        price: 100,
        content: "經典美式粗薯，外酥內軟，撒上薄鹽就是最簡單的美味。",
        image: "./menu/row-1-column-1.jpg"
    },
    {
        id: "f-2",
        name: "洋蔥圈",
        category: "fried",
        price: 120,
        content: "整圈新鮮洋蔥裹粉酥炸，咬下喀滋作響，香甜不辛辣。",
        image: "./menu/row-1-column-2.jpg"
    },
    {
        id: "f-3",
        name: "起司條",
        category: "fried",
        price: 120,
        content: "香濃莫札瑞拉起司芯，趁熱吃享受超長牽絲的療癒口感。",
        image: "./menu/row-1-column-3.jpg"
    },
    {
        id: "f-4",
        name: "雞米花",
        category: "fried",
        price: 150,
        content: "一口一個剛剛好，鮮嫩多汁，搭配精釀啤酒的絕佳夥伴。",
        image: "./menu/row-1-column-4.jpg"
    },
    {
        id: "f-5",
        name: "炸雞翅",
        category: "fried",
        price: 160,
        content: "薄皮酥脆風格，保留雞肉原始鮮甜肉汁，吮指回味。",
        image: "./menu/row-3-column-2.jpg"
    },
    {
        id: "f-6",
        name: "炸物拼盤(綜合以上五樣)",
        category: "fried",
        price: 380,
        content: "選擇困難救星！薯條、洋蔥圈、起司條、雞米花、雞翅一次滿足。",
        image: "./menu/row-2-column-2.jpg"
    },
    {
        id: "f-7",
        name: "炸魷魚",
        category: "fried",
        price: 160,
        content: "嚴選鮮甜魷魚圈，麵衣輕薄酥脆，口感Q彈有嚼勁。",
        image: "./menu/row-3-column-1.jpg"
    },
    {
        id: "f-8",
        name: "紐奧良烤雞翅",
        category: "fried",
        price: 160,
        content: "獨特紐奧良香料醃製入味，烘烤出微辣鹹香的誘人色澤。",
        image: "./menu/row-2-column-4.jpg"
    },
    {
        id: "f-9",
        name: "唰嘴現炸蝦片(黑胡椒)",
        category: "fried",
        price: 100,
        content: "手工現炸蝦片，口感爽脆，黑胡椒香氣讓人一片接一片停不下來。",
        image: "./menu/row-3-column-3.jpg"
    },
    {
        id: "f-10",
        name: "炸鱈魚條",
        category: "fried",
        price: 160,
        content: "細緻鱈魚肉裹上金黃麵衣，外脆內嫩，鮮味十足。",
        image: "./menu/row-3-column-4.jpg"
    },

    // --- 經典PIZZA (id="pizza") ---
    {
        id: "p-1",
        name: "瑪格麗特(奶素)",
        category: "pizza",
        price: 250,
        content: "義大利經典，新鮮番茄紅醬、羅勒葉與莫札瑞拉起司的完美三重奏。",
        image: "./menu/pizza/p.jpg"
    },
    {
        id: "p-2",
        name: "夏威夷",
        category: "pizza",
        price: 250,
        content: "酸甜鳳梨搭配鹹香火腿，大人小孩都無法抗拒的人氣口味。",
        image: "./menu/pizza/row-1-column-2.jpg"
    },
    {
        id: "p-3",
        name: "田園鮮蔬(奶素)",
        category: "pizza",
        price: 250,
        content: "舖滿當季新鮮時蔬，清爽無負擔，享受蔬菜本身的鮮甜。",
        image: "./menu/pizza/row-1-column-3.jpg"
    },
    {
        id: "p-4",
        name: "BBQ 雞肉",
        category: "pizza",
        price: 280,
        content: "鮮嫩雞肉佐以特製美式BBQ醬，鹹甜煙燻風味，重口味首選。",
        image: "./menu/pizza/row-1-column-4.jpg"
    },
    {
        id: "p-5",
        name: "京畿道歐爸(泡菜豬)",
        category: "pizza",
        price: 280,
        content: "韓式酸辣泡菜搭配豬五花，中西合併的創意微辣口感。",
        image: "./menu/pizza/row-2-column-1.jpg"
    },
    {
        id: "p-6",
        name: "辣味墨西哥雞",
        category: "pizza",
        price: 280,
        content: "墨西哥香料醃製雞肉，搭配墨西哥辣椒，香辣刺激味蕾。",
        image: "./menu/pizza/row-2-column-2.jpg"
    },
    {
        id: "p-7",
        name: "蒜香奶油白醬雞",
        category: "pizza",
        price: 280,
        content: "濃郁白醬基底，散發迷人蒜香，口感滑順濃郁。",
        image: "./menu/pizza/row-2-column-3.jpg"
    },
    {
        id: "p-8",
        name: "白醬松露野菇(奶素)",
        category: "pizza",
        price: 280,
        content: "奢華松露香氣搭配綜合野菇，每一口都是優雅的高級享受。",
        image: "./menu/pizza/row-2-column-4.jpg"
    },
    {
        id: "p-9",
        name: "義式臘腸",
        category: "pizza",
        price: 280,
        content: "鋪滿經典義式臘腸(Pepperoni)，簡單卻經典的鹹香風味。",
        image: "./menu/pizza/row-3-column-1.jpg"
    },
    {
        id: "p-10",
        name: "迷幻賈斯丁(甜)",
        category: "pizza",
        price: 250,
        content: "白巧克力基底，搭配草莓、香蕉與OREO碎片，夢幻的甜點披薩。",
        image: "./menu/pizza/row-3-column-2.jpg"
    },
    {
        id: "p-11",
        name: "蘋果超派甜披薩(甜)",
        category: "pizza",
        price: 250,
        content: "肉桂蜜蘋果的經典組合，溫暖香甜，彷彿置身歐美節慶。",
        image: "./menu/pizza/row-3-column-3.jpg"
    },

    // --- 冰花煎餃 (id="dumpling") ---
    {
        id: "d-1",
        name: "高麗菜冰花煎餃",
        category: "dumpling",
        price: 180,
        content: "底部金黃酥脆的冰花外皮，內餡高麗菜爽脆清甜。(每份10顆)",
        image: "./menu/dump/row-1-column-1.jpg"
    },
    {
        id: "d-2",
        name: "韭菜冰花煎餃",
        category: "dumpling",
        price: 180,
        content: "濃郁韭菜香氣與鮮肉完美比例，風味十足。(每份10顆)",
        image: "./menu/dump/row-2-column-1.jpg"
    },
    {
        id: "d-3",
        name: "鮮蝦冰花煎餃",
        category: "dumpling",
        price: 270,
        content: "每口都吃得到整隻鮮甜蝦仁，海味與脆皮的雙重享受。(每份10顆)",
        image: "./menu/dump/row-3-column-1.jpg"
    }

];


// 取得網頁上的容器
let container = document.getElementById('food-container');

// 1. 定義函式產生HTML
function renderFood(data) {
    let  htmlContent = '';

    data.forEach(food => {
        htmlContent +=/*html*/ `
        <div class=" col-md-6 col-lg-4">
          <div class="food-card shadow-sm">
              <div class="food-box">
                  <img src="${food.image}" alt="${food.name}">
              </div>
                <div class="text-box">
                  <h3 class="food-name">${food.name}</h3>
                  <div class="food-specs">
                      <span>${food.content}</span>
                  </div>
                  <p class="price">$ ${food.price}</p>
                </div>
          </div>
        </div>
    `;
    });

    // 把生成的HTML放進去
    container.innerHTML = htmlContent;
}

// 2. 選的按鈕發亮
function filterFood(category, btnElement) {

    if (btnElement) {
        // 1. 找到所有按鈕，移除 active
        let buttons = document.querySelectorAll('.btn-custom');
        buttons.forEach(btn => btn.classList.remove('active'));

        // 2. 幫被點擊的按鈕加上 active
        btnElement.classList.add('active');
    }

    // 篩選資料
        let filtered = food.filter(food => food.category === category);
        renderFood(filtered);
    
}
filterFood("fried");
