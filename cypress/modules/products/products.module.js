import * as productLocators from "../products/products.locators";

class Products{
    selectFirstItem(){
        cy.get(productLocators.firstProductItemViewLink).click();
    }

    searchProduct(searchString){
        cy.get(productLocators.searchProductField).type(searchString);
        cy.get(productLocators.searchProductButton).click();
    }

    addProductToCart(){
        cy.get(productLocators.productAddCartButton).click();
    }
}

export default new Products();