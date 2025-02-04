// view.js
class ListView {
    constructor(items) {
        this.items = items;
    }
    render() {
        return `<ul class="list-group">${this.items.map(item => `<li class="list-group-item">${item}</li>`).join('')}</ul>`;
    }
}

class FormView {
    constructor(fields, onSubmit) {
        this.fields = fields;
        this.onSubmit = onSubmit;
    }
    render() {
        return `<form onsubmit="event.preventDefault(); this.onSubmit()" class="form-inline">
            ${this.fields.map(field => `<input type="text" placeholder="${field}" required class="form-control">`).join('')}
            <button type="submit" class="btn btn-primary">Add</button>
        </form>`;
    }
}

class FabButton {
    constructor(label, onClick) {
        this.label = label;
        this.onClick = onClick;
    }
    render() {
        return `<button class="fab btn btn-floating btn-large waves-effect waves-light" onclick="(${this.onClick})()">${this.label}</button>`;
    }
}

export { ListView, FormView, FabButton };