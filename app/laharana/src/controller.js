import { phoneNumberModel } from './model.js';
import { ListView, FormView, AlertModal } from './widget.js';

class Controller {
    static home() {
        console.log("Home page loaded");
        const phones = phoneNumberModel.getAllPhoneNumbers().sort((a, b) => b.votes - a.votes);

        const app = document.getElementById("app");
        app.innerHTML = "";
        const searchForm = new FormView(["Entrer un numéro"], Controller.addPhoneNumber).render();
        const listView = new ListView(phones, Controller.vote).render();

        app.appendChild(searchForm);
        app.innerHTML += `<div id="searchResult">${listView}</div>`;

        const inputField = document.querySelector("input");
        inputField.addEventListener("input", () => Controller.filterList(phones));

        const button = document.getElementById("submit");
        // Attach the onSubmit handler
        button.onclick = (event) => {
            event.preventDefault(); // Prevent the form from submitting
            Controller.addPhoneNumber();
            Controller.filterList(phones);
        };
    }

    static filterList(phones) {
        const inputValue = document.querySelector("input").value.trim().toLowerCase();
        const filteredPhones = phones.filter(phone => {
            const fullNumber = `${phone.prefix} ${phone.number}`.toLowerCase();
            return fullNumber.includes(inputValue);
        });

        const display = document.getElementById("searchResult");
        display.innerHTML = new ListView(filteredPhones, Controller.vote).render();
    }


    static addPhoneNumber() {

        console.log("Add a Hacker Number");
        const number = document.querySelector("input").value;
        if (!number){
            return new AlertModal("This field is required").render();
        }
        phoneNumberModel.addPhoneNumber(number);
        new AlertModal("Phone number reported successfully!").render();
        Controller.home(); // Refresh the list
    }
    

    static vote(number, value) {
        console.log(`Voting for ${number} by ${value}`);
        phoneNumberModel.vote(number, value);
        Controller.home(); // Refresh the list
    }
}

export { Controller };