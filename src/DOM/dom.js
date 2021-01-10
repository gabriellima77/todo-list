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
    
    function createDivById(id) {
        const div = document.createElement("div");
        div.id = id;
        return div;
    }

    function createDivByClass(classList) {
        const div = document.createElement("div");
        classList.forEach(clas=> div.classList.add(clas));
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
    
    function createTextInput({classList, placeHolder}) {
        const input = document.createElement("input");
        input.type = "text";
        classList.forEach(clas=> input.classList.add(clas));
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

    function createNav(id){
        const nav = document.createElement("nav");
        nav.id = id;
        return nav;
    }

    function removeBodyContent() {
        const body = document.querySelector("body");
        const children = Array.from(body.children);
        children.forEach(child=> body.removeChild(child));
    }

    return {createDivById, createNav, appendNode,
            createH1, createSpan, createBtn,
            removeBodyContent, createTextInput, createLabel,
            createImg, createDivByClass};
}

const dom = Dom();
export {dom};