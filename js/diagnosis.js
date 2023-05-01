window.onload = function() {
    let param = new URLSearchParams(location.search).get('seq');
    console.log(param);

    let menu = document.getElementById('menu');
    menu.addEventListener('click', function() {
      location.href="menu.html";
    });

    comm(param).then(function (res){
        let question = document.getElementById('question');
        let right = document.getElementById('right');
        let wrong = document.getElementById('wrong');
        question.innerText = res.question;
        if(res.signnum == 0) {
            right.addEventListener('click', function() {
                location.href = "diagnosis.html?seq="+res.truenum;
            });
            wrong.addEventListener('click', function() {
                location.href = "diagnosis.html?seq="+res.falsenum;
            });
        } else {
            location.href = "medicine.html?signnum="+res.signnum;
        }

    });

    function comm(param) {
        let word = (param == null)  ? 1 : param;
        return new Promise(function (resolve) {
            let url = 'https://112.133.178.18:10201/medicine/survey/'+word;
            const xhr = new XMLHttpRequest();
    
            xhr.open('GET', url, true);
    
            xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    
            xhr.send();
    
            xhr.onload = function () {
                if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                } else {
                    console.log('failed')
                }
            }
        });
    }
}