window.onload = function () {
    let body = document.getElementById('body');
    let sympthom = document.getElementById('sympthom');
    let diagnosis = document.getElementById('diagnosis');
    let medicine = document.getElementById('medicine');
    let history = document.getElementById('history');
    let info = document.getElementById('info');
    let out = document.getElementById('logout');

    body.addEventListener('click', function() {
        location.href="bodyCheck.html";
    });
    sympthom.addEventListener('click', function() {
        location.href="symptom.html";
    });
    diagnosis.addEventListener('click', function() {
        location.href="diagnosis.html";
    });
    medicine.addEventListener('click', function() {
        location.href="medicine.html";
    });
    history.addEventListener('click', function() {
        location.href="history.html";
    });
    info.addEventListener('click', function() {
        location.href="signup.html?type=modify";
    });
    out.addEventListener('click', function() {
        let result = confirm('로그아웃 하시겠습니까?');
        if(result) {
            location.href="member/logout";
        }
    });
}
