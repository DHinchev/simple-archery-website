const menuIcon = document.querySelector('#menu-label');

function addClassFunFive() {
    document.getElementsByClassName('menu-icon')[0].classList.toggle("click-menu-icon");
}

menuIcon.addEventListener('click', addClassFunFive);

function initMap() {
    var shootingRange = {lat: 42.704731, lng: 23.360065};
    var map = new google.maps.Map(
        document.getElementById('location-container'), {zoom: 14, center: shootingRange});
    var marker = new google.maps.Marker({position: shootingRange, map: map});
}