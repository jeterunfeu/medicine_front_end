window.onload = function() {
    let param = new URLSearchParams(location.search);

    menu.addEventListener('click', function() {
        location.href = "menu.html";
    });

    comm(param).then(function (res) {
        let table = document.getElementById('historytable');
        let pagination = document.getElementById('pagination');
        let type = param.get('type');
        let value = param.get('value');
        let tag = '';
        let page = '';
        for(let i = 0; i < res.data.length; i++) {
            tag += `<tr class="head">
                        <td colspan="2">약제명 : ${res.data[i].medname}</td>
                    </tr>
                    <tr>
                    <td colspan="2"><img src='./asset/image/${res.data[i].picture}' width="50" height="50"></td>
                    </tr>
                    <tr>
                        <td colspan="2">제약회사 : ${res.data[i].medco}</td>
                    </tr>
                    <tr>
                        <td colspan="2">증상부위 : ${res.data[i].signpart}</td>
                    </tr>
                    <tr>
                        <td colspan="2">주요증상 : ${res.data[i].signfirst}</td>
                    </tr>
                    <tr>
                        <td colspan="2">세부증상 : ${res.data[i].signsecond}</td>
                    </tr>
                    <tr>
                    <td colspan="2">제출일자 : ${res.data[i].inputdate}</td>
                    </tr>
                    <tr>
                    <td><a href="display.html?mednum=${res.data[i].mednum}">약품선택</a></td>
                    <td>${res.data[i].star} <a href="review.html?mednum=${res.data[i].mednum}">리뷰보기</a></td>
                    </tr>
                    `;
        }

        page = `<table><tr><td colspan="2">${res.currentPage}/${res.totalPageCount}</td></tr>
        <tr><td>${res.currentPage <= 1 ? 'X' : `<a href='history.html?page=${res.currentPage - 1}${(type != null && type != "") ? '&type='+type+'&value='+value : ''}'><</a>`}
        </td><td>${res.currentPage >= res.totalPageCount ? 'X' : `<a href='history.html?page=${res.currentPage + 1}${(type != null && type != "") ? '&type='+type+'&value='+value : ''}'>></a>`}</td></tr>
        </table>`
        table.innerHTML = tag;
        pagination.innerHTML = page;
    });

    function comm(param) {
        return new Promise(function (resolve) {
            let url = '';
            // let medname = param.get('medname');
            // let medco = param.get('medco');
            // let takemed = param.get('takemed');
            // let medcycle = param.get('medcycle');
            // let ingredient = param.get('ingredient');
            let type = param.get('type');
            let value = param.get('value');
            let page = (param.get('page') == null || param.get('page') == '') ? 1 : param.get('page');
    
            if(type == '' || type == null) {
                url = 'https://112.133.178.18:10201/medicine/personalHistory?page='+page;
            }
            if(type == 'medname') {
                url = 'https://112.133.178.18:10201/medicine/personalHistory?page='+page+'&medname='+value;
            }
            if(type == 'medco') {
                url = 'https://112.133.178.18:10201/medicine/personalHistory?page='+page+'&medco='+value;
            }
            if(type == 'signpart') {
                url = 'https://112.133.178.18:10201/medicine/personalHistory?page='+page+'&signpart='+value;
            }
            if(type == 'signfirst') {
                url = 'https://112.133.178.18:10201/medicine/personalHistory?page='+page+'&signfirst='+value;
            }
            if(type == 'signsecond') {
                url = 'https://112.133.178.18:10201/medicine/personalHistory?page='+page+'&signsecond='+value;
            }
    
            const xhr = new XMLHttpRequest();
        
                xhr.open('GET', url, true);
        
                xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        
                xhr.send();
        
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        let json = JSON.parse(xhr.responseText);
                        if(type != null && (json.data == null || json.data == '' || json.data == '[]')) {
                            location.href = "null.html";
                        } else {
                            resolve(json);
                        }
                    } else {
                        console.log('failed')
                    }
                }
        });
    }
}

function check() {
    let box = document.getElementById('searchText').value;
    if(box == '' || box == null) {
        alert("값을 입력해 주세요");
        return false;
    }
    return true;
}

function init() {
    location.href="history.html";
}
function goMain(){
    location.href="menu.html";
}