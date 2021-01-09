const Dom = ()=> {

    function createH1(id, text){
        const h1 = document.createElement("h1");
        h1.id = id;
        h1.textContent = text;
        return h1;
    }

    function createImg(id, src){
        const img = document.createElement("img");
        img.id = id;
        img.src = src;
        return img;
    }
    
    function createDiv(id) {
        const div = document.createElement("div");
        div.id = id;
        return div;
    }

    function createSpan(classList){
        const span = document.createElement("span");
        classList.forEach(clas=> span.classList.add(clas));
        return span;
    }
    
    function createLabel({id, text}){
        const label = document.createElement("label");
        label.textContent = text;
        label.id = id;
        return label;
    }
    
    function createTextInput({clas, placeHolder}) {
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add(clas);
        input.placeholder = placeHolder;
        return input;
    }
    
    /* 
        === BtnContet Example ===
    
        btnContent = {
            type: "button",
            classList: ["btn"],
            text: "Some Text"
        }
    */
    function createBtn(btnContent){
        const btn = document.createElement("button");
        btnContent.classList.forEach(clas=> btn.classList.add(clas));
        btn.type = btnContent.type;
        btn.textContent = btnContent.text;
        return btn;
    }

    function getSvg(content){
        const xmlns = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(xmlns, "svg");
        content.classList.forEach(clas=> svg.classList.add(clas));
        svg.setAttributeNS(null, "viewBox", content.viewBox);
        return svg;
    }
    /* 
        === svgContent Example ===

        svgContent = {
            classList: ["class"],
            viewBox: "0 0 300 300",
            rects: [{classList: ["class"], x, y, rx, ry, width, height}]
        }
     */
    function createSVGRect(svgContent) {
        const xmlns = "http://www.w3.org/2000/svg";
        const svg = getSvg({classList: svgContent.classList, viewBox: svgContent.viewBox});
        svgContent.rects.forEach(r=> {
            let rect = document.createElementNS(xmlns, "rect");
            for(let key in r){
                if(key == "classList"){
                    r[key].forEach(clas=> rect[key].add(clas));
                }
                else {
                    rect.setAttributeNS(null, key, r[key]);
                }
            }
            appendNode(svg, rect);
        });
        return svg;
    }

    function createSVGLine(svgContent) {
        const xmlns = "http://www.w3.org/2000/svg";
        const svg = getSvg({classList: svgContent.classList, viewBox: svgContent.viewBox});
        svgContent.lines.forEach(l=>{
            let line = document.createElementNS(xmlns, "line");
            for(let key in l){
                if(key == "classList"){
                    l[key].forEach(clas=> line[key].add(clas));
                }
                else {
                    line.setAttributeNS(null, key, l[key]);
                }
            }
            appendNode(svg, line);
        });
        return svg;
    }
    
    function appendNode(parent, ...children){
        children.forEach(child => {
            parent.appendChild(child);
        });
        return parent;
    }
    
    function createForm(labelsContent, inputsContent) {
        const form = document.createElement("form");
        form.classList.add("form-login");
        const labels = [];
        for(let i = 0; i < labelsContent.length; i++){
            let input = createTextInput(inputsContent[i]);
            let label = createLabel(labelsContent[i]);
            appendNode(label, input);
            labels.push(label);
        }
        appendNode(form, ...labels);
        return form;
    }

    function createHeader() {
        const header = document.createElement("header");
        const h1 = createH1("title", "TODO LIST");
        const menu = createDiv("menu");
        const menuBtn = createDiv("menu-btn");
        for(let i = 0; i < 3; i++){
            let span = createSpan(["line"]);
            appendNode(menuBtn, span);
        }
        const home = createDiv("home");
        appendNode(menu, menuBtn, home);
        appendNode(header, menu, h1);
        return header;
    }

    function createNav(id){
        const nav = document.createElement("nav");
        nav.id = id;
        return nav;
    }

    function createMain(){
        const main = document.createElement("main");
        const div = renderContent();
        const nav = renderSideMenu();
        appendNode(main, nav, div);
        return main;
    }

    function renderLoginWindow(){
        const body = document.querySelector("body");
        const imgSrc = "https://www.flaticon.com/svg/static/icons/svg/747/747376.svg";
        const img = createImg("user-img", imgSrc);
        const labelsContent = [{id: "user", text: "Username"}, {id: "password", text: "Password"}];
        const inputsContent = [{clas: "login-input", placeHolder: "Enter Username"},
                               {clas: "login-input", placeHolder: "Enter Password"}];
        const form = createForm(labelsContent, inputsContent);
        const div = createDiv("login");
        const btnsContent = [{classList: ["btn"], type: "button", text: "Singin"}, 
                       {classList: ["btn"], type: "button", text: "Singup"}];
        const buttons = btnsContent.reduce((btns, btnContent)=> {
            btns.push(createBtn(btnContent));
            return btns;
        }, []);
        const demoBtn = createBtn({classList: ["btn", "demo"], type:"button", text: "Demo Account"});
        appendNode(div, ...buttons);
        appendNode(form, div, demoBtn);
        appendNode(body, img, form);
    }

    function renderMainContent(){
        const body = document.querySelector("body");
        const header = createHeader();
        const main = createMain();
        appendNode(body, header, main);
    }

    function renderSideMenu() {
        const plusContent = {classList:["plus-sign", "end"], viewBox: "0 0 40 40",
                             rects: [{classList: ["plus"], x: 17.5, y: 5, rx: 3, ry: 3, width: 5, height: 30},
                             {classList: ["plus"], x: 5, y: 17.5, rx: 3, ry: 3, width: 30, height: 5}]
                            };
        const arrowContent = {classList:["arrow"], viewBox: "0 0 20 20",
                              lines: [{classList: ["arrow-line"], x1: 10, y1: 0, x2: 19, y2: 10},
                              {classList: ["arrow-line"], x1: 19, y1: 10, x2: 10, y2: 19}]
                            };
        const nav = createNav("side-menu");
        const div = createDiv("projects");
        const box = createDiv("");
        box.classList.add("box");
        const content = createDiv("content");
        const arrow = createSVGLine(arrowContent);
        const para = document.createElement("p");
        const plusSVG = createSVGRect(plusContent);
        para.textContent = "Projects";
        appendNode(box, arrow, para)
        appendNode(div, box, plusSVG);
        appendNode(nav, div, content);
        return nav;
    }

    function renderContent() {
        const content = createDiv("container");
        const projectInfo = createDiv("project-info");
        const h2 = document.createElement("h2");
        h2.id = "project-name";
        h2.textContent = "Default";
        const para = document.createElement("p");
        para.classList.add("date");
        para.textContent = "Fri, Jan, 8";
        appendNode(projectInfo, h2, para)
        const addTask = createDiv("add-task");
        const todo = document.createElement("div");
        todo.classList.add("todo");
        appendNode(content, projectInfo, addTask, todo);
        return content;
    }
    
    function removeBodyContent() {
        const body = document.querySelector("body");
        body.style.background = "none";
        const children = Array.from(body.children);
        children.forEach(child=> body.removeChild(child));
    }

    function renderAddTaskCard() {
        const container = document.getElementById("container");
        const cardAdd = createDiv("card-add");
        appendNode(container, cardAdd);
    }

    return {renderLoginWindow, removeBodyContent, renderMainContent, renderAddTaskCard}
}

const dom = Dom();
export {dom};