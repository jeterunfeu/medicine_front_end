window.onload = function() {
    let param = new URLSearchParams(location.search);
    let initButton = document.getElementById('initbutton');
    let writeButton = document.getElementById('write');

    writeButton.addEventListener('click', function() {
        let num = param.get('mednum');
        write(num);
    });

    initButton.addEventListener('click', function() {
        init(param);
    });

    menu.addEventListener('click', function() {
        history.go(-1);
    });

    getSeq().then(function(id){
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
        <td colspan="2">별점 : ${res.data.star}</td>
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
            <tr><td><div class="display">${id == res.data.list[i].memberid ? `<input type="button" value="수정" onclick="edit()">` : ''}</div>
            ${id == res.data.list[i].memberid ? `<input type="button" value="삭제" onclick="remove('${res.data.list[i].reviewnum}', '${res.data.list[i].mednum}')">` : ''}</td></tr>
            <tr><td><div class="display">별점 : ${res.data.list[i].evaluate}</div>
            <div class="edit">
            <select name="evaluate" id="evaluate2" style="display:none;">
            <option value="1" ${res.data.list[i].evaluate == '1' ? 'selected' : ''}>1</option>
            <option value="2" ${res.data.list[i].evaluate == '2' ? 'selected' : ''}>2</option>
            <option value="3" ${res.data.list[i].evaluate == '3' ? 'selected' : ''}>3</option>
            <option value="4" ${res.data.list[i].evaluate == '4' ? 'selected' : ''}>4</option>
            <option value="5" ${res.data.list[i].evaluate == '5' ? 'selected' : ''}>5</option>
            </select>
            </div>
            </td></tr>
            <tr><td>내용</td></tr>
            <tr><td><div class="display">${res.data.list[i].contents}</div>
            <div class="edit"><textarea name="contents" id="contents2" style="display:none;">${res.data.list[i].contents}</textarea></div>
            </td></tr>
            <tr class="edit">
            <td colspan="2">
                <input type="button" value="수정 실행" onclick="execute('${res.data.list[i].reviewnum}', '${res.data.list[i].mednum}')">
                <input type="button" value="취소" onclick="cancel()">
            </td>
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
    });

    function getSeq() {
        return new Promise(function (resolve) {
            let url = 'https://112.133.178.18:10201/medicine/member/info/seq';

            const xhr = new XMLHttpRequest();
        
                xhr.open('GET', url, true);
        
                xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        
                xhr.send();
        
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        if(xhr.responseText != null && xhr.responseText != '') {
                            resolve(xhr.responseText);
                        }
                    } else {
                        console.log('failed')
                    }
                }
        })
    }

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

function execute(seq, num) {
    writeconn(seq, num, false).then(function(res) {
        if(res) {
            location.href = "review.html?mednum="+num;
        }
    });
}

function edit() {
    let display = document.getElementsByClassName('display');
    let edit = document.getElementsByClassName('edit');
    for(let i = 0; i < display.length; i++) {
        display[i].style.display = 'none';
    }
    for(let j = 0; j < edit.length; j++) {
        edit[i].style.display = 'block';
    }
}

function cancel() {
    let display = document.getElementsByClassName('display');
    let edit = document.getElementsByClassName('edit');
    for(let i = 0; i < display.length; i++) {
        display[i].style.display = 'block';
    }
    for(let j = 0; j < edit.length; j++) {
        edit[i].style.display = 'none';
    }
}

function writeconn(seq, num, flag) {
    return new Promise(function (resolve) {
        // let num = param.get('mednum');
        let eval = document.getElementById('evaluate').value;
        let con = document.getElementById('contents').value;
        let eval2 = document.getElementById('evaluate2').value;
        let con2 = document.getElementById('contents2').value;
    
        let url = '';
        let data = '';


        const xhr = new XMLHttpRequest();
    
        if(flag) {
            url = 'https://112.133.178.18:10201/medicine/review';
            data = JSON.stringify({
                contents : con,
                evaluate : eval,
                mednum : num 
            });	

            xhr.open('POST', url, true);
        } else {
            url = 'https://112.133.178.18:10201/medicine/review/'+seq;
            data = JSON.stringify({
                contents : con2,
                evaluate : eval2,
                mednum : num 
            });	

            xhr.open('PUT', url, true);
        }

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

function write(num) {
    // let num = param.get('mednum');
    writeconn(null, num, true).then(function(res) {
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

function excute(seq, num) {
    modifyComm(seq).then(function (res) {
        if(res) {
            location.href="review.html?mednum="+num;
        }
    });
}

function remove(seq, num) {
    deleteComm(seq).then(function (res) {
        if(res) {
            location.href="review.html?mednum="+num;
        }
    });
}

function deleteComm(seq) {
    return new Promise(function (resolve) {
        let url = 'https://112.133.178.18:10201/medicine/review/'+seq;

        const xhr = new XMLHttpRequest();
    
            xhr.open('DELETE', url, true);
    
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
                    alert('실패');
                    console.log('failed')
                }
            }
    })
}