window.onload = function() {
    let menu = document.getElementById('menu');
    menu.addEventListener('click', function() {
      history.go(-1);
    });
}
function goMain(){
  location.href="menu.html";
}