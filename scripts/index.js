require(['jquery', 'slider']);
(function () {
    var init = function () {
        const menuIcon = document.querySelector('.menu-icon');
        const menuSlider = document.querySelector('.slide-menu');
        const linksToAnchors = document.querySelectorAll('a[href^="#"]');

        openMenu = () => {
            menuSlider.classList.toggle('open');
            console.log(menuSlider.classList.toggle('open'));
        }

        initMap = () => {
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

        anchorLinkHandling = (e) => {
            e.preventDefault();
            const element = e.target;
            const targetID = element.getAttribute('href');
            const targetAnchor = document.querySelector(targetID);
            const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
            if (!targetAnchor) return;
            const originalTop = distanceToTop(targetAnchor);

            window.scrollBy({
                top: originalTop,
                left: 0,
                behavior: 'smooth'
            });

            checkIfAnchorMoved = setInterval(() => {
                const bottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
                const checkDistanceToTarget = distanceToTop(targetAnchor) === 0 || bottom;
                if (checkDistanceToTarget) {
                    targetAnchor.tabIndex = '-1';
                    targetAnchor.focus();
                    window.history.pushState('', '', targetID);
                    clearInterval(checkIfAnchorMoved);
                }
            }, 100);
        }

        listenForAnchorClick = () => {
            if(!(window.navigator.userAgent.indexOf("Edge") > -1)) {
                linksToAnchors.forEach(el => (el.onclick = anchorLinkHandling));
            }
        }

        listenForMenuIconClick = () => {
            menuIcon.addEventListener('click', openMenu);
        }

        initiate = () => {
            initMap();
            listenForMenuIconClick();
            listenForAnchorClick();
        }
        
        var initArray = {
            initiate: initiate,
            initMap: initMap,
            listenForMenuIconClick: listenForMenuIconClick
        };

        return initArray;
    }();

    init.initiate();
}());