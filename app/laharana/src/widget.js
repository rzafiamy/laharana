// view.js
class ListView {
    constructor(items) {
        this.items = items;
    }

    render() {
        return `
        <ul class="phone-list">
            ${this.items.map(item => `
                <li class="phone-item">
                    <div class="phone-flag">${item.location}</div>
                    <div class="phone-number">${item.prefix} ${item.number}</div>
                    <div class="phone-votes">
                        <div class="vote-bar" style="width: ${item.votes * 10}px;"></div>
                        <span>${item.votes} votes</span>
                    </div>
                </li>`).join('')}
        </ul>`;
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