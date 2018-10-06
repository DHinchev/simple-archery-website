require(['jquery', 'slider']);
(function () {
    var init = function () {
        const menuIcon = document.querySelector('.menu-icon');
        const menuSlider = document.querySelector('.slide-menu');

        function slideMenu() {
            menuSlider.classList.toggle('open');
        }

        menuIcon.addEventListener('click', slideMenu);

        function initMap() {
            var shootingRange = {
                lat: 42.704731,
                lng: 23.360065
            };
            var map = new google.maps.Map(
                document.querySelector('.location-container'), {
                    zoom: 14,
                    center: shootingRange
                });
            var marker = new google.maps.Marker({
                position: shootingRange,
                map: map
            });
        }

        const anchorLinkHandler = (e) => {
            const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
            e.preventDefault();
            const element = e.target;
            const targetID = element.getAttribute('href');
            const targetAnchor = document.querySelector(targetID);
            if (!targetAnchor) return;
            const originalTop = distanceToTop(targetAnchor);

            window.scrollBy({
                top: originalTop,
                left: 0,
                behavior: 'smooth'
            });

            const checkIfDone = setInterval(() => {
                const bottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
                if (distanceToTop(targetAnchor) === 0 || bottom) {
                    targetAnchor.tabIndex = '-1';
                    targetAnchor.focus();
                    window.history.pushState('', '', targetID);
                    clearInterval(checkIfDone);
                }
            }, 100);
        }

        const linksToAnchors = document.querySelectorAll('a[href^="#"]');

        linksToAnchors.forEach(each => (each.onclick = anchorLinkHandler));

        var initArray = {
            initMap: initMap
        }
        return initArray;
    }();

    init.initMap();
}());