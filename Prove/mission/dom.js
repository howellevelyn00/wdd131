let selectElem = document.getElementById('webdevlist');
let logo = document.querySelector('img');

selectElem.addEventListener('change', function(){
    let codeValue = selectElem.value;
    if (codeValue === 'light') {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        logo.setAttribute('src', 'images/logo.jpg');
    } else{
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        logo.setAttribute('src', 'images/dark-logo.jpg');
    }
});