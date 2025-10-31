import * as cartsLocators from './carts.locators';

class Carts{
    proceedToCheckout(){
        cy.get(cartsLocators.proceedToCheckout).click();
    }
}

export default new Carts();