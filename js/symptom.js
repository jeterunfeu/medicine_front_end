window.onload = function() {
    let menu = document.getElementById('menu');
    let param = new URLSearchParams(location.search);
    let part = (param.get('part') != null || param.get('part') != '') ? param.get('part') : null;
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
        let tag = '';
        for(let i = 0; i < res.length; i++) {
            tag += `<tr>
            <td class="head">부위 : ${res[i].signpart}</td>
            </tr>
            <tr>
            <td>증상 : ${res[i].signfirst}</td>
            </tr>
            <tr>
            <td>세부 증상 : <a href='medicine.html?signpart=${res[i].signpart}&signfirst=${res[i].signfirst}&signsecond=${res[i].signsecond}'>
            ${res[i].signsecond}</a></td></tr>`;
        }
        table.innerHTML = tag;
    });

    function comm(param) {
        let type = (param.get('type') != null || param.get('type') != '') ? param.get('type') : null;
        let value = (param.get('value') != null || param.get('value') != '') ? param.get('value') : null;
        let url = '';

        return new Promise(function (resolve) {
        if(part != null) {
            if(type == '' || type == null) {
                url = 'https://112.133.178.18:10201/medicine/showsign/group?signpart='+part;
            } else if(type == 'signfirst') {
                url = 'https://112.133.178.18:10201/medicine/showsign/group?signpart='+part+'&signfirst='+value;
            } else if(type == 'signsecond') {
                url = 'https://112.133.178.18:10201/medicine/showsign/group?signpart='+part+'&signsecond='+value;
            }
        } else {
            if(type == '' || type == null) {
                url = 'https://112.133.178.18:10201/medicine/showsign/group';
            } else if(type == 'signfirst') {
                url = 'https://112.133.178.18:10201/medicine/showsign/group?signfirst='+value;
            } else if(type == 'signsecond') {
                url = 'https://112.133.178.18:10201/medicine/showsign/group?signsecond='+value;
            } else if(type == 'signpart') {
                url = 'https://112.133.178.18:10201/medicine/showsign/group?signpart='+value;
            }
        }
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');

        xhr.send();

        xhr.onload = function () {
            if (xhr.status == 200) {
                if(xhr.responseText == null || xhr.responseText == '[]') {
                    location.href = "prepare.html"
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
    let param = new URLSearchParams(location.search);
    let part = (param.get('part') != null || param.get('part') != '') ? param.get('part') : null;
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