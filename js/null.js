window.onload = function() {
    let menu = document.getElementById('menu');
    menu.addEventListener('click', function() {
      location.href=history.go(-1);
    });
}