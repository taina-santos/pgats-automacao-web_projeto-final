import * as menuLocators from './menu.locators'

class Menu{
    accessSignUpLoginPage(){
        cy.get(menuLocators.signUpLoginButton).click();
    }

    accessCartsPage(){
        cy.get(menuLocators.cartButton).click();
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
}

export default new Menu();