window.onload = function() {
    let param = new URLSearchParams(location.search);

    menu.addEventListener('click', function() {
        location.href = "menu.html";
    });

    comm(param).then(function (res) {
        let table = document.getElementById('historytable');
        let pagination = document.getElementById('pagination');
        let tag = '';
        let page = '';
        console.log(res.data.length);
        for(let i = 0; i < res.data.length; i++) {
            tag += `<tr class="head">
                        <td colspan="2">약제명 : ${res.data[i].medname}</td>
                    </tr>
                    <tr>
                    <td colspan="2">${res.data[i].picture}</td>
                    </tr>
                    <tr>
                        <td colspan="2">제약회사 : ${res.data[i].medco}</td>
                    </tr>
                    <tr>
                        <td colspan="2">가격 : ${res.data[i].price}</td>
                    </tr>
                    <tr>
                        <td colspan="2">성분 : ${res.data[i].ingredient}</td>
                    </tr>
                    <tr>
                        <td colspan="2">비고 : ${res.data[i].note}</td>
                    </tr>
                    <tr>
                    <td colspan="2">제출일자 : ${res.data[i].inputdate}</td>
                    </tr>
                    <tr>
                    <td><a href="display.html?mednum=${res.data[i].mednum}">약품선택</a></td><td>${res.data[i].star} 리뷰보기</td>
                    </tr>
                    `;
        }

        page = `<table><tr><td colspan="2">${res.currentPage}/${res.totalPageCount}</td></tr>
        <tr><td>${res.currentPage == 1 ? 'X' : `<a href='medicine.html?page=${res.currentPage - 1}'><</a>`}
        </td><td>${res.currentPage == res.totalPageCount ? 'X' : `<a href='medicine.html?page=${res.currentPage + 1}'>></a>`}</td></tr>
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
            let page = (param.get('page') == null || param.get('page')) ? 1 : param.get('page');
    
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
                        if(xhr.responseText == null || xhr.responseText == '') {
                            location.href = "null.html";
                        } else {
                            resolve(JSON.parse(xhr.responseText));
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