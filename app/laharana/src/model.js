class PhoneNumberModel {
    constructor() {
        this.phoneNumbers = [
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
    }

    addPhoneNumber(number) {
        const newPhone = {
            number: number,
            prefix: "+1",
            location: "US",
            votes: 0
        };
        this.phoneNumbers.push(newPhone);
    }

    getPhoneNumber(number) {
        return this.phoneNumbers.find(phone => phone.number === number);
    }

    vote(number, value) {
        const phone = this.getPhoneNumber(number);
        if (phone) {
            phone.votes += value;
        }
    }

    getAllPhoneNumbers() {
        return this.phoneNumbers;
    }
}

export const phoneNumberModel = new PhoneNumberModel();