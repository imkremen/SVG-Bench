"use strict";

document.addEventListener("DOMContentLoaded", function (event) {
    const mountPoint = document.getElementById("mount");
    const symbolsList = [...document.getElementById("svg-sprite").querySelectorAll("symbol")].map((el) => el.id);
    
    // const iconsFragment = symbolsList.reduce(
    //   (fragment, name) => {
    //     fragment.appendChild(_createIcon(name));
    //     return fragment;
    //   },
    //   document.createDocumentFragment()
    // );

    // const iconsArr = symbolsList.reduce(
    //     (arr, name, i, list) => {
    //     arr[i] = _createIcon(list[i]);
    //       return arr;
    //     },
    //     []
    //   );

    // const iconsArr =[...iconsFragment.querySelectorAll("svg")]; 

    const iconsAmountElem = document.getElementById("iconsAmount");
    iconsAmountElem.min = 0;
    iconsAmountElem.max = symbolsList.length;
    iconsAmountElem.value = symbolsList.length;

    const ciclesAmountElem = document.getElementById("ciclesAmount");
    ciclesAmountElem.min = 0;

    const startElem = document.getElementById("start");
    const pauseElem = document.getElementById("pause");
    const resetElem = document.getElementById("reset");

    var symbolsBench = new SymbolsBench(mountPoint, symbolsList);

    iconsAmountElem.onchange = () => {
        if (iconsAmountElem.value < 1) {
            iconsAmountElem.value = 1;
        }
        if ( iconsAmountElem.value > symbolsList.length ) {
            iconsAmountElem.value = symbolsList.length;
        }
        symbolsBench.icons = iconsAmountElem.value;
    }
    ciclesAmountElem.onchange = () => {
        if ( ciclesAmountElem.value < 0 ) {
            ciclesAmountElem.value = 0;
        }
        if ( ciclesAmountElem.value < 1 ) {
            symbolsBench.cicles = Infinity;
        }
        else symbolsBench.cicles = ciclesAmountElem.value;
    }

    startElem.onclick = () => symbolsBench.run();
    pauseElem.onclick = () => symbolsBench.pause();
    resetElem.onclick = () => symbolsBench.reset();


    function SymbolsBench (mountPoint, namesList) {
        const self = this;
        let iconIndex = 0;
        let cicleIndex = 1;
        let globalID;
        let startTime;

        this.cicles = 1;
        this.icons = namesList.length;

        this.run = function() {
            startTime = performance.now();
            globalID = requestAnimationFrame(_bench);
        };
        this.pause = function() {
            cancelAnimationFrame(globalID);
        };
        this.reset = function() {
            iconIndex = 0;
            cicleIndex = 1;
            cancelAnimationFrame(globalID);
            mountPoint.innerHTML = "";
        };

        var tempSVG = document.createElement("div");
        tempSVG.insertAdjacentHTML("beforeend","<svg class='svg-icon'><use xlink:href=''></use></svg>");
        let iconProto = tempSVG.firstChild;
        
        function _bench() {
            console.log(performance.now() - startTime);
            if (iconIndex < self.icons) {
                const iconElem = iconProto.cloneNode(true);
                iconElem.firstElementChild.setAttribute("xlink:href", "#" + namesList[iconIndex]);
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