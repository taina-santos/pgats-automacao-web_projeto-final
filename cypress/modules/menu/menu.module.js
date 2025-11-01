import * as menuLocators from './menu.locators'

class Menu{
    accessSignUpLoginPage(){
        cy.get(menuLocators.signUpLoginButton).click();
    }

    accessCartsPage(){
        cy.get(menuLocators.cartButton).eq(0).click();
    }

    accessProductsPage(){
        cy.get(menuLocators.productsButton).click();
    }

    accessHomePage(){
        cy.get(menuLocators.homeButton).click();
    }

    accessDeleteAccount(){
        cy.get(menuLocators.deleteAccountButton).click();
    }

    accessLogout(){
        cy.get(menuLocators.logoutButton).click();
    }

    accessContactUsPage(){
        cy.get(menuLocators.contactButton).click();
    }

    subscribeUser(email){
        cy.get(menuLocators.subscriptionEmailField).type(email);
        cy.get(menuLocators.subscriptionButton).click();
    }
}

export default new Menu();