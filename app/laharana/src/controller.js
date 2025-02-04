// controller.js
import { phoneNumberModel } from './model.js';
import { ListView, FormView, FabButton } from './widget.js';

class Controller {
    static home() {
        const app = document.getElementById("app");
        app.innerHTML = "";
        const searchForm = new FormView(["Enter phone number"], Controller.search).render();
        app.innerHTML = `${searchForm}<div id="searchResult"></div>`;
    }

    static report() {
        const app = document.getElementById("app");
        app.innerHTML = "";
        const reportForm = new FormView(["Enter phone number"], Controller.addPhoneNumber).render();
        app.innerHTML = `<h2>Report a Hacker Number</h2>${reportForm}`;
    }

    static addPhoneNumber() {
        const number = document.querySelector("input").value;
        if (!number) return alert("Please enter a phone number");
        phoneNumberModel.addPhoneNumber(number);
        alert("Phone number reported successfully!");
    }

    static search() {
        const number = document.querySelector("input").value;
        const result = phoneNumberModel.getPhoneNumber(number);
        const display = document.getElementById("searchResult");
        if (result) {
            display.innerHTML = new ListView([
                `Phone Number: ${number}`,
                `Votes: ${result.votes}`,
                `<button onclick="Controller.vote('${number}', 1)" class="btn btn-success">Upvote</button>`,
                `<button onclick="Controller.vote('${number}', -1)" class="btn btn-danger">Downvote</button>`
            ]).render();
        } else {
            display.innerHTML = `<p>No reports found for this number.</p>`;
        }
    }

    static vote(number, value) {
        phoneNumberModel.vote(number, value);
        Controller.search();
    }
}

export { Controller };