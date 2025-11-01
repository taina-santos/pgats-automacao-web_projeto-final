///requires
import login from '../modules/login/login.module';
import menu from '../modules/menu/menu.module';
import singup from '../modules/signUp/signUp.module';
import { logoutButton, signUpLoginButton, subscribeSuccess } from '../modules/menu/menu.locators'
import usuarioValido from '../fixtures/login/usuarioValido.json';
import checkoutMessage from '../fixtures/checkout/message.json';
import { accountCreatedHeader, accountDeletionHeader } from '../modules/signUp/signUp.locators';
import { signUpForm, paymentInfo } from '../support/helpers';
import contact from '../modules/contactUs/contactUs.module';
import product from '../modules/products/products.module';
import cart from '../modules/carts/carts.module';
import checkout from '../modules/checkout/checkout.module';
import payment from '../modules/payment/payment.module';
import * as singleProduct from '../modules/products/products.locators';
import { reviewCartSection, addressDetailsSection } from '../modules/checkout/checkout.locators';

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

  it('#5 - Register User with existing email', () => {
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

  it('#8 - Verify All Products and product detail page', () => {
    menu.accessProductsPage();
    cy.url().should('includes', 'products')
    cy.contains('h2', 'All Products').should('be.visible');

    product.selectFirstItem();
    cy.url().should('includes', 'product_details/1');

    cy.get(singleProduct.productName).should('have.text', 'Blue Top');
    cy.get(singleProduct.productCategory).eq(0).should('have.text', 'Category: Women > Tops');
    cy.get(singleProduct.productPrice).should('have.text', 'Rs. 500');
    cy.get(singleProduct.productInfo).eq(1).should('have.text', 'Availability: In Stock');
    cy.get(singleProduct.productInfo).eq(2).should('have.text', 'Condition: New');
    cy.get(singleProduct.productInfo).eq(3).should('have.text', 'Brand: Polo');
  });

  it('#9 - Search Product', () => {
    menu.accessProductsPage();
    cy.url().should('includes', 'products')
    cy.contains('h2', 'All Products').should('be.visible');

    product.searchProduct('Dress');
    cy.contains('h2', 'Searched Products').should('be.visible');
  });

  it('#10 - Verify Subscription in home page', () => {
    cy.contains('h2', 'Subscription').should('be.visible');
    menu.subscribeUser(usuarioValido.email);
    cy.get(subscribeSuccess).should('be.visible');
  });

  it('#15 - Place Order: Register before Checkout', () => {
    menu.accessSignUpLoginPage();

    login.fillSignUpForm(signUpForm().name, signUpForm().email);
    login.clickSignUpButton();

    singup.preencherNewUserForm();
    singup.clickCreateAccount();

    cy.url().should('includes', 'account_created');
    cy.contains('b', 'Account Created!');
    cy.get(accountCreatedHeader).should('have.text', 'Account Created!');
    singup.completeUserAction();

    cy.contains('Logged in as ').should('be.visible');
    menu.accessProductsPage();
    cy.url().should('includes', 'products')

    product.selectFirstItem();
    cy.url().should('includes', 'product_details/1');
    product.addProductToCart();
    cy.contains('Continue Shopping').click();

    menu.accessCartsPage();
    cy.url().should('includes', 'view_cart');

    cart.proceedToCheckout();
    cy.url().should('includes', 'checkout');

    cy.get(addressDetailsSection).should('be.visible');
    cy.get(reviewCartSection).should('be.visible');
    checkout.insertComment(checkoutMessage.message);
    checkout.placeOrder();

    cy.url().should('includes', 'payment');
    payment.fillPaymentInfo(paymentInfo().nameOnCard, paymentInfo().cardNumber, paymentInfo().cvvNumber, paymentInfo().expMonth, paymentInfo().expYear);
    payment.payOrder();
    // cy.contains('Your order has been placed successfully!').should('be.visible');
    cy.contains('h2', 'Order Placed!');

    menu.accessDeleteAccount();

    cy.url().should('includes', 'delete_account');
    cy.get(accountDeletionHeader).should('have.text', 'Account Deleted!');
    singup.completeUserAction();
    cy.get(signUpLoginButton).should('be.visible');
  });
})