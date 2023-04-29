window.onload = function() {
    let menu = document.getElementById('menu');
    let param = new URLSearchParams(location.search).get('part');
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
        let word = (param != null || param != '') ? param : null;
        return new Promise(function (resolve) {
        let url = 'https://192.168.0.6:10201/medicine/showsign/group?part='+word;
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