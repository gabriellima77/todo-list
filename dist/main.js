(()=>{"use strict";const t=function(t){const e=document.createElement("div");return e.id=t,e},e=function(t){const e=document.createElement("nav");return e.id=t,e},n=function(t,...e){return e.forEach((e=>{t.appendChild(e)})),t},c=function(t,e){const n=document.createElement("h1");return n.id=t,n.textContent=e,n},o=function(t){const e=document.createElement("span");return t.forEach((t=>e.classList.add(t))),e},s=function(t){const e=document.createElement("button");return t.classList.forEach((t=>e.classList.add(t))),e.type=t.type,e.textContent=t.text,e},r=function(){const t=document.querySelector("body");Array.from(t.children).forEach((e=>t.removeChild(e)))},i=function({classList:t,placeHolder:e}){const n=document.createElement("input");return n.type="text",t.forEach((t=>n.classList.add(t))),n.placeholder=e,n},l=function({id:t,text:e}){const n=document.createElement("label");return n.textContent=e,n.id=t,n},a=function(t,e){const n=document.createElement("img");return n.id=t,n.src=e,n},d=function(t){const e=document.createElement("div");return t.forEach((t=>e.classList.add(t))),e},u=function(){const t="http://www.w3.org/2000/svg";function e(e){const n=document.createElementNS(t,"svg");return e.classList.forEach((t=>n.classList.add(t))),n.setAttributeNS(null,"viewBox",e.viewBox),n}return{createSVGArrow:function(n,c){const o=e({classList:n,viewBox:c});return[{classList:["arrow-line"],x1:0,y1:0,x2:10,y2:10},{classList:["arrow-line"],x1:0,y1:20,x2:10,y2:9}].forEach((e=>{let n=document.createElementNS(t,"line");for(let t in e)"classList"==t?e[t].forEach((e=>n[t].add(e))):n.setAttributeNS(null,t,e[t]);o.appendChild(n)})),o},createSVGPlus:function(n,c){const o=e({classList:n,viewBox:c});return[{classList:["plus"],x:17.5,y:5,rx:3,ry:3,width:5,height:30},{classList:["plus"],x:5,y:17.5,rx:3,ry:3,width:30,height:5}].forEach((e=>{let n=document.createElementNS(t,"rect");for(let t in e)"classList"==t?e[t].forEach((e=>n[t].add(e))):n.setAttributeNS(null,t,e[t]);o.appendChild(n)})),o}}}();function m(){const c=e("side-menu"),o=t("projects");o.addEventListener("click",g.bind(o));const s=t("");s.classList.add("box");const r=t("content"),i=u.createSVGArrow(["arrow"],"0 0 20 20"),l=document.createElement("p"),a=u.createSVGPlus(["plus-sign","end"],"0 0 40 40");return a.addEventListener("click",L,!0),l.textContent="Projects",n(s,i,l),n(o,s,a),n(c,o,r),c}function f(){const t=document.querySelector("#content");Array.from(t.children).forEach((e=>t.removeChild(e)))}function p(){const e=document.querySelector("body"),i=function(){const e=document.createElement("header"),i=c("title","TODO LIST"),l=t("menu"),a=t("menu-btn"),d=function(){const t=s({type:"button",classList:["sing-out"],text:"Sing Out"});return t.addEventListener("click",(()=>{r(),S()})),t}();a.addEventListener("click",x);for(let t=0;t<3;t++){let t=o(["line"]);n(a,t)}const u=t("home");return n(l,a,u),n(e,l,i,d),e}(),l=function(){const e=document.createElement("main"),c=function(){const e=t("container"),c=t("project-info"),o=document.createElement("h2");o.id="project-name",o.textContent="Default";const s=document.createElement("p");s.classList.add("date"),s.textContent="Fri, Jan, 8",n(c,o,s);const r=t("add-task");r.addEventListener("click",L,!0);const i=document.createElement("div");return i.classList.add("todo"),n(e,c,r,i),e}(),o=m();return n(e,o,c),e}();n(e,i,l)}function h(){const t=this.parentElement,e=this.value;t.style.background=e}function E(){const t=this.parentElement.parentElement;document.querySelector("#container").removeChild(t)}function L(){const e=function(){const e=document.getElementById("container");Array.from(e.children).forEach((t=>{"card-add"==t.id&&e.removeChild(t)}));const c=t("card-add");return n(e,c),c}(),c=document.createElement("h3");c.textContent="Add Project";const o=l({id:"title-label",text:"Title"}),s=i({classList:["add-input"],placeHolder:"Enter the Title"}),r=l({id:"color-label",text:"Board Color"}),a=t("color-input"),u=document.createElement("input"),m=d(["option-box"]),f=d(["confirm-btn"]);f.textContent="Confirm";const p=d(["cancel-btn"]);p.addEventListener("click",E),p.textContent="Cancel",u.type="color",u.addEventListener("input",h),o.appendChild(s),a.appendChild(u),r.appendChild(a),n(m,f,p),n(e,c,o,r,m)}function v(){localStorage.getItem("name")?(r(),p()):function(){const t=document.querySelector(".form-login");Array.from(t.children).forEach((e=>t.removeChild(e)));const e=i({classList:["login-input"],placeHolder:"Enter Your Name"}),c=l({id:"user",text:"Name:"}),o=s({classList:["btn","demo","confirm"],type:"button",text:"Confirm"});o.addEventListener("click",y),n(c,e,o),n(t,c)}()}function y(){!function(){const t=document.querySelector(".login-input").value;return!!/^[a-zA-z].*/.test(t)&&(localStorage.setItem("name",t),!0)}()?function(t){const e=document.querySelector("#user");Array.from(e.children).forEach((t=>{t.classList.contains("alert")&&e.removeChild(t)}));const c=d(["alert"]),o=function(){const t=document.querySelector(".login-input");return{left:t.offsetLeft+t.offsetWidth+3,bottom:t.offsetTop+t.offsetHeight/2+30}}();for(let t in o)c.style[t]=o[t]+"px";const s=document.createElement("p");s.textContent="Has at least one letter at beginning",n(c,s),n(e,c)}():(r(),p())}function x(){const t=document.querySelector("#side-menu"),e=document.querySelector(".arrow"),n=document.querySelector("#content");t.classList.contains("closed")?t.classList.remove("closed"):(t.classList.add("closed"),e.classList.remove("active"),n.classList.remove("content-active"),f())}function g(e){if(e.target.classList.value.includes("plus"))return;const c=this.firstElementChild.firstElementChild,o=document.querySelector("#content"),s=c.classList.contains("active"),r=document.querySelector("#side-menu").classList.contains("closed");s||r?(c.classList.remove("active"),o.classList.remove("content-active"),f()):(c.classList.add("active"),o.classList.add("content-active"),function(){f();const e=document.querySelector("#content"),c=t("add-project");c.addEventListener("click",L,!0);const o=u.createSVGPlus(["plus-sign","end"],"0 0 40 40"),s=document.createElement("p");s.textContent="Add Project",n(c,o,s),n(e,c)}())}function S(){const e=document.querySelector("body"),c=a("user-img","https://www.flaticon.com/svg/static/icons/svg/747/747376.svg"),o=function(t,e){const c=document.createElement("form");c.onsubmit=()=>!1,c.classList.add("form-login");const o=[];for(let c=0;c<t.length;c++){let s=i(e[c]),r=l(t[c]);n(r,s),o.push(r)}return n(c,...o),c}([{id:"user",text:"Username"},{id:"password",text:"Password"}],[{classList:["login-input"],placeHolder:"Enter Username"},{classList:["login-input"],placeHolder:"Enter Password"}]),r=t("login"),d=[{classList:["btn"],type:"button",text:"Singin"},{classList:["btn"],type:"button",text:"Singup"}].reduce(((t,e)=>(t.push(s(e)),t)),[]),u=s({classList:["btn","demo"],type:"button",text:"Demo Account"});u.addEventListener("click",v),n(r,...d),n(o,r,u),n(e,c,o)}S()})();