// app.js
document.addEventListener("DOMContentLoaded", () => {
    new Router({
        "": Controller.home,
        "report": Controller.report,
        "default": Controller.home
    });
});
