import login from '../modules/login/login.module';
import menu from '../modules/menu/menu.module';
import singup from '../modules/signUp/signUp.module';
import { logoutButton, signUpLoginButton } from '../modules/menu/menu.locators'
import usuarioValido from '../fixtures/login/usuarioValido.json';
import { accountCreatedHeader, accountDeletionHeader } from '../modules/signUp/signUp.locators';
import { signUpForm } from '../support/helpers';
import contact from '../modules/contactUs/contactUs.module';

describe('Automation exercise', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Home').should('be.visible');
  });

  it('#1 - Register User', () => {
    menu.accessSignUpLoginPage();
    cy.contains('h2', 'New User Signup!').should('be.visible');

    login.fillSignUpForm(signUpForm().name, signUpForm().email);
    login.clickSignUpButton();

    singup.preencherNewUserForm();
    singup.clickCreateAccount();

    cy.url().should('includes', 'account_created');
    cy.contains('b', 'Account Created!');
    cy.get(accountCreatedHeader).should('have.text', 'Account Created!');
    singup.completeUserAction();

    cy.get(logoutButton).should('be.visible');
    cy.contains('Logged in as ').should('be.visible');
    menu.accessDeleteAccount();

    cy.url().should('includes', 'delete_account');
    cy.get(accountDeletionHeader).should('have.text', 'Account Deleted!');
    singup.completeUserAction();
    cy.get(signUpLoginButton).should('be.visible');
  });

  it('#2 - Login User with correct email and password', () => {
    menu.accessSignUpLoginPage();
    cy.contains('h2', 'Login to your account').should('be.visible');

    login.fillLoginForm(usuarioValido.email, usuarioValido.senha);
    login.clickLoginButton();

    cy.contains(`Logged in as ${usuarioValido.nome}`).should('be.visible');
    cy.get(logoutButton).should('be.visible');
  });

  it('#3 - Login User with incorrect email and password', () => {
    menu.accessSignUpLoginPage();
    cy.contains('h2', 'Login to your account').should('be.visible');

    login.fillLoginForm(usuarioValido.email, 'qa1234');
    login.clickLoginButton();

    cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!');
  });

  it('#4 - Logout User', () => {
    menu.accessSignUpLoginPage();
    cy.contains('h2', 'Login to your account').should('be.visible');

    login.fillLoginForm(usuarioValido.email, usuarioValido.senha);
    login.clickLoginButton();

    cy.contains(`Logged in as ${usuarioValido.nome}`).should('be.visible');
    cy.get(logoutButton).should('be.visible');

    menu.accessLogout();
    cy.url().should('includes', 'login');
  });

  it('Register User with existing email', () => {
    menu.accessSignUpLoginPage();
    cy.contains('h2', 'New User Signup!').should('be.visible');

    login.fillSignUpForm(signUpForm().name, usuarioValido.email);
    login.clickSignUpButton();

    cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!');
  });

  it('#6 - Contact Us Form', () => {
    menu.accessContactUsPage();
    cy.contains('h2', 'Contact Us').should('be.visible');

    contact.preencherContactForm();
    cy.get('.status').should('be.visible');
    cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');
  });
})