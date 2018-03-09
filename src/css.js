"use strict";

document.addEventListener("DOMContentLoaded", function (event) {

    fetch('dist/assets/css/svg/sprite.css-e883bad2.svg').then(response => response.text())
    .then(svg => {
        var div = document.createElement('div');
        div.innerHTML = svg.trim();
        return div.firstChild;
    }).then(sprite => {
        const symbolsList = [...sprite.querySelectorAll("svg")].map((el) => el.id);
        const mountPoint = document.getElementById("mount");

        const iconsAmountElem = document.getElementById("iconsAmount");
        iconsAmountElem.min = 0;
        iconsAmountElem.max = symbolsList.length;
        iconsAmountElem.value = symbolsList.length;
    
        const ciclesAmountElem = document.getElementById("ciclesAmount");
        ciclesAmountElem.min = 0;
    
        const startElem = document.getElementById("start");
        const pauseElem = document.getElementById("pause");
        const resetElem = document.getElementById("reset");
    
        var cssBench = new CssBench(mountPoint, symbolsList);
    
        iconsAmountElem.onchange = () => {
            if (iconsAmountElem.value < 1) {
                iconsAmountElem.value = 1;
            }
            if (iconsAmountElem.value > symbolsList.length) {
                iconsAmountElem.value = symbolsList.length;
            }
            cssBench.icons = iconsAmountElem.value;
        }
        ciclesAmountElem.onchange = () => {
            if (ciclesAmountElem.value < 0) {
                ciclesAmountElem.value = 0;
            }
            if (ciclesAmountElem.value < 1) {
                cssBench.cicles = Infinity;
            }
            else cssBench.cicles = ciclesAmountElem.value;
        }
    
        startElem.onclick = () => cssBench.run();
        pauseElem.onclick = () => cssBench.pause();
        resetElem.onclick = () => cssBench.reset();
    });

    function CssBench(mountPoint, namesList) {
        const self = this;
        let iconIndex = 0;
        let cicleIndex = 1;
        let globalID;
        let startTime;

        this.cicles = 1;
        this.icons = namesList.length;

        this.run = function () {
            startTime = performance.now();
            globalID = requestAnimationFrame(_bench);
        };
        this.pause = function () {
            cancelAnimationFrame(globalID);
        };
        this.reset = function () {
            iconIndex = 0;
            cicleIndex = 1;
            cancelAnimationFrame(globalID);
            mountPoint.innerHTML = "";
        };

        const iconProto = document.createElement("i");
        iconProto.className = "svg-icon-wrap";
        const inner = document.createElement("i");
        iconProto.appendChild(inner);

        function _bench(timestamp) {
            let progress = timestamp - startTime;
            console.log(progress)
            if (iconIndex < self.icons) {
                const iconElem = iconProto.cloneNode(true);
                iconElem.firstElementChild.setAttribute("class", "svg-icon icon-"+namesList[iconIndex]);
                mountPoint.appendChild(iconElem);
                iconIndex++;
                startTime = performance.now();
                globalID = window.requestAnimationFrame(_bench);
            }
            else if (cicleIndex < self.cicles) {
                cicleIndex++;
                iconIndex = 0;
                mountPoint.innerHTML = "";
                globalID = window.requestAnimationFrame(_bench);
            }
        }
    }
})