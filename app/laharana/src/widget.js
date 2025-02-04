// widget.js
class ListView {
    constructor(items) {
        this.items = items;
    }
    render() {
        return `<ul>${this.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
    }
}
class FormView {
    constructor(fields, onSubmit) {
        this.fields = fields;
        this.onSubmit = onSubmit;
    }
    render() {
        return `<form onsubmit="event.preventDefault(); this.onSubmit()">
            ${this.fields.map(field => `<input type="text" placeholder="${field}" required>`).join('')}
            <button type="submit">Submit</button>
        </form>`;
    }
}
class FabButton {
    constructor(label, onClick) {
        this.label = label;
        this.onClick = onClick;
    }
    render() {
        return `<button class="fab" onclick="(${this.onClick})()">${this.label}</button>`;
    }
}