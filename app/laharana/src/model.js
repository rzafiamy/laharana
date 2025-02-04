class PhoneNumberModel {
    constructor() {
        this.phoneNumbers = new Map();
    }

    addPhoneNumber({ number, prefix, location }) {
        if (!this.phoneNumbers.has(number)) {
            this.phoneNumbers.set(number, { 
                prefix, 
                location, 
                number, 
                votes: 0 
            });
        }
    }

    getPhoneNumber(number) {
        return this.phoneNumbers.get(number) || null;
    }

    vote(number, value) {
        if (this.phoneNumbers.has(number)) {
            let phoneData = this.phoneNumbers.get(number);
            phoneData.votes += value;
            this.phoneNumbers.set(number, phoneData);
        }
    }

    getAllPhoneNumbers() {
        return Array.from(this.phoneNumbers.values());
    }
}

export const phoneNumberModel = new PhoneNumberModel();
