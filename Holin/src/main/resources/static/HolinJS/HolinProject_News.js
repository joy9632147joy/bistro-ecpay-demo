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
    { id: "2025", label: "2025" },
    { id: "2024", label: "2024" }
]

let newsData = [
    {
        title: "跨年電音派對",
        date: "2025-12-31",
        displayDate: "2025.12.31(三) 21:30-00:30",
        location: "Holin53",
        price: "$1499",
        content: "精釀啤酒喝到飽 (當天全站席，無供餐)",
        guest: "DJ　Labbi｜Seven",
        img: "./newsImg/DJ.jpg"
    },
    {
        title: "聖誕駐唱 Live",
        date: "2025-12-24",
        displayDate: "2025.12.24(三) 20:00-22:00",
        location: "Holin53",
        price: "免入場費，低消$600",
        content: "",
        guest: "米粒島｜小四",
        img: "./newsImg/小四.jpg"
    },
    {
        title: "駐唱 Live",
        date: "2025-11-28",
        displayDate: "2025.11.28(五) 20:00-22:00",
        location: "Holin53",
        price: "免入場費，低消$600",
        content: "",
        guest: "米涵｜木堅",
        img: "./newsImg/米涵.jpg"
    },
    {
        title: "爵士之夜",
        date: "2025-09-13",
        displayDate: "2025.09.13(六) 19:30-20:30",
        location: "Holin53",
        price: "入場費$500/人，含一杯飲品(任選，750ml除外)",
        content: "",
        guest: "宋楚琳",
        img: "./newsImg/宋.jpg"
    },
    {
        title: "駐唱 Live",
        date: "2025-07-11",
        displayDate: "2025.07.11(五) 20:00-22:00",
        location: "Holin53",
        price: "入場費$500/人，可全額折抵",
        content: "",
        guest: "俊棠｜竹君",
        img: "./newsImg/竹君.jpg"
    },
    {
        title: "寵物瑜珈",
        date: "2025-06-28",
        displayDate: "2025.06.28(六) 16:30-17:30",
        location: "水湳中央公園",
        price: "$500",
        content: "瑜珈課程+熱帶水果酒",
        guest: "瑜珈老師-雅甄",
        img: "./newsImg/寵物瑜珈.jpg"
    },
    {
        title: "駐唱 Live",
        date: "2025-06-13",
        displayDate: "2025.06.13(五) 20:00-22:00",
        location: "Holin53",
        price: "免入場費，低消$500",
        content: "",
        guest: "米粒島",
        img: "./newsImg/米粒島.jpg"
    },
    {
        title: "端午駐唱 Live",
        date: "2025-05-30",
        displayDate: "2025.05.30(五) 20:00-22:00",
        location: "Holin53",
        price: "入場費$450/人，含一顆肉粽+一瓶東泉辣椒醬釀製之啤酒",
        content: "",
        guest: "黑泥",
        img: "./newsImg/黑泥.jpg"
    },
    {
        title: "駐唱 Live",
        date: "2025-03-21",
        displayDate: "2025.03.21(五) 20:00-22:00",
        location: "Holin53",
        price: "入場費$500/人，含一杯飲品(任選，750ml除外)",
        content: "",
        guest: "米粒島",
        img: "./newsImg/米粒2.jpg"
    },
    {
        title: "情歌KTV派對",
        date: "2025-02-14",
        displayDate: "2025.02.14(二) 18:30-23:30",
        location: "Holin53",
        price: "$450 (含一杯環遊世界$420+1份千層蛋糕$150)",
        content: "K歌 + 全品項生啤與指定瓶裝十餘款「喝到飽」",
        guest: "",
        img: "./newsImg/跨年2024.jpg"
    },
    {
        title: "品酒會",
        date: "2025-01-18",
        displayDate: "2025.01.18(六) 19:00-21:00",
        location: "Holin53",
        price: "入場費$1200/人 (含炸魷魚、雞米花)",
        content: "法國酒莊大小事 + 多款金選酒莊紅白酒試飲",
        guest: "Kim阿金",
        img: "./newsImg/品酒會.jpg"
    },
    {
        title: "跨年活動",
        date: "2024-12-31",
        displayDate: "2024.12.31(一) 20:00-00:30",
        location: "Holin53",
        price: "$1000 (不含餐食)",
        content: "K歌 + 全品項生啤與指定瓶裝十餘款「喝到飽」",
        guest: "",
        img: "./newsImg/跨年2025.jpg"
    },
    {
        title: "聖誕交換禮物",
        date: "2024-12-28",
        displayDate: "2024.12.28(六) 19:00-22:00",
        location: "Holin53",
        price: "入場費$350/人 (含一杯330ml飲品)",
        content: "禮物金額$300，單身者優先",
        guest: "",
        img: "./newsImg/交換禮物.jpg"
    },
    {
        title: "梅特諾亞爵士三重奏",
        date: "2024-12-21",
        displayDate: "2024.12.21(六) 19:30-20:30",
        location: "Holin53",
        price: "入場費$500/人，含一杯飲品 (任選，750ml除外)",
        content: "",
        guest: "宋楚琳",
        img: "./newsImg/宋2.jpg"
    },
    {
        title: "Chill more party",
        date: "2024-11-09",
        displayDate: "2024.11.09(六) 17:00-20:30",
        location: "Holin53",
        price: "$1200",
        content: "飲品暢飲 + 營養課程講座 + 擇一時段Flow課程",
        guest: "專業瑜珈老師-雅甄 / 營養師-weiwei",
        img: "./newsImg/營養師.jpg"
    },
    {
        title: "駐唱 Live",
        date: "2024-09-17",
        displayDate: "2024.09.17(二) 19:00-20:00",
        location: "Holin53",
        price: "免費入場，低消$200/人",
        content: "",
        guest: "俊棠、竹君",
        img: "./newsImg/竹君2.jpg"
    },
    {
        title: "Beer Yoga",
        date: "2024-08-03",
        displayDate: "2024.08.03(六) 17:00-20:30",
        location: "Holin53",
        price: "$1200",
        content: "飲品暢飲 + 營養課程講座 + 擇一時段Flow課程",
        guest: "專業瑜珈老師-雅甄 / 營養師-weiwei",
        img: "./newsImg/瑜珈.jpg"
    }
];


