import loginModule from '../modules/login/login.module';
import menu from '../modules/menu/menu.module';
import signUpModule from '../modules/signUp/signUp.module';
import { accountCreatedHeader, accountDeletionHeader } from '../modules/signUp/signUp.locators';
import { signUpForm } from '../support/helpers';

describe('Automation exercise', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Home').should('be.visible');
  });

  it('#1 - Register User', () => {
    menu.accessSignUpLoginPage();
    cy.contains('h2', 'New User Signup!').should('be.visible');

    loginModule.fillSignUpForm(signUpForm().name, signUpForm().email);
    loginModule.clickSignUpButton();

    signUpModule.preencherNewUserForm();
    signUpModule.clickCreateAccount();

    cy.url().should('includes', 'account_created');
    cy.contains('b', 'Account Created!');
    cy.get(accountCreatedHeader).should('have.text', 'Account Created!');
    signUpModule.completeUserAction();

    cy.contains('Logged in as ').should('be.visible');
    menu.accessDeleteAccount();

    cy.url().should('includes', 'delete_account');
    cy.get(accountDeletionHeader).should('have.text', 'Account Deleted!');
    signUpModule.completeUserAction();
  });

  it('#2 - ', () => {
  });
})