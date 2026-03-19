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




// GoogleSheet:https://docs.google.com/spreadsheets/d/1dsH6dm14FNQr_Zunbb4hzCurRJinKivTUIWZjyyvI6Q/edit?gid=0#gid=0
// 已發布 https://docs.google.com/spreadsheets/d/e/2PACX-1vTR3ZPMfAzyzkaPrx-MCucDjc40KOmddFCuuzTNQqujzHhUHaIiHe2hP5mpRwvS0KDHlaYGRLrmj-Z3/pubhtml


let GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxX8_UoeL2xF_PmQ9NhMe9MnztmWInTl3KPzaPSZHJUFHdEbUP9xms_fMhqFBffgO-3ZA/exec';
// 取得按鈕並監聽點擊事件
let submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', async function (e) {
    e.preventDefault();
    // 1. 抓取欄位資料
    let name = document.getElementById('name').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let email = document.getElementById('email').value.trim();
    let message = document.getElementById('message').value.trim();

    // 2. 簡單驗證 (可選)
    // if (name === '' || phone === '' || message === '') {
    //     alert('請填寫姓名、手機與需求！');
    //     return;
    // }

    let form=e.target.closest("form");

    if(!form.checkValidity()){
        form.reportValidity();
        return;
    }

    // 3. 建立一個物件 (Object)
    let formData = {
        timestampTW: new Date().toLocaleString(),
        name: name,
        phone: phone,
        email: email,
        message: message,
    };


    // 4. 模擬資料庫操作
    // 先從 LocalStorage 拿出舊資料 (如果沒有就是空陣列)
    // let  database = JSON.parse(localStorage.getItem('contact_db')) || [];

    // 把新資料推進去
    // database.push(formData);

    // 把更新後的資料轉成 JSON 字串，存回去
    // localStorage.setItem('contact_db', JSON.stringify(database));



    // 需再次詳讀的地方 關於兩個地方做關聯
    submitBtn.disabled = true;
    submitBtn.value = '送出中...';

    try {
        // 5. 發送到 Google Sheets
        let response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // 重要：Google Apps Script 需要用 no-cors
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // 5. 成功回饋
        console.log("目前的 JSON 資料庫內容：", formData);
        alert('填寫成功！後續將由專人為您服務~');

        // 清空欄位
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';

    } catch (error) {
        console.error('送出失敗:', error);
        alert('送出失敗，請稍後再試或直接撥打電話聯絡我們！');
    } finally {
        // 7. 恢復按鈕狀態
        submitBtn.disabled = false;
        submitBtn.value = '送出表單';
        submitBtn.style.opacity = '1';
    }
});


