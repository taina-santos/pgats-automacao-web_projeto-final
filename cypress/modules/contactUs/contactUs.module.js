import * as contactLocators from './contactUs.locators';
import contactUsFields from '../../fixtures/contactUs/contactUsForm.json';

class ContactUs {
    preencherContactForm() {
        cy.get(contactLocators.nameField).type(contactUsFields.name);
        cy.get(contactLocators.emailField).type(contactUsFields.email);
        cy.get(contactLocators.subjectField).type(contactUsFields.subject);
        cy.get(contactLocators.messageField).type(contactUsFields.message);

        cy.fixture('contactUs/contactUsForm.json').as('arquivo');
        cy.get(contactLocators.uploadFileButton).selectFile('@arquivo');

        cy.get(contactLocators.submitButton).click();
    }
}

export default new ContactUs();