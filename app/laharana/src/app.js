// app.js
import { Router } from './router.js';
import { Controller } from './controller.js';

document.addEventListener("DOMContentLoaded", () => {
    new Router({
        "": Controller.home,
        "report": Controller.report,
        "default": Controller.home
    });
});