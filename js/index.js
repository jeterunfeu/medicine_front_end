
// let url = "http://localhost:10201/medicine/member/login";

// laoding 
$(window).load(function(){
    $('.loading_container').delay(2000).fadeOut();
})

// function login() {
//     return new Promise(function (resolve) {
//         let id = document.getElementById('id').value;
//         let pw = document.getElementById('pw').value;

//             let final_url = url + '?memberid=' + id + '&memberpw=' + pw;
//             const xhr = new XMLHttpRequest();
//             xhr.open('GET', url, true);

//             xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');

//             xhr.send();

//             xhr.onload = function () {
//                 if (xhr.status == 200) {
//                     console.log('login success');
//                     location.href="list.html"
//                 } else {
//                     console.log('login failed')
//                 }
//             }
//         });
//     }