document.addEventListener("DOMContentLoaded", function () {
    // 1. 取得當前年月
    let now = new Date();
    let currentYear = now.getFullYear();
    let currentMonth = String(now.getMonth() + 1).padStart(2, '0'); 
    let currentYearMonth = `${currentYear}-${currentMonth}`; 

    // 2. 篩選當月活動
    let currentMonthEvents = newsData.filter(event =>
        event.date.startsWith(currentYearMonth)
    );

    // 3. 按日期排序(新的在前面)
    currentMonthEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 4. 本月活動
    renderFeaturedEvents(currentMonthEvents);

    // 5. 預設2025的活動
    filterActivities("2025", document.querySelector(".btn-year"));
});


// 本月活動
function renderFeaturedEvents(events) {
    let container = document.querySelector('.activity-major-section #major-content');

    if (!container) return;

    if (events.length === 0) {
        container.innerHTML = /*html*/`
            <div class="text-center text-white py-5">
                <h3>本月暫無活動</h3>
                <p>敬請期待下個月的精彩活動！</p>
            </div>
        `;
        return;
    }

    let  htmlContent = "";

    events.forEach((event) => {
        let  guestHtml = event.guest ? /*html*/
            `<p class="mb-3"><strong style="font-size:larger; color:#C5A059">特別邀請：</strong>${event.guest}</p>` : '';

        let  contentHtml = event.content ? /*html*/
            `<p class="mb-3 fw-bold" style="font-size:1.2rem; color:white; line-height:10px;">
                <i class="bi bi-stars me-2" style="color:#C5A059;"></i>${event.content}
            </p>` : '';

        htmlContent += /*html*/`
            <div class="row justify-content-center mb-5 align-items-center"> 
                <div class="col-12 col-lg-5 mb-4 mb-lg-2">
                    <div class="activity-img-wrapper shadow-lg">
                        <img src="${event.img}" class="img-fluid rounded-1" alt="${event.title}">
                    </div>
                </div>

                <div class="col-12 col-lg-7 text-white">
                    <div class="ps-lg-4 text-center text-lg-start d-flex flex-column">
                        <div class="flex-grow-1">
                                                
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <h2 class="fw-bold m-0" style="color: #C5A059;">${event.title}</h2>
    
                                <a href="HolinProject_ReservationAndContact.html" class="btn btn-booking">立即預約</a>
                            </div>
                            
                            <div class="activity-info">
                                <p class="mb-2"><i class="bi bi-clock me-2" style="color:#C5A059"></i>${event.displayDate}</p>
                                <p class="mb-2"><i class="bi bi-geo-alt me-2" style="color:#C5A059"></i>${event.location}</p>
                                <p class="mb-3"><i class="bi bi-ticket-perforated me-2" style="color:#C5A059"></i>${event.price}</p>
                        
                                ${guestHtml}
                                ${contentHtml}
                            </div>

                            
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = htmlContent;
}

//歷年活動
function filterActivities(year, btnElement) {
    // 移除所有按鈕的 Active class
    document.querySelectorAll('.btn-year').forEach(btn => btn.classList.remove('Active'));



    // 為當前按鈕加上 Active
    if (btnElement) btnElement.classList.add("Active");

    // 取得當前年月（用來排除本月活動）
    let now = new Date();
    let currentYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    // 篩選指定年份的活動，但排除「當月」的活動
    let filterData = newsData.filter(event =>
        event.date.startsWith(year) && !event.date.startsWith(currentYearMonth)
    );

    filterData.sort((x, y) => new Date(y.date) - new Date(x.date));

    let  container = document.querySelector('.activity-section #memory-content');
    let  htmlContent = "";

    if (filterData.length === 0) {
        htmlContent = /*html*/`<div class="text-center text-white py-5"><h3>暫時沒有${year}年的回顧活動</h3></div>`;
    } else {
        filterData.forEach((event) => {
            let  guestHtml = event.guest ? /*html*/
                `<p class="mb-3"><strong style="font-size:larger; color:#C5A059">特別邀請：</strong>${event.guest}</p>` : '';

            let  contentHtml = event.content ? /*html*/
                `<p class="mb-3 fw-bold" style="font-size:1.1rem; color:white;">
                    <i class="bi bi-stars me-2" ></i>${event.content}</p>` : '';



            htmlContent += /*html*/ `
                
                    <div class="col-12 col-lg-6 mb-4">
                        <div class="event-card-wrapper p-3">
                            <div class="row g-3 align-items-center">
                    
                                <!-- 左側圖片 -->
                                <div class="col-5">
                                    <div class="event-img-small">
                                        <img src="${event.img}" class="img-fluid rounded" alt="${event.title}">
                                    </div>
                                </div>
                    
                                <!-- 右側文字 -->
                                <div class="col-7">
                                    <span class="badge mb-3">${event.date.substring(0, 4)} Events</span>
                                    <h4 class="fw-bold mb-2" style="color:#C5A059;">${event.title}</h4>
                                    <div class="activity-info text-white">
                                        <p class="mb-2"><i class="bi bi-clock me-2" style="color:#C5A059"></i>${event.displayDate}</p>
                                        <p class="mb-2"><i class="bi bi-geo-alt me-2" style="color:#C5A059"></i>${event.location}</p>
                                        <p class="mb-3"><i class="bi bi-ticket-perforated me-2" style="color:#C5A059"></i>${event.price}</p>
                            
                                        ${guestHtml}
                                        ${contentHtml}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
            `;
        });
    }
    container.innerHTML = htmlContent;

    let cards = container.querySelectorAll('.col-12.col-lg-6');
    if (cards.length % 2 === 1) {
        cards[cards.length - 1].style.marginRight = 'auto';
    }
}

