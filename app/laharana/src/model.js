// model.js
class PhoneNumberModel {
    constructor() {
        this.phoneNumbers = {};
    }

    addPhoneNumber(number) {
        if (!this.phoneNumbers[number]) {
            this.phoneNumbers[number] = { votes: 0 };
        }
    }

    getPhoneNumber(number) {
        return this.phoneNumbers[number];
    }

    vote(number, value) {
        if (this.phoneNumbers[number]) {
            this.phoneNumbers[number].votes += value;
        }
    }
}

export const phoneNumberModel = new PhoneNumberModel();