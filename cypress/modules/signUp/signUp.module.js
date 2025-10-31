import { newRandomUser } from '../../support/helpers';
import * as signUpLocators from './signUp.locators'

class SignUp {
    preencherNewUserForm(){
        cy.get(signUpLocators.titleRadioButton).check('Mrs');
            
        cy.get(signUpLocators.passwordField).type('qa123456', { log: false });
        cy.get(signUpLocators.daysField).select('10'); 
        cy.get(signUpLocators.monthField).select('September'); 
        cy.get(signUpLocators.yearsField).select('1990');

        cy.get(signUpLocators.newsCheckbox).check();
        cy.get(signUpLocators.offersCheckbox).check();

        cy.get(signUpLocators.firstNameField).type(newRandomUser().firstName);
        cy.get(signUpLocators.lastNameField).type(newRandomUser().lastName);
        cy.get(signUpLocators.address1Field).type(newRandomUser().address);
        cy.get(signUpLocators.countryField).select('United States');
        cy.get(signUpLocators.stateField).type(newRandomUser().state);
        cy.get(signUpLocators.cityField).type(newRandomUser().city);
        cy.get(signUpLocators.zipcodeField).type(newRandomUser().zCode);
        cy.get(signUpLocators.phoneField).type(newRandomUser().mobileNumber);
    }

    clickCreateAccount(){
        cy.get(signUpLocators.createButton).click();
    }

    completeUserAction(){
        cy.get(signUpLocators.accountContinueButton).click();
    }
}

export default new SignUp();