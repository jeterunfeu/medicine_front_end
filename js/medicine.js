window.onload = function() {
    let param = new URLSearchParams(location.search);

    menu.addEventListener('click', function() {
        location.href = "menu.html";
    });



    comm(param).then(function (res) {
        let table = document.getElementById('medTable');
        let tag = '';
        console.log(res.length);
        for(let i = 0; i < res.length; i++) {
            tag += `<tr class="head">
                        <td colspan="2">약제명 : ${res[i].medname}</td>
                    </tr>
                    <tr>
                        <td colspan="2">제약회사 : ${res[i].medco}</td>
                    </tr>
                    <tr>
                        <td colspan="2">가격 : ${res[i].price}</td>
                    </tr>
                    <tr>
                        <td>복용법 : ${res[i].takemed}</td><td>복용횟수 : ${res[i].medcycle}</td>
                    </tr>
                    <tr>
                        <td colspan="2">성분 : ${res[i].ingredient}</td>
                    </tr>
                    <tr>
                        <td colspan="2">비고 : ${res[i].note}</td>
                    </tr>
                    `;
        }
        table.innerHTML = tag;
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
    
            console.log(part);
            if(type == '' || type == null) {
                url = 'https://112.133.178.18:10201/medicine/med';
            }
            if(type == 'medname') {
                url = 'https://112.133.178.18:10201/medicine/med/condition?medname='+value;
            }
            if(type == 'medco') {
                url = 'https://112.133.178.18:10201/medicine/med/condition?medco='+value;
            }
            if(type == 'takemed') {
                url = 'https://112.133.178.18:10201/medicine/med/condition?takemed='+value;
            }
            if(type == 'medcycle') {
                url = 'https://112.133.178.18:10201/medicine/med/condition?medcycle='+value;
            }
            if(type == 'ingredient') {
                url = 'https://112.133.178.18:10201/medicine/med/condition?ingredient='+value;
            }
            if(part != '' && part != null) {
                url = 'https://112.133.178.18:10201/medicine/med/symptom?signpart='+part+'&signfirst='+firstsign+'&signsecond='+secondsign;
            }
            if(signnum != '' && signnum != null) {
                url = 'https://112.133.178.18:10201/medicine/med/symptom?signnum='+signnum;
            }
    
            const xhr = new XMLHttpRequest();
        
                xhr.open('GET', url, true);
        
                xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        
                xhr.send();
        
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        if(xhr.responseText == null || xhr.responseText == '[]') {
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