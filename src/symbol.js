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

        const iconProto = document.createElement("i");
        iconProto.className = "svg-icon-wrap";
        const inner = _createIcon("");
        iconProto.appendChild(inner);
        
        function _bench(timestamp) {
            let progress = timestamp - startTime;
            console.log(progress)
            if (iconIndex < self.icons) {
                const iconElem = iconProto.cloneNode(true);
                iconElem.firstElementChild.firstElementChild.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + namesList[iconIndex]);
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


    // function _appendClone(parent, child) {
    //     parent.appendChild(child.cloneNode(true));
    // } 
    
    function _createIcon(name, width = "24", height = "24") {
      const xmlns = "http://www.w3.org/2000/svg";
      const xlink = "http://www.w3.org/1999/xlink";
    //   const pref = "icon-";
  
      let svgElem = document.createElementNS(xmlns, "svg");
    //   svgElem.setAttributeNS (null, "class", pref + name);
    //   svgElem.setAttributeNS (null, "role", "presentation");
    //   svgElem.setAttributeNS (null, "width", width);
    //   svgElem.setAttributeNS (null, "height", height);
      let use = document.createElementNS(xmlns, "use");
      use.setAttributeNS(xlink, "xlink:href", "#" + name);
      svgElem.appendChild(use);
      return svgElem;
    }
  })