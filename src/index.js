import {dom} from './DOM/dom';
import {renderLoginWindow} from './DOM/singup';
import {createHeader} from './DOM/header-bar';
import {createMain} from './DOM/main-content';
import {demoEvent, menuFunction, showProjects} from './events';

renderLoginWindow();
const btn = document.querySelector(".demo");
btn.addEventListener("click", demoEvent);