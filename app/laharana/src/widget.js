// view.js
class ListView {
    constructor(items, voteCbk) {
        this.items = items;
        this.voteCbk = voteCbk;
        window.voteCbk = this.voteCbk.bind(this); // Make it globally accessible
    }

    render() {
        if (this.items.length === 0) {
            return new EmptyView().render();
        }

        return `
        <ul class="phone-list">
            ${this.items.map(item => `
                <li class="phone-item">
                    <div class="phone-flag">${item.location}</div>
                    <div class="phone-number">${item.prefix} ${item.number}</div>
                    <div class="phone-votes">
                        <div class="vote-bar" style="width: ${item.votes * 10}px;"></div>
                        <button class="vote-down" onclick="voteCbk('${item.number}', -1)">👎</button>
                        <span>${item.votes} votes</span>
                        <button class="vote-up" onclick="voteCbk('${item.number}', 1)">👍</button>
                    </div>
                </li>`).join('')}
        </ul>`;
    }
}

class EmptyView {
    constructor(message = "Pas de numero trouvé.") {
        this.message = message;
    }

    render() {
        return `
        <div class="empty-view">
            <div class="empty-icon">📭</div>
            <div class="empty-message">${this.message}</div>
        </div>`;
    }
}

class FormView {
    constructor(fields) {
        this.fields = fields;
    }

    render() {
        // Create a form element
        const form = document.createElement("div");
        form.classList.add("form-inline");

        // Add input fields
        this.fields.forEach(field => {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = field;
            input.required = true;
            input.classList.add("form-control");
            form.appendChild(input);
        });

        // Add submit button
        const button = document.createElement("button");
        button.id ="submit";
        button.type = "button"; // Use type="button" to avoid form submission
        button.textContent = "-->";
        button.classList.add("btn", "btn-primary");
        form.appendChild(button);

        return form;
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


class AlertModal {
    constructor(message, title = "Alert") {
        this.message = message;
        this.title = title;
    }

    render() {
        // Create the modal container
        const modal = document.createElement("div");
        modal.classList.add("alert-modal");

        // Create the modal content
        modal.innerHTML = `
            <div class="alert-modal-content">
                <div class="alert-modal-header">
                    <h3>${this.title}</h3>
                    <button class="alert-modal-close">&times;</button>
                </div>
                <div class="alert-modal-body">
                    <p>${this.message}</p>
                </div>
                <div class="alert-modal-footer">
                    <button class="alert-modal-ok">OK</button>
                </div>
            </div>
        `;

        // Add event listeners for closing the modal
        const closeButton = modal.querySelector(".alert-modal-close");
        const okButton = modal.querySelector(".alert-modal-ok");
        closeButton.onclick = () => this.close(modal);
        okButton.onclick = () => this.close(modal);

        // Append the modal to the body
        document.body.appendChild(modal);

        // Add the 'open' class to show the modal
        setTimeout(() => modal.classList.add("open"), 10);

        return modal;
    }

    close(modal) {
        // Remove the 'open' class to hide the modal
        modal.classList.remove("open");

        // Remove the modal from the DOM after the animation
        setTimeout(() => modal.remove(), 300);
    }
}

export { AlertModal, ListView, FormView, FabButton };