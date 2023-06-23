const navbarPlaceholder = document.querySelector('.c-nav');
const xhr = new XMLHttpRequest();
xhr.open('GET', 'base.html', true);

xhr.onload = function() {
    if (xhr.status === 200) {
        navbarPlaceholder.innerHTML = xhr.responseText;
    }
};
xhr.send();