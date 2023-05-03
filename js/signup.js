window.onload = function() {
    let param = new URLSearchParams(location.search);
    let type = param.get('type');
    let duplicatedalert = document.getElementById('duplicatedalert');
    let duplication = document.getElementById('checkbutton');
    let memberid = document.getElementById('memberid');
    let join = document.getElementById('join');

    if(type != '' && type != null) {
        comm('get').then(function(data) {
            if(data) {
                duplication.setAttribute('style', 'display:none');
                duplicatedalert.setAttribute('style', 'display:none');
                memberid.setAttribute('readonly', true);
                join.value = "수정하기"
            }
        });
    } else {
        duplication.setAttribute('style', 'display:block');
        duplicatedalert.setAttribute('style', 'display:block');
        memberid.setAttribute('readonly', false);
        join.value = "가입하기"
    }

    join.addEventListener('click', function(){
        signUpCheck(type);
    });
}

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

function signUpCheck(type){
   check().then(function(res) {
    if(res) {
            comm(type).then(function(res) {
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

function comm(type) {
    return new Promise(function (resolve) {
        let id = document.getElementById('memberid').value;
        let pw = document.getElementById('memberpw').value;
        let pw2 = document.getElementById('memberpw2').value;
        let name = document.getElementById('membername').value;
        let mail = document.getElementById('email').value;
        let ph = document.getElementById('phone').value;
        let addr = document.getElementById('address').value;
        let his = document.getElementById('history').value;
        let all = document.getElementById('allergy').value;
        let med = document.getElementById('medicine').value;
        url = "https://112.133.178.18:10201/medicine/member";
        let method = '';

        if(type == '' || type == null) {
            method = 'POST';
        } else if(type == 'get') {
            url ="https://112.133.178.18:10201/medicine/member/id";
            method = 'GET';
        } else {
            method = 'PUT'
        }


        let data = JSON.stringify({
            memberid: id,
            memberpw: pw,
            membername: name,
            email: mail,
            phone: ph,
            address: addr,
            history: his,
            allergy: all,
            medicine: med
        });	

        const xhr = new XMLHttpRequest();

        xhr.open(method, url, true);

        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');

        if(type == 'get') {
            xhr.send();

            xhr.onload = function () {
                if (xhr.status == 200) {
                        let json = JSON.parse(xhr.responseText);
                        id = json.memberid;
                        pw = json.memberpw;
                        pw2 = json.memberpw;
                        name = json.membername;
                        mail = json.email;
                        ph = json.phone;
                        addr = json.address;
                        his = json.history;
                        all = json.allergy;
                        med = json.medicine;
                        resolve(true);
                } else {
                    console.log('failed')
                    resolve(false);
                }
            }
        } else {
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