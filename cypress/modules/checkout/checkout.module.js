import * as checkoutLocators from './checkout.locators'

class Checkout {
    insertComment(comment){
        cy.get(checkoutLocators.commentsSection).type(comment);
    }

    placeOrder(){
        cy.get(checkoutLocators.placeOrderButton).click();
    }
}

export default new Checkout();