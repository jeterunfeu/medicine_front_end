window.onload = function() {
    let param = new URLSearchParams(location.search);
    let initButton = document.getElementById('initbutton');
    let writeButton = document.getElementById('write');

    writeButton.addEventListener('click', function() {
        write(param);
    });

    initButton.addEventListener('click', function() {
        init(param);
    });

    menu.addEventListener('click', function() {
        location.href = "menu.html";
    });

    comm(param).then(function (res) {
        let table = document.getElementById('reviewtable');
        let medicineTable = document.getElementById('medicinetable');
        let pagination = document.getElementById('pagination');
        let type = param.get('type');
        let value = param.get('value');
        let medtag = '';
        let tag = '';
        let page = '';
        medtag += `<tr class="head">
        <td colspan="2">약제명 : ${res.data.medname}</td>
    </tr>
    <tr>
    <td colspan="2">${res.data.picture}</td>
    </tr>
    <tr>
        <td colspan="2">제약회사 : ${res.data.medco}</td>
    </tr>
    <tr>
        <td colspan="2">가격 : ${res.data.price}</td>
    </tr>
    <tr>
        <td>복용법 : ${res.data.takemed}</td><td>복용횟수 : ${res.data.medcycle}</td>
    </tr>
    <tr>
        <td colspan="2">성분 : ${res.data.ingredient}</td>
    </tr>
    <tr>
        <td colspan="2">비고 : ${res.data.note}</td>
    </tr>
    `;
    medicineTable.innerHTML = medtag;

        for(let i = 0; i < res.data.list.length; i++) {
            tag += `<tr class="head">
            <td>작성아이디 : ${res.data.list[i].memberid}</td>
        </tr>
        <tr><td>별점 : ${res.data.list[i].evaluate}</td></tr>
        <tr><td>내용</td></tr>
        <tr><td>${res.data.list[i].contents}</td></tr>
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
            let mednum = param.get('mednum');
            let type = param.get('type');
            let value = param.get('value');
            let page = (param.get('page') == null || param.get('page') == '') ? 1 : param.get('page');
    
            if(type == '' || type == null) {
                url = 'https://112.133.178.18:10201/medicine/review?page='+page+'&mednum='+mednum;
            }
            if(type == 'contents') {
                url = 'https://112.133.178.18:10201/medicine/review?page='+page+'&mednum='+mednum+'&contents='+value;
            }
    
            const xhr = new XMLHttpRequest();
        
                xhr.open('GET', url, true);
        
                xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        
                xhr.send();
        
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        let json = JSON.parse(xhr.responseText);
                        if(type != null && (json.data.list == null || json.data.list == '' || json.data.list == '[]')) {
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

function writeconn(param) {
    return new Promise(function (resolve) {
        let num = param.get('mednum');
        let eval = document.getElementById('evaluate').value;
        let con = document.getElementById('contents').innerText;
    
        let url = 'https://112.133.178.18:10201/medicine/review';
    
        let data = JSON.stringify({
            contents : con,
            evaluate : eval,
            mednum : num 
        });	
    
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

function write(param) {
    let num = param.get('mednum');
    writeconn(param).then(function(res) {
        if(res) {
            location.href = "review.html?mednum="+num;
        }
    });
}

function check() {
    let box = document.getElementById('searchText').value;
    if(box == '' || box == null) {
        alert("값을 입력해 주세요");
        return false;
    }
    return true;
}
function init(param) {
    let mednum = param.get('mednum');
    location.href="review.html?mednum" + mednum;
}