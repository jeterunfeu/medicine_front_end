function back() {
    location.href="index.html";
}

function duplicatedCheck() {
    let id = document.getElementById('memberid');
    let dalert = document.getElementById('duplicatedalert');

    if(id.value == null || id.value == '') {
        alert('아이디를 입력해주세요');
        return;
    }
    checkComm(id.value).then(function(res){
        if(res) {
            dalert.innerText="사용가능한 아이디입니다.";
        } else {
            dalert.innerText="사용불가능한 아이디입니다.";
            id.value = "";
        }
    });

}

function signUpCheck(){
   check().then(function(res) {
    if(res) {
        comm().then(function(res) {
            if(res) {
                location.href="./index.html";
            }
        })
    } else {
        return;
    }
   })
}

function checkComm(id) {
    return new Promise(function (resolve) {
        let url = "https://112.133.178.18:10201/medicine/member/idcheck/"+id;

        const xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');

        xhr.send();

        xhr.onload = function () {
            if (xhr.status == 200) {
                if(xhr.responseText == 'true') {
                    alert('성공');
                    resolve(true);
                } else {
                    alert('실패');
                    resolve(false);
                }
            } else {
                console.log('failed')
            }
        }

    });
}

function comm() {
    return new Promise(function (resolve) {
        let id = document.getElementById('memberid').value;
        let pw = document.getElementById('memberpw').value;
        let name = document.getElementById('membername').value;
        let mail = document.getElementById('email').value;
        let ph = document.getElementById('phone').value;
        let addr = document.getElementById('address').value;

        let url = "https://112.133.178.18:10201/medicine/member";

        let data = JSON.stringify({
            memberid: id,
            memberpw: pw,
            membername: name,
            email: mail,
            phone: ph,
            address: addr
        });	

        const xhr = new XMLHttpRequest();

        xhr.open('POST', url, true);

        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');

        xhr.send(data);

        xhr.onload = function () {
            if (xhr.status == 200) {
                if(xhr.responseText == 'true') {
                    alert('성공');
                    resolve(true);
                } else {
                    alert('실패');
                    resolve(false);
                }
            } else {
                console.log('failed')
            }
        }
    })
}

function check() {
    return new Promise(function (resolve) {
        let memberid = document.getElementById('memberid');
        let memberpw = document.getElementById('memberpw');
        let memberpw2 = document.getElementById('memberpw2');
        let membername = document.getElementById('membername');
        let email = document.getElementById('email');
        let phone = document.getElementById('phone');
        let address = document.getElementById('address');
        
    
        if(memberid.value == "" || memberid.value == null){
            alert('아이디를 입력하세요.');
            memberid.focus();
            resolve(false);
            return;
        }
        if(memberpw.value == "" || memberpw.value == null){
            alert('비밀번호를 입력하세요.');
            memberpw.focus();
            resolve(false);
            return;
        }
        if(memberpw.value != memberpw2.value){
            alert('비밀번호가 일치하지 않습니다.');
            memberpw2.focus();
            resolve(false);
            return;
        }
        if(membername.value == "" || membername.value == null){
            alert('이름을 입력하세요.');
            membername.focus();
            resolve(false);
            return;
        }
        if(email.value == "" || email.value == null){
            alert('이메일을 입력하세요.');
            email.focus();
            resolve(false);
            return;
        }
        if(phone.value == "" || phone.value == null){
            alert('핸드폰 번호를 입력하세요.');
            phone.focus();
            resolve(false);
            return;
        }
        if(address.value == "" || address.value == null){
            alert('주소를 입력하세요.');
            address.focus();
            resolve(false);
            return;
        }
        let duplitext = document.getElementById('duplicatedalert');
        if(!duplitext.innerText.includes('사용가능')){
            alert('아이디 중복검사를 해주세요.');
            address.focus();
            resolve(false);
            return;
        }
    
        resolve(true);
        return;
    })
}