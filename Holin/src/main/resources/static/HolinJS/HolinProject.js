
document.addEventListener("DOMContentLoaded", function () {
    let modal = document.getElementById("age-modal");
    let btnYes = document.getElementById("btn-yes");
    let btnNo = document.getElementById("btn-no");

    // 檢查是否已經驗證過 (用 localStorage)
    if (localStorage.getItem("ageVerified") === "true") {
        modal.style.display = "none";
    }

    // 點擊「是」
    btnYes.addEventListener("click", function () {
        localStorage.setItem("ageVerified", "true"); // 記住使用者已滿18歲
        modal.style.opacity = "0";
        setTimeout(() => {
            modal.style.display = "none";
        }, 500); //500毫秒
    });

    // 點擊「否」
    btnNo.addEventListener("click", function () {
        alert("本網站內容僅供 18 歲以上人士瀏覽！");
        window.location.href = "https://maps.app.goo.gl/YMkfuPDTutvSJMuFA"; 
    });
});

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

