function Svg() {

    const xmlns = "http://www.w3.org/2000/svg";

    function getSvg(content){
        const svg = document.createElementNS(xmlns, "svg");
        content.classList.forEach(clas=> svg.classList.add(clas));
        svg.setAttributeNS(null, "viewBox", content.viewBox);
        return svg;
    }
    
    function createSVGArrow(classList, viewBox) {
        const arrowContent = {lines: [{classList: ["arrow-line"], x1: 0, y1: 0, x2: 10, y2: 10},
                                      {classList: ["arrow-line"], x1: 0, y1: 20, x2: 10, y2: 9}]
        };
        const svg = getSvg({classList, viewBox});
        arrowContent.lines.forEach(l=>{
            let line = document.createElementNS(xmlns, "line");
            for(let key in l){
                if(key == "classList"){
                    l[key].forEach(clas=> line[key].add(clas));
                }
                else {
                    line.setAttributeNS(null, key, l[key]);
                }
            }
            svg.appendChild(line);
        });
        return svg;
    }

    function createSVGPlus(classList, viewBox) {
        const plusContent = {rects: [{classList: ["plus"], x: 17.5, y: 5, rx: 3, ry: 3, width: 5, height: 30},
                                    {classList: ["plus"], x: 5, y: 17.5, rx: 3, ry: 3, width: 30, height: 5}]
       };
        const svg = getSvg({classList, viewBox});
        plusContent.rects.forEach(r=> {
            let rect = document.createElementNS(xmlns, "rect");
            for(let key in r){
                if(key == "classList"){
                    r[key].forEach(clas=> rect[key].add(clas));
                }
                else {
                    rect.setAttributeNS(null, key, r[key]);
                }
            }
            svg.appendChild(rect);
        });
        return svg;
    }

    return {createSVGArrow, createSVGPlus};
}

const svg = Svg();

export {svg};