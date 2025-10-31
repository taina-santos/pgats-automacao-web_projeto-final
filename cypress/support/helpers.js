import { fa, faker } from "@faker-js/faker";

export function newRandomUser(){
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        state: faker.location.state(),
        city: faker.location.city(),
        zCode: faker.location.zipCode('#####'),
        mobileNumber: faker.phone.number(),
    };
}

export function signUpForm(){
    return {
        name: faker.person.firstName(),
        email: faker.internet.email(),
    };
}

export function paymentInfo(){
    return {
        nameOnCard: faker.finance.accountName(),
        cardNumber: faker.finance.creditCardNumber(),
        cvvNumber: faker.finance.creditCardCVV(),
        expMonth: '10',
        expYear: '2050',
    }
}