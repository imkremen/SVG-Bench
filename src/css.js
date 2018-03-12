"use strict";

document.addEventListener("DOMContentLoaded", function (event) {

    var ajax = new XMLHttpRequest();
    ajax.open("GET", "dist/assets/css/svg/sprite.css-e883bad2.svg", true);
    ajax.send();
    ajax.onload = function (e) {
        var div = document.createElement("div");
        div.innerHTML = ajax.responseText;
        let sprite = div.firstChild;
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
    }

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

        function _bench() {
            console.log(performance.now() - startTime);
            if (iconIndex < self.icons) {
                const iconElem = iconProto.cloneNode(true);
                iconElem.setAttribute("class", "svg-icon icon-"+namesList[iconIndex]);
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