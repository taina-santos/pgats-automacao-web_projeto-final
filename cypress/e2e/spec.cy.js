import loginModule from '../modules/login/login.module';
import menu from '../modules/menu/menu.module';
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
  })
})