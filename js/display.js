window.onload = function() {

    menu.addEventListener('click', function() {
        location.href = "menu.html";
    });

    let data1;
    let data2;

    let param = new URLSearchParams(location.search);
    comm(param).then(function(data) {
        data1 = data;
        let medicine = document.getElementById('medicine');
        let symptom = document.getElementById('symptom');
        let tag = `<table id="medicinetable">
                    <tr>
                    <td colspan="2">${data.picture}</td>
                    </tr>  
                  <tr class="head">
                    <th>약제명</th><td>${data.medname}</td>
                  </tr>

                  <tr>
                    <th>제약회사</th><td>${data.medco}</td>
                  </tr>
                  </table>
                 `;
        let tag2 = `<table id="symptomtable">
                    <tr><th>증상 부위</th><td>${data.signpart}</td></tr>
                    <tr><th>대표 증상</th><td>${data.signfirst}</td></tr>
                    <tr><th>세부 증상</th><td>${data.signsecond}</td></tr>
                    </table>
                    `;
        switch(data.signpart) {
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
            data2 = res;
            let history = document.getElementById('history');
            let tag = `<table id="historytable">
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
            historyInsert(data1, data2);
        })
    });

    function historyInsert(data1, data2) {
        return new Promise(function () {
            let url = 'https://112.133.178.18:10201/medicine/personalHistory';
    
            let data = JSON.stringify({
                membernum: data2.membernum,
                mednum: data1.mednum
            });	
    
            const xhr = new XMLHttpRequest();
            
           xhr.open('POST', url, true);
    
           xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    
           xhr.send(data);
    
           xhr.onload = function () {
               if (xhr.status == 200) {
                   if(xhr.responseText == true) {
                    console.log('history stored');
                   } else {
                    console.log('history store failed');
                   }
                } else {
                    console.log('failed');
                }
            }
        });
    }
}

function info() {
    return new Promise(function (resolve) {
        let url = 'https://112.133.178.18:10201/medicine/member/info';

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
       let url = 'https://112.133.178.18:10201/medicine/med/'+mednum;

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