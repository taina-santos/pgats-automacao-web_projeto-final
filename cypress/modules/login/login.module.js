import * as loginLocators from './login.locators';

class Login{
    fillLoginForm(email, password){
        cy.get(loginLocators.loginEmailField).type(email);
        cy.get(loginLocators.loginpasswordField).type(password);
    }

    clickLoginButton(){
        cy.get(loginLocators.loginButton).click();
    }

    fillSignUpForm(name, email){
        cy.get(loginLocators.signUpNameField).type(name);
        cy.get(loginLocators.signUpEmailField).type(email);
    }

    clickSignUpButton(){
        cy.get(loginLocators.signUpButton).click();
    }
}

export default new Login();