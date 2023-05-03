window.onload = function() {
    let menu = document.getElementById('menu');
    let param = new URLSearchParams(location.search);
    let part = (param.get('part') != null && param.get('part') != '') ? param.get('part') : null;
    let option = document.getElementById('part');

    if(part != null) {
        option.setAttribute('style', 'display:none');
    } else {
        option.setAttribute('style', 'display:block');
    }

    menu.addEventListener('click', function() {
        location.href = "menu.html";
    });

    comm(param).then(function(res) {
        let table = document.getElementById('sympthom');
        let pagination = document.getElementById('pagination');

        let tag = '';
        let page = '';

        for(let i = 0; i < res.data.length; i++) {
            tag += `<tr>
            <td class="head">부위 : ${res.data[i].signpart}</td>
            </tr>
            <tr>
            <td>증상 : ${res.data[i].signfirst}</td>
            </tr>
            <tr>
            <td>세부 증상 : <a href='medicine.html?signpart=${res.data[i].signpart}&signfirst=${res.data[i].signfirst}&signsecond=${res.data[i].signsecond}'>
            ${res.data[i].signsecond}</a></td></tr>`;
        }
        page = `<table><tr><td colspan="2">${res.currentPage}/${res.totalPageCount}</td></tr>
        <tr><td>${res.currentPage <= 1 ? 'X' : `<a href='history.html?page=${res.currentPage - 1}${(type != null && type != "") ? '&type='+type+'&value='+value : ''}'><</a>`}
        </td><td>${res.currentPage >= res.totalPageCount ? 'X' : `<a href='history.html?page=${res.currentPage + 1}${(type != null && type != "") ? '&type='+type+'&value='+value : ''}'>></a>`}</td></tr>
        </table>`

        table.innerHTML = tag;
        pagination.innerHTML = page;

    });

    function comm(param) {
        let type = (param.get('type') != null && param.get('type') != '') ? param.get('type') : null;
        let value = (param.get('value') != null && param.get('value') != '') ? param.get('value') : null;
        let page = (param.get('page') == null || param.get('page') == '') ? 1 : param.get('page');

        let url = '';

        return new Promise(function (resolve) {
        if(part != null) {
            if(type == '' || type == null) {
                url = 'https://112.133.178.18:10201/medicine/showsign/group?page='+page+'&signpart='+part;
            } else if(type == 'signfirst') {
                url = 'https://112.133.178.18:10201/medicine/showsign/group?page='+page+'&signpart='+part+'&signfirst='+value;
            } else if(type == 'signsecond') {
                url = 'https://112.133.178.18:10201/medicine/showsign/group?page='+page+'&signpart='+part+'&signsecond='+value;
            }
        } else {
            if(type == '' || type == null) {
                url = 'https://112.133.178.18:10201/medicine/showsign/group?page='+page;
            } else if(type == 'signfirst') {
                url = 'https://112.133.178.18:10201/medicine/showsign/group?page='+page+'&signfirst='+value;
            } else if(type == 'signsecond') {
                url = 'https://112.133.178.18:10201/medicine/showsign/group?page='+page+'&signsecond='+value;
            } else if(type == 'signpart') {
                url = 'https://112.133.178.18:10201/medicine/showsign/group?page='+page+'&signpart='+value;
            }
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
    let param = new URLSearchParams(location.search);
    let part = (param.get('part') != null && param.get('part') != '') ? param.get('part') : null;
    let type = document.getElementById('searchType').value;
    let box = document.getElementById('searchText').value;
    if(box == '' || box == null) {
        alert("값을 입력해 주세요");
        return;
    }
    if(part == '' || part == null) {
        location.href="symptom.html?type="+type+"&value="+box;

    } else {
        location.href="symptom.html?part="+part+"&type="+type+"&value="+box;
    }

}

function init() {
    location.href="symptom.html";
}