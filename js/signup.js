function signUpCheck(){
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
        return false;
    }
    if(memberpw.value == "" || memberpw.value == null){
        alert('비밀번호를 입력하세요.');
        memberpw.focus();
        return false;
    }
    if(memberpw.value != memberpw2.value){
        alert('비밀번호가 일치하지 않습니다.');
        memberpw2.focus();
        return false;
    }
    if(membername.value == "" || membername.value == null){
        alert('이름을 입력하세요.');
        membername.focus();
        return false;
    }
    if(email.value == "" || email.value == null){
        alert('이메일을 입력하세요.');
        email.focus();
        return false;
    }
    if(phone.value == "" || phone.value == null){
        alert('핸드폰 번호를 입력하세요.');
        phone.focus();
        return false;
    }
    if(address.value == "" || address.value == null){
        alert('주소를 입력하세요.');
        address.focus();
        return false;
    }
}