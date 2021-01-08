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
    
    function appendNode(parent, ...children){
        children.forEach(child => {
            parent.appendChild(child);
        });
        return parent;
    }
    
    function createForm(labelsContent, inputsContent) {
        const form = document.createElement("form");
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
        const nav = createNav("side-menu");
        const div = createDiv("container");
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
    
    function removeBodyContent() {
        const body = document.querySelector("body");
        body.style.background = "none";
        const children = Array.from(body.children);
        children.forEach(child=> body.removeChild(child));
    }

    return {renderLoginWindow, removeBodyContent, renderMainContent}
}

const dom = Dom();
export {dom};