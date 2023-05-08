window.onload = function() {
    let cancel = document.getElementById('cancel');
    let param = new URLSearchParams(location.search);
    let type = param.get('type');
    let duplicatedalert = document.getElementById('duplicatedalert');
    let duplication = document.getElementById('checkbutton');
    let memberid = document.getElementById('memberid');
    memberid.readOnly=true;
    let join = document.getElementById('join');
    let title = document.getElementById('title');

    if(type != '' && type != null) {
        comm('get').then(function(data) {
            if(data) {
                duplication.setAttribute('style', 'display:none');
                duplicatedalert.setAttribute('style', 'display:none');
                join.value = "情報修正";
                title.innerText = "個人情報の修正";
            }
        });
    } else {
        duplication.setAttribute('style', 'display:block');
        duplicatedalert.setAttribute('style', 'display:block');
        memberid.readOnly=false;
        join.value = "加入";
        title.innerText = "会員加入";
    }

    join.addEventListener('click', function(){
        signUpCheck(type);
    });

    cancel.addEventListener('click', function() {
        back(type);
    });


}

function back(type) {
    if(type != '' && type != null) {
        location.href="menu.html";
    } else {
        location.href="index.html";
    }
}

function duplicatedCheck() {
    let id = document.getElementById('memberid');
    let dalert = document.getElementById('duplicatedalert');

    if(id.value == null || id.value == '') {
        alert('IDを入力してください。');
        return;
    }
    checkComm(id.value).then(function(res){
        if(res) {
            dalert.innerText="使用できるIDです。";
        } else {
            dalert.innerText="使用できないIDです。";
            id.value = "";
        }
    });

}

function signUpCheck(type){
   check(type).then(function(res) {
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
                    alert('成功');
                    resolve(true);
                } else {
                    alert('失敗');
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
        let id = document.getElementById('memberid');
        let pw = document.getElementById('memberpw');
        let pw2 = document.getElementById('memberpw2');
        let name = document.getElementById('membername');
        let mail = document.getElementById('email');
        let ph = document.getElementById('phone');
        let addr = document.getElementById('address');
        let his = document.getElementById('history');
        let all = document.getElementById('allergy');
        let med = document.getElementById('medicine');
        let url = "https://112.133.178.18:10201/medicine/member";
        let method = '';

        if(type == '' || type == null) {
            method = 'POST';
        } else if(type == 'get') {
            url ="https://112.133.178.18:10201/medicine/member/info/id";
            method = 'GET';
        } else {
            url = "https://112.133.178.18:10201/medicine/member/info/id";
            method = 'PUT'
        }


        let data = JSON.stringify({
            memberid: id.value,
            memberpw: pw.value,
            membername: name.value,
            email: mail.value,
            phone: ph.value,
            address: addr.value,
            history: his.value,
            allergy: all.value,
            medicine: med.value
        });	

        const xhr = new XMLHttpRequest();

        xhr.open(method, url, true);

        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');

        if(type == 'get') {
            xhr.send();

            xhr.onload = function () {
                if (xhr.status == 200) {
                        let json = JSON.parse(xhr.responseText);
                        id.value = json.memberid;
                        pw.value = null;
                        pw2.value = null;
                        name.value = json.membername;
                        mail.value = json.email;
                        ph.value = json.phone;
                        addr.value = json.address;
                        his.value = json.history;
                        all.value = json.allergy;
                        med.value = json.medicine;
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
                        alert('成功');
                        resolve(true);
                    } else {
                        alert('失敗');
                        resolve(false);
                    }
                } else {
                    console.log('failed');
                }
            }
        }
    })
}

function check(type) {
    return new Promise(function (resolve) {
        let memberid = document.getElementById('memberid');
        let memberpw = document.getElementById('memberpw');
        let memberpw2 = document.getElementById('memberpw2');
        let membername = document.getElementById('membername');
        let email = document.getElementById('email');
        let phone = document.getElementById('phone');
        let address = document.getElementById('address');
        
    
        if(memberid.value == "" || memberid.value == null){
            alert('IDを入力してください。');
            memberid.focus();
            resolve(false);
            return;
        }
    if(type == '' || type == null) {
        if(memberpw.value == "" || memberpw.value == null){
            alert('パスワードを入力してください。');
            memberpw.focus();
            resolve(false);
            return;
        }
        let duplitext = document.getElementById('duplicatedalert');
        if(!duplitext.innerText.includes('できる')){
            alert('IDの重複検査をしてください。');
            address.focus();
            resolve(false);
            return;
        }
    }
    if(memberpw.value != memberpw2.value){
        alert('パスワードが一致しません。');
        memberpw2.focus();
        resolve(false);
        return;
    }
        if(membername.value == "" || membername.value == null){
            alert('名前を入力してください。');
            membername.focus();
            resolve(false);
            return;
        }
        if(email.value == "" || email.value == null){
            alert('メールを入力してください。');
            email.focus();
            resolve(false);
            return;
        }
        if(phone.value == "" || phone.value == null){
            alert('携帯番号を入力してください。');
            phone.focus();
            resolve(false);
            return;
        }
        if(address.value == "" || address.value == null){
            alert('住所を入力してください。');
            address.focus();
            resolve(false);
            return;
        }
    
        resolve(true);
        return;
    })
}
function goMain(){
    location.href="menu.html";
}