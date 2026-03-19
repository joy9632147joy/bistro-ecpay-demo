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

