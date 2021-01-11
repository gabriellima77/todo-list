(()=>{"use strict";const t=function(t){const e=document.createElement("div");return e.id=t,e},e=function(t){const e=document.createElement("nav");return e.id=t,e},n=function(t,...e){return e.forEach((e=>{t.appendChild(e)})),t},o=function(t,e){const n=document.createElement("h1");return n.id=t,n.textContent=e,n},c=function(t){const e=document.createElement("span");return t.forEach((t=>e.classList.add(t))),e},r=function(t){const e=document.createElement("button");return t.classList.forEach((t=>e.classList.add(t))),e.type=t.type,e.textContent=t.text,e},s=function(){const t=document.querySelector("body");Array.from(t.children).forEach((e=>t.removeChild(e)))},i=function({classList:t,placeHolder:e}){const n=document.createElement("input");return n.type="text",t.forEach((t=>n.classList.add(t))),n.placeholder=e,n},l=function({id:t,text:e}){const n=document.createElement("label");return n.textContent=e,n.id=t,n},a=function(t,e){const n=document.createElement("img");return n.id=t,n.src=e,n},d=function(t){const e=document.createElement("div");return t.forEach((t=>e.classList.add(t))),e};class u{constructor(t){this.title=t,this.checked=!1,this.notes=""}set setDescription(t){this.description=t}set setPriority({priority:t,color:e}){this.priority=t,this.colorLabel=e}set setNotes(t){this.notes=t}set setChecked(t){this.checked=t}set setDueData(t){this.dueDate=t}get getDescription(){return this.description}get getDueDate(){return this.dueDate}get getNotes(){return this.notes}putContent(t){this.dueDate=t.dueDate,this.notes=t.notes,this.priority=t.priority,this.description=t.description}}class m{constructor(t,e){this.projectTitle=t,this.projectColor=e,this.todos=[]}addTodo(t){const e=t.title,n=new u(e);n.putContent(t),this.todos.push(n)}removeTodo(t){const e=todos.indexOf(t);return this.todos.splice(e,1)}getTodo(t){return todos[t]}get getProject(){return this.todos}get getProjectTitle(){return this.projectTitle}get getProjectColor(){this.projectColor}}const f=function(){const t="http://www.w3.org/2000/svg";function e(e){const n=document.createElementNS(t,"svg");return e.classList.forEach((t=>n.classList.add(t))),n.setAttributeNS(null,"viewBox",e.viewBox),n}return{createSVGArrow:function(n,o){const c=e({classList:n,viewBox:o});return[{classList:["arrow-line"],x1:0,y1:0,x2:10,y2:10},{classList:["arrow-line"],x1:0,y1:20,x2:10,y2:9}].forEach((e=>{let n=document.createElementNS(t,"line");for(let t in e)"classList"==t?e[t].forEach((e=>n[t].add(e))):n.setAttributeNS(null,t,e[t]);c.appendChild(n)})),c},createSVGPlus:function(n,o){const c=e({classList:n,viewBox:o});return[{classList:["plus"],x:17.5,y:5,rx:3,ry:3,width:5,height:30},{classList:["plus"],x:5,y:17.5,rx:3,ry:3,width:30,height:5}].forEach((e=>{let n=document.createElementNS(t,"rect");for(let t in e)"classList"==t?e[t].forEach((e=>n[t].add(e))):n.setAttributeNS(null,t,e[t]);c.appendChild(n)})),c}}}();function h(){const o=e("side-menu"),c=t("projects");c.addEventListener("click",N.bind(c));const r=t("");r.classList.add("box");const s=t("content"),i=f.createSVGArrow(["arrow"],"0 0 20 20"),l=document.createElement("p"),a=f.createSVGPlus(["plus-sign","end"],"0 0 40 40");return a.addEventListener("click",b,!0),l.textContent="Projects",n(r,i,l),n(c,r,a),n(o,c,s),o}function p(){const t=document.querySelector("#content");Array.from(t.children).forEach((e=>t.removeChild(e)))}function E(){const e=document.querySelector("body"),i=function(){const e=document.createElement("header"),i=o("title","TODO LIST"),l=t("menu"),a=t("menu-btn"),d=function(){const t=r({type:"button",classList:["sing-out"],text:"Sing Out"});return t.addEventListener("click",(()=>{s(),P()})),t}();a.addEventListener("click",q);for(let t=0;t<3;t++){let t=c(["line"]);n(a,t)}const u=t("home");return n(l,a,u),n(e,l,i,d),e}(),l=function(){const e=document.createElement("main"),o=function(){const e=t("container"),o=t("project-info"),c=document.createElement("h2");c.id="project-name",c.textContent="Default";const r=document.createElement("p");r.classList.add("date"),r.textContent="Fri, Jan, 8",n(o,c,r);const s=t("add-task");s.addEventListener("click",S);const i=document.createElement("div");return i.classList.add("todo"),n(e,o,s,i),e}(),c=h();return n(e,c,o),e}();n(e,i,l)}function y(){const e=document.getElementById("container");Array.from(e.children).forEach((t=>{"card-add"==t.id&&e.removeChild(t)}));const o=t("card-add");return n(e,o),o}function L(){const t=this.parentElement,e=this.value;t.style.background=e}function g(){const t=document.querySelector("#card-add");document.querySelector("#container").removeChild(t)}function v(){const t=l({id:"title-label",text:"Title"}),e=i({classList:["add-input"],placeHolder:"Enter the Title"});return t.appendChild(e),t}function x(t){const e=d(["option-box"]),o=d(["confirm-btn"]);o.textContent="Confirm",o.addEventListener("click",t);const c=d(["cancel-btn"]);return c.addEventListener("click",g),c.textContent="Cancel",n(e,o,c),e}function C(){Array.from(this.children).forEach((t=>{t.value==this.value&&(this.style.background=t.style.background)}))}function b(){const e=y(),o=document.createElement("h3"),c=function(){const e=l({id:"color-label",text:"Board Color"}),n=t("color-input"),o=document.createElement("input");return o.type="color",o.value="#00ffd5",o.addEventListener("input",L),n.appendChild(o),e.appendChild(n),e}(),r=v(),s=x(j);o.textContent="Add Project",n(e,o,r,c,s)}function S(){const t=y(),e=document.createElement("h3"),o=function(t){const e=l({id:"",text:"Choose the priority:"});e.setAttribute("for","priority");const n=document.createElement("select");return n.id="priority",n.name="priority",[{text:"Low",color:"#42ecff"},{text:"Medium",color:"#89ff45"},{text:"High",color:"#ffcd42"},{text:"Extreme",color:"#ff4542"}].forEach((t=>{let e=document.createElement("option");e.value=t.text,e.textContent=t.text,e.style.background=t.color,n.appendChild(e)})),n.addEventListener("change",C),e.appendChild(n),e}(),c=v(),r=i({classList:["notes"],placeHolder:"Enter your notes"}),s=function(){const t=l({id:"",text:"Due Date:"}),e=document.createElement("input");return e.id="date",e.type="date",t.appendChild(e),t}(),a=function(){const t=document.createElement("textarea");return t.placeholder="Description",t}(),d=x(T);d.classList.add("task"),e.textContent="Add Project",n(t,e,c,o,r,s,a,d)}const w=[],A=new m("Default","blue");function k(){localStorage.getItem("name")?(s(),E()):function(){const t=document.querySelector(".form-login");Array.from(t.children).forEach((e=>t.removeChild(e)));const e=i({classList:["login-input"],placeHolder:"Enter Your Name"}),o=l({id:"user",text:"Name:"}),c=r({classList:["btn","demo","confirm"],type:"button",text:"Confirm"});c.addEventListener("click",D),n(o,e,c),n(t,o)}()}function D(){!function(){const t=document.querySelector(".login-input").value;return!!/^[a-zA-Z].*/.test(t)&&(localStorage.setItem("name",t),!0)}()?function(t){const e=document.querySelector("#user");Array.from(e.children).forEach((t=>{t.classList.contains("alert")&&e.removeChild(t)}));const o=d(["alert"]),c=function(){const t=document.querySelector(".login-input");return{left:t.offsetLeft+t.offsetWidth+3,bottom:t.offsetTop+t.offsetHeight/2+30}}();for(let t in c)o.style[t]=c[t]+"px";const r=document.createElement("p");r.textContent="Has at least one letter at beginning",n(o,r),n(e,o)}():(s(),E())}function q(){const t=document.querySelector("#side-menu"),e=document.querySelector(".arrow"),n=document.querySelector("#content");t.classList.contains("closed")?t.classList.remove("closed"):(t.classList.add("closed"),e.classList.remove("active"),n.classList.remove("content-active"),p())}function N(e){if(e.target.classList.value.includes("plus"))return;const o=this.firstElementChild.firstElementChild,c=document.querySelector("#content"),r=o.classList.contains("active"),s=document.querySelector("#side-menu").classList.contains("closed");r||s?(o.classList.remove("active"),c.classList.remove("content-active"),p()):(o.classList.add("active"),c.classList.add("content-active"),function(){p();const e=document.querySelector("#content"),o=t("add-project");o.addEventListener("click",b,!0);const c=f.createSVGPlus(["plus-sign","end"],"0 0 40 40"),r=document.createElement("p");r.textContent="Add Project",n(o,c,r),n(e,o)}())}function j(){const t=this.parentElement.parentElement;let e;Array.from(t.children).filter((t=>{if("LABEL"==t.nodeName)return t})).forEach((t=>{const n=t.firstElementChild;"DIV"==n.nodeName&&(e=n.firstElementChild.value)}));const n=function(){const t=document.querySelector(".add-input").value;return!!/^[a-zA-Z].+/.test(t)&&t}();if(n){const t=new m(n,e);w.push(t),console.log(w),g()}}function T(){const t=function(){const t=document.querySelector("#card-add"),e=Array.from(t.children),n=e.filter((t=>{if("LABEL"==t.nodeName)return t})),o=[];n.forEach((t=>o.push(t.firstElementChild))),e.forEach((t=>{"INPUT"!=t.nodeName&&"TEXTAREA"!=t.nodeName||o.push(t)}));const c={},r=["title","priority","dueDate","notes","description"];for(let t=0;t<r.length;t++)c[r[t]]=o[t].value;return c}();console.log(t),A.addTodo(t),console.log(A)}function P(){const e=document.querySelector("body"),o=a("user-img","https://www.flaticon.com/svg/static/icons/svg/747/747376.svg"),c=function(t,e){const o=document.createElement("form");o.onsubmit=()=>!1,o.classList.add("form-login");const c=[];for(let o=0;o<t.length;o++){let r=i(e[o]),s=l(t[o]);n(s,r),c.push(s)}return n(o,...c),o}([{id:"user",text:"Username"},{id:"password",text:"Password"}],[{classList:["login-input"],placeHolder:"Enter Username"},{classList:["login-input"],placeHolder:"Enter Password"}]),s=t("login"),d=[{classList:["btn"],type:"button",text:"Singin"},{classList:["btn"],type:"button",text:"Singup"}].reduce(((t,e)=>(t.push(r(e)),t)),[]),u=r({classList:["btn","demo"],type:"button",text:"Demo Account"});u.addEventListener("click",k),n(s,...d),n(c,s,u),n(e,o,c)}P()})();