// controller.js
import { phoneNumberModel } from './model.js';
import { ListView, FormView, FabButton } from './widget.js';

class Controller {
    static home() {
        console.log("Home page loaded");
        const phones = [
            { number: "123-456-7890", prefix: "+1", location: "US", votes: 10 },
            { number: "987-654-3210", prefix: "+44", location: "UK", votes: 5 },
            { number: "555-555-5555", prefix: "+33", location: "FR", votes: 8 },
            { number: "400-867-5309", prefix: "+1", location: "US", votes: 15 },
            { number: "617-5309", prefix: "+1", location: "US", votes: 20 },
            { number: "789-012-3456", prefix: "+1", location: "US", votes: 12 },
            { number: "876-543-2109", prefix: "+1", location: "US", votes: 18 },
            { number: "901-234-5678", prefix: "+1", location: "US", votes: 11 },
            { number: "098-765-4321", prefix: "+1", location: "US", votes: 13 },
            { number: "123-456-7890", prefix: "+1", location: "US", votes: 14 },
            { number: "234-567-8901", prefix: "+1", location: "US", votes: 16 },
            { number: "345-678-9012", prefix: "+1", location: "US", votes: 17 },
            { number: "456-789-0123", prefix: "+1", location: "US", votes: 15 },
            { number: "567-890-1234", prefix: "+1", location: "US", votes: 19 },
            { number: "678-901-2345", prefix: "+1", location: "US", votes: 12 },
            { number: "789-012-3456", prefix: "+1", location: "US", votes: 18 }
        ];
        
        const app = document.getElementById("app");
        app.innerHTML = "";
        const searchForm = new FormView(["Enter phone number"], Controller.search).render();
        const listView = new ListView(phones).render();

        app.innerHTML = `${searchForm}<div id="searchResult">${listView}</div>`;

         // Add input event listener for real-time filtering
         const inputField = document.querySelector("input");
         inputField.addEventListener("input", () => Controller.filterList(phones));
    }


    static filterList(phones) {
        const inputValue = document.querySelector("input").value.trim().toLowerCase();
        const filteredPhones = phones.filter(phone => {
            const fullNumber = `${phone.prefix} ${phone.number}`.toLowerCase();
            return fullNumber.includes(inputValue);
        });

        const display = document.getElementById("searchResult");
        display.innerHTML = new ListView(filteredPhones).render();
    }

    static report() {
        console.log("Report a Hacker Number");
        const app = document.getElementById("app");
        app.innerHTML = "";
        const reportForm = new FormView(["Enter phone number"], Controller.addPhoneNumber).render();
        app.innerHTML = `<h2>Report a Hacker Number</h2>${reportForm}`;
    }

    static addPhoneNumber() {
        console.log("Add a Hacker Number");
        const number = document.querySelector("input").value;
        if (!number) return alert("Please enter a phone number");
        phoneNumberModel.addPhoneNumber(number);
        alert("Phone number reported successfully!");
    }

    static search() {
        console.log("Search for a Hacker Number");
        const number = document.querySelector("input").value.trim();
        if (!number) return;

        const result = phoneNumberModel.getPhoneNumber(number);
        const display = document.getElementById("searchResult");

        if (result) {
            // If number exists, show details and voting buttons
            display.innerHTML = new ListView([
                `Phone Number: ${number}`,
                `Votes: ${result.votes}`,
                `<button onclick="Controller.vote('${number}', 1)" class="btn btn-success">Upvote</button>`,
                `<button onclick="Controller.vote('${number}', -1)" class="btn btn-danger">Downvote</button>`
            ]).render();
        } else {
            // If number does not exist, show an "Add" button
            display.innerHTML = `
                <p>No reports found for this number.</p>
                <button onclick="Controller.addPhoneNumber()" class="btn btn-primary">Report this Number</button>
            `;
        }
    }


    static vote(number, value) {
        console.log(`Voting for ${number} by ${value}`);
        phoneNumberModel.vote(number, value);
        Controller.search();
    }
}

export { Controller };