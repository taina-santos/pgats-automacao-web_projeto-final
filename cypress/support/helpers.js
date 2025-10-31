import { fa, faker } from "@faker-js/faker";

export function getRandomNumber(){
    return new Date().getTime()
}

export function getNewEmail(){
    return `novo-qa-${getRandomNumber()}@mail.com`;
}

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