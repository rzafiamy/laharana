// router.js
class Router {
    constructor(routes) {
        this.routes = routes;
        window.addEventListener("hashchange", this.handleRouteChange.bind(this));
        this.handleRouteChange();
    }
    handleRouteChange() {
        const hash = location.hash.replace("#", "");
        const route = this.routes[hash] || this.routes["default"];
        route();
    }
}

export { Router };