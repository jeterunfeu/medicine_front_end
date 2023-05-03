window.onload = function() {
    let param = new URLSearchParams(location.search);
    comm(param).then(function(res) {
        let medicine = document.getElementById('medicine');
        let symptom = document.getElementById('symptom');
        let tag = `<table>
                    <tr class="head">
                    <td colspan="2">약제명 : ${res.medname}</td>
                  </tr>
                  <tr>
                    <td colspan="2">${res.picture}</td>
                  </tr>
                  <tr>
                    <td colspan="2">제약회사 : ${res.medco}</td>
                  </tr>
                  </table>
                 `;
        let tag2 = `<table>
                    <tr><td>증상 부위</td><td>${res.signpart}</td></tr>
                    <tr><td>증상</td><td>${res.signfirst}</td></tr>
                    <tr><td>세부증상</td><td>${res.signsecond}</td></tr>
                    </table>
                    `;
        switch(res.signpart) {
            case '머리':
                document.getElementById('head').setAttribute('src', './asset/image/head_red.png');
                break;
            case '상체':
                document.getElementById('head').setAttribute('src', './asset/image/arm_red.png');
                break;    
            case '복부':
                document.getElementById('head').setAttribute('src', './asset/image/stomach_red.png');
                break;
            case '하체':
                document.getElementById('head').setAttribute('src', './asset/image/leg_red.png');
                break;   
        }                 
        medicine.innerHTML = tag;
        symptom.innerHTML = tag2;
             /*<tr>
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
               </tr>*/
        info().then(function(res) {
            let history = document.getElementById('history');
            let tag = `<table>
                                <tr>
                                <th>기존병력</th>
                                <td>${res.history != null ? res.history : '없음'}</td>
                                </tr>
                                <tr>
                                <th>복용중인약</th>
                                <td>${res.medicine != null ? res.medicine : '없음'}</td>
                                </tr>
                                <tr>
                                <th>알레르기</th>
                                <td>${res.allergy != null ? res.allergy : '없음'}</td>
                                </tr>
                        </table>`;
            history.innerHTML = tag;
        })
    });
}

function info() {
    return new Promise(function (resolve) {
        let url = 'https://localhost:10201/medicine/member/info';

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
function comm(param) {
    let mednum = (param.get('mednum') == '' || param.get('mednum') == null) ? null : param.get('mednum');

    return new Promise(function (resolve) {
       let url = 'https://localhost:10201/medicine/med/'+mednum;

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
    })
}