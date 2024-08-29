// cypress/integration/destinationE2E.spec.js

describe('Destination Management', () => {
    it('should display the list of destinations', () => {
        cy.visit('http://localhost:8080');  // Replace with your local server URL
        cy.get('.destination-card').should('have.length.greaterThan', 0);
    });

    it('should allow adding a new destination', () => {
        cy.visit('http://localhost:8080');
        cy.get('#name').type('Lumbini');
        cy.get('#description').type('Birthplace of Buddha');
        cy.get('#destination-form').submit();

        cy.get('.destination-card').contains('Lumbini').should('exist');
    });

    it('should allow editing a destination', () => {
        cy.visit('http://localhost:8080');
        cy.get('.destination-card').first().contains('Edit').click();

        cy.get('#name').clear().type('Kathmandu Updated');
        cy.get('#destination-form').submit();

        cy.get('.destination-card').contains('Kathmandu Updated').should('exist');
    });

    it('should allow deleting a destination', () => {
        cy.visit('http://localhost:8080');
        cy.get('.destination-card').first().contains('Delete').click();

        cy.get('.destination-card').should('have.length.lessThan', 1);
    });
});
