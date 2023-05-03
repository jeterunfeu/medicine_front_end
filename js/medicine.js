window.onload = function() {
    let param = new URLSearchParams(location.search);

    menu.addEventListener('click', function() {
        location.href = "menu.html";
    });

    comm(param).then(function (res) {
        let table = document.getElementById('medTable');
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
                        <td>복용법 : ${res.data[i].takemed}</td><td>복용횟수 : ${res.data[i].medcycle}</td>
                    </tr>
                    <tr>
                        <td colspan="2">성분 : ${res.data[i].ingredient}</td>
                    </tr>
                    <tr>
                        <td colspan="2">비고 : ${res.data[i].note}</td>
                    </tr>
                    <tr>
                    <td><a href="display.html?mednum=${res.data[i].mednum}">약품선택</a></td><td>${res.data[i].star} 리뷰보기</td>
                    </tr>
                    `;
        }

        page = `<table><tr><td colspan="2">${res.currentPage}/${res.totalPageCount}</td></tr>
        <tr><td>${res.currentPage <= 1 ? 'X' : `<a href='history.html?page=${res.currentPage - 1}${(type != null || type != "") ? '&type='+type+'&value='+value : ''}'><</a>`}
        </td><td>${res.currentPage >= res.totalPageCount ? 'X' : `<a href='history.html?page=${res.currentPage + 1}${(type != null || type != "") ? '&type='+type+'&value='+value : ''}'>></a>`}</td></tr>
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
            let part = param.get('signpart');
            let firstsign = param.get('signfirst');
            let secondsign = param.get('signsecond');
            let signnum = param.get('signnum');
            let page = (param.get('page') == null || param.get('page') == '') ? 1 : param.get('page');
    
            console.log(part);
            if(type == '' || type == null) {
                url = 'https://112.133.178.18:10201/medicine/med/condition?page='+page;
            }
            if(type == 'medname') {
                url = 'https://112.133.178.18:10201/medicine/med/condition?page='+page+'&medname='+value;
            }
            if(type == 'medco') {
                url = 'https://112.133.178.18:10201/medicine/med/condition?page='+page+'&medco='+value;
            }
            if(type == 'takemed') {
                url = 'https://112.133.178.18:10201/medicine/med/condition?page='+page+'&takemed='+value;
            }
            if(type == 'medcycle') {
                url = 'https://112.133.178.18:10201/medicine/med/condition?page='+page+'&medcycle='+value;
            }
            if(type == 'ingredient') {
                url = 'https://112.133.178.18:10201/medicine/med/condition?page='+page+'&ingredient='+value;
            }
            if(part != '' && part != null) {
                url = 'https://112.133.178.18:10201/medicine/med/symptom?page='+page+'&signpart='+part+'&signfirst='+firstsign+'&signsecond='+secondsign;
            }
            if(signnum != '' && signnum != null) {
                url = 'https://112.133.178.18:10201/medicine/med/symptom?page='+page+'&signnum='+signnum;
            }
    
            const xhr = new XMLHttpRequest();
        
                xhr.open('GET', url, true);
        
                xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        
                xhr.send();
        
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        let json = JSON.parse(xhr.responseText);
                        if(json.data == null || json.data == '' || json.data == '[]') {
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
    location.href="medicine.html";
}