// cypress/integration/home.spec.js

describe('Home Page', () => {
    it('should display recent destinations', () => {
        cy.visit('http://localhost:3000');  // Assuming your app is running on port 3000

        cy.get('.destination-card').should('have.length.greaterThan', 0);
        cy.contains('Paris');  // Ensure that the destination name is present
    });
});
