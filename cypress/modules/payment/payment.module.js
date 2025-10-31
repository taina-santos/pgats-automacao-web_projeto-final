import * as paymentLocators from './payment.locators'

class Payment{
    fillPaymentInfo(name, cardNumber, cvv, expMonth, expYear){
        cy.get(paymentLocators.nameOnCard).type(name);
        cy.get(paymentLocators.cardNumber).type(cardNumber);
        cy.get(paymentLocators.cvvNumber).type(cvv);
        cy.get(paymentLocators.expMonth).type(expMonth);
        cy.get(paymentLocators.expYear).type(expYear);
    }

    payOrder(){
        cy.get(paymentLocators.paymentButton).click()
    }
}

export default new Payment();